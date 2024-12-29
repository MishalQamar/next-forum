import { CardCompact } from '@/components/card-compact';
import Heading from '@/components/heading';

import { Spinner } from '@/components/spinner';
import { JobList } from '@/features/job/components/job-list';
import { JobUpsertForm } from '@/features/job/components/upsert-form';

import { Suspense } from 'react';

const JobsPage = async () => {
  return (
    <>
      <Heading title="Next Job" description="Find Your next job" />

      <CardCompact
        title="Create Job"
        description="A new Job will be created"
        className="mx-auto mt-16 flow-root max-w-lg sm:mt-20"
        content={<JobUpsertForm />}
      />

      <div className="mx-auto mt-16 flow-root max-w-lg sm:mt-20">
        <Suspense fallback={<Spinner />}>
          <JobList />
        </Suspense>
      </div>
    </>
  );
};

export default JobsPage;
