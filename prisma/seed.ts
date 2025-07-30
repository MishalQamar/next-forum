import { PrismaClient } from '@prisma/client';
import { sub, add } from 'date-fns';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data (optional)
  await prisma.participant.deleteMany();
  await prisma.post.deleteMany();
  await prisma.discussion.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const users = await Promise.all(
    ['alice', 'bob', 'charlie', 'diana'].map((username) =>
      prisma.user.create({
        data: {
          username,
          email: `${username}@example.com`,
          passwordHash: `hashed_password_${username}`,
        },
      })
    )
  );

  // Create topics
  const topics = await Promise.all(
    ['Python', 'JavaScript', 'React'].map((title) =>
      prisma.topic.create({ data: { title } })
    )
  );

  // Markdown bodies for main posts per topic
  const markdownMainPosts: Record<string, string> = {
    Python: `
# Welcome to Python Discussion!

Python is a great language for beginners and experts alike. Here's a simple example:

\`\`\`python
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))
\`\`\`
`,
    JavaScript: `
# JavaScript Discussion

JavaScript runs everywhere! Here's a classic example:

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));
\`\`\`
`,
    React: `
# React Discussion

React makes UI development a breeze. Sample component:

\`\`\`jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
\`\`\`
`,
  };

  // Some markdown replies
  const markdownReplies = [
    `Great point! I totally agree.`,
    `Can you explain more about this?`,
    `Here's a related resource: [MDN Web Docs](https://developer.mozilla.org/)`,
    `I tried this approach and it worked well for me.

\`\`\`js
console.log('Success!');
\`\`\`
`,
    `What about edge cases?`,
  ];

  // Helper: random date between two dates
  function randomDate(start: Date, end: Date) {
    return new Date(
      start.getTime() +
        Math.random() * (end.getTime() - start.getTime())
    );
  }

  // Create discussions with different users, topics, and createdAt
  const discussions = [];
  for (let i = 0; i < 5; i++) {
    const user = users[i % users.length];
    const topic = topics[i % topics.length];
    const createdAt = randomDate(
      sub(new Date(), { days: 30 }),
      new Date()
    );
    const discussion = await prisma.discussion.create({
      data: {
        title: `Discussion ${i + 1} about ${topic.title}`,
        userId: user.id,
        topicId: topic.id,
        createdAt,
        updatedAt: createdAt,
        lastActivityAt: createdAt,
        pinned: i === 0, // pin the first discussion
        pinnedAt: i === 0 ? createdAt : null,
      },
    });
    discussions.push(discussion);
  }

  // Create posts (comments) for each discussion and set solutions on some
  for (let i = 0; i < discussions.length; i++) {
    const discussion = discussions[i];

    // Get topic title for this discussion
    const topicTitle =
      topics.find((t) => t.id === discussion.topicId)?.title ||
      'Python';

    // Main post body markdown for this topic
    const mainPostBody =
      markdownMainPosts[topicTitle] ?? "Let's start the discussion!";

    // Choose random post author
    const postAuthor =
      users[Math.floor(Math.random() * users.length)];
    const firstPost = await prisma.post.create({
      data: {
        discussionId: discussion.id,
        userId: postAuthor.id,
        body: mainPostBody,
        createdAt: discussion.createdAt,
        updatedAt: discussion.createdAt,
      },
    });

    let solutionPostId: string | null = null;

    // For discussion with no replies (e.g. i === 2), skip replies
    if (i !== 2) {
      // Create some replies to the first post using markdownReplies randomly and varied times
      for (let j = 0; j < 3; j++) {
        const replyAuthor = users[(j + 1) % users.length];
        const replyCreatedAt = add(discussion.createdAt, {
          minutes: 15 * (j + 1),
        });
        const replyBody =
          markdownReplies[(i + j) % markdownReplies.length];

        const replyPost = await prisma.post.create({
          data: {
            discussionId: discussion.id,
            userId: replyAuthor.id,
            parentId: firstPost.id,
            body: replyBody,
            createdAt: replyCreatedAt,
            updatedAt: replyCreatedAt,
          },
        });

        // Mark some discussions as solved by setting solutionPostId to one of the replies
        if ((i === 0 || i === 3) && j === 1) {
          // Use second reply (j === 1) as solution post
          solutionPostId = replyPost.id;
        }
      }
    }

    // Update discussion with solutionPostId if set
    if (solutionPostId) {
      await prisma.discussion.update({
        where: { id: discussion.id },
        data: { solutionPostId },
      });
    }

    // Add participants:
    if (i === 2) {
      // Discussion with no replies — only creator is participant
      if (discussion.userId) {
        await prisma.participant.create({
          data: {
            discussionId: discussion.id,
            userId: discussion.userId,
          },
        });
      }
    } else {
      // Discussion with replies — creator + up to 2 others
      const participantUserIds = [
        discussion.userId,
        ...users
          .filter((u) => u.id !== discussion.userId)
          .map((u) => u.id),
      ]
        .filter((id): id is string => typeof id === 'string')
        .slice(0, 3);

      for (const userId of participantUserIds) {
        await prisma.participant.create({
          data: {
            discussionId: discussion.id,
            userId,
          },
        });
      }
    }
  }

  console.log('Seed data created!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
