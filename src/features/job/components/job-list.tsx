import { getJobs } from '../queries/get-jobs';
import { JobItem } from './job-item';

type JobListProps = {
  userId?: string;
};

const JobList = async ({ userId }: JobListProps) => {
  const jobs = await getJobs(userId);

  return (
    <div className="gap-y-2 flex flex-col ">
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} />
      ))}
    </div>
  );
};

export { JobList };
