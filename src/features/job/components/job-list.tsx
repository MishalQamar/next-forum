import { getJobs } from '../queries/get-jobs';
import { JobItem } from './job-item';

const JobList = async () => {
  const jobs = await getJobs();

  return (
    <div className="gap-y-2 flex flex-col ">
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} />
      ))}
    </div>
  );
};

export { JobList };
