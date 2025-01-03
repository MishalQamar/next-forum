import prisma from '@/lib/prisma';
import { hash } from '@node-rs/argon2';

const users = [
  {
    username: 'admin',
    email: 'admin@admin.com',
  },
  {
    username: 'user',
    // use your own email here
    email: 'mishalqamar@gmail.com',
  },
];

const jobs = [
  {
    title: 'job 1',
    content: 'This is the first job',
    status: 'OPEN' as const,
    deadline: new Date().toISOString().split('T')[0],
    salary: 499,
  },
  {
    title: 'job 2',
    content: 'This is the second job',
    status: 'CLOSED' as const,
    deadline: new Date().toISOString().split('T')[0],
    salary: 499,
  },

  {
    title: 'job 3',
    content: 'This is the third job',
    status: 'ON_HOLD' as const,
    deadline: new Date().toISOString().split('T')[0],
    salary: 499,
  },
];

const seed = async () => {
  const t0 = performance.now();
  console.log('DB Seed: Started ...');

  await prisma.user.deleteMany();
  await prisma.job.deleteMany();

  const passwordHash = await hash('geheimnis');

  const dbUsers = await prisma.user.createManyAndReturn({
    data: users.map((user) => ({
      ...user,
      passwordHash,
    })),
  });

  await prisma.job.createMany({
    data: jobs.map((job) => ({
      ...job,
      userId: dbUsers[0].id,
    })),
  });

  const t1 = performance.now();
  console.log(`DB Seed: Finished (${t1 - t0}ms)`);
};

seed();
