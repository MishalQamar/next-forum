import { CardCompact } from '@/components/card-compact';
import Heading from '@/components/heading';

import { Spinner } from '@/components/spinner';
import { getAuth } from '@/features/auth/actions/get-auth';
import { JobList } from '@/features/job/components/job-list';
import { JobUpsertForm } from '@/features/job/components/upsert-form';

import { Suspense } from 'react';

const JobsPage = async () => {
  const { user } = await getAuth();
  return (
    <>
      <Heading
        title="My Jobs"
        description="Find Your next employee"
      />

      <CardCompact
        title="Create Job"
        description="A new Job will be created"
        className="mx-auto mt-16 flow-root max-w-lg sm:mt-20"
        content={<JobUpsertForm />}
      />

      <div className="mx-auto mt-16 flow-root max-w-lg sm:mt-20">
        <Suspense fallback={<Spinner />}>
          <JobList userId={user?.id} />
        </Suspense>
      </div>
    </>
  );
};

export default JobsPage;
