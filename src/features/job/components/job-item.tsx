import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { jobEditPath, jobPath } from '@/paths';
import { Job } from '@prisma/client';
import clsx from 'clsx';
import {
  LucideEllipsisVertical,
  LucidePencil,
  LucideSquareArrowOutUpRight,
} from 'lucide-react';
import Link from 'next/link';
import { JOB_ICONS } from '../constants';

import { toCurrencyFromCent } from '@/utilis/currency';
import { JobMoreMenu } from './job-more-menu';

type JobItemProps = {
  job: Job;
  isDetail?: boolean;
};

export const JobItem = ({ job, isDetail }: JobItemProps) => {
  const editButton = (
    <Button variant="outline" size="icon" asChild>
      <Link prefetch href={jobEditPath(job.id)}>
        <LucidePencil />
      </Link>
    </Button>
  );

  const detailButton = (
    <Button variant="outline" size="icon" asChild>
      <Link prefetch href={jobPath(job.id)}>
        <LucideSquareArrowOutUpRight />
      </Link>
    </Button>
  );

  return (
    <div className="flex gap-x-2">
      <div className=" rounded-lg bg-white shadow w-full">
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-x-2">
              <span>{JOB_ICONS[job.status]}</span>
              <h2 className="truncate">{job.title}</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className={clsx('whitespace-break-spaces', {
                'line-clamp-3': !isDetail,
              })}
            >
              {job.content}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p>{job.deadline}</p>
            <p>{toCurrencyFromCent(job.salary)}</p>
          </CardFooter>
        </Card>
      </div>
      {isDetail ? (
        <div className="flex flex-col gap-2">
          {editButton}

          <JobMoreMenu
            job={job}
            trigger={
              <Button variant="outline" size="icon">
                <LucideEllipsisVertical />
              </Button>
            }
          />
        </div>
      ) : (
        detailButton
      )}
    </div>
  );
};
