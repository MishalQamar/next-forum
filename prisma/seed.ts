import prisma from '@/lib/prisma';

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
  await prisma.job.deleteMany({});
  await prisma.job.createMany({
    data: jobs,
  });
};

seed();
