import Heading from '@/components/heading';
import { jobsPath } from '@/paths';
import Link from 'next/link';

const HomePage = () => {
  return (
    <>
      <Heading title="Home" description="Find your next job" />
      <div className="mx-auto mt-16 flow-root max-w-lg sm:mt-20">
        <Link href={jobsPath()}>Go to Jobs</Link>
      </div>
    </>
  );
};

export default HomePage;
