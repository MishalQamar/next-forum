import Heading from '@/components/heading';
import { Spinner } from '@/components/spinner';
import { JobList } from '@/features/job/components/job-list';

import { Suspense } from 'react';

const HomePage = () => {
  return (
    <>
      <Heading title="Next Job" description="Find your next job" />
      <div className="mx-auto mt-16 flow-root max-w-lg sm:mt-20">
        <Suspense fallback={<Spinner />}>
          <JobList />
        </Suspense>
      </div>
    </>
  );
};

export default HomePage;
