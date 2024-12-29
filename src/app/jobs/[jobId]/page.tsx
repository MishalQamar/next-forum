import { JobItem } from '@/features/job/components/job-item';
import { getJOb } from '@/features/job/queries/get-job';
import { notFound } from 'next/navigation';

type JobPageProps = {
  params: Promise<{
    jobId: string;
  }>;
};

const JobPage = async ({ params }: JobPageProps) => {
  const jobId = (await params).jobId;
  const job = await getJOb(jobId);

  if (!job) {
    notFound();
  }

  return (
    <div className="mx-auto mt-16 flow-root max-w-lg sm:mt-20">
      <JobItem isDetail job={job} />
    </div>
  );
};

export default JobPage;
