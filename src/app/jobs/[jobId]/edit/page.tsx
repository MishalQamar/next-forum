import { CardCompact } from '@/components/card-compact';
import { JobUpsertForm } from '@/features/job/components/upsert-form';
import { getJOb } from '@/features/job/queries/get-job';
import { notFound } from 'next/navigation';

type EditPageProps = {
  params: Promise<{
    jobId: string;
  }>;
};

const EditPage = async ({ params }: EditPageProps) => {
  const jobId = (await params).jobId;
  const job = await getJOb(jobId);
  if (!job) {
    notFound();
  }

  return (
    <CardCompact
      title="Edit Job"
      description="Job will be edited"
      className="mx-auto mt-16 flow-root max-w-lg sm:mt-20"
      content={<JobUpsertForm job={job} />}
    />
  );
};

export default EditPage;
