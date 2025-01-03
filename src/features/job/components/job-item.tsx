import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { jobEditPath, jobPath } from '@/paths';

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
import { JobWithMetaData } from '../types';
import { getAuth } from '@/features/auth/actions/get-auth';
import { isOwner } from '@/features/auth/utilis/is-owner';

type JobItemProps = {
  job: JobWithMetaData;
  isDetail?: boolean;
};

export const JobItem = async ({ job, isDetail }: JobItemProps) => {
  const { user } = await getAuth();

  const isJobOwner = await isOwner(user, job);

  const editButton = isJobOwner ? (
    <Button variant="outline" size="icon" asChild>
      <Link prefetch href={jobEditPath(job.id)}>
        <LucidePencil />
      </Link>
    </Button>
  ) : null;

  const detailButton = (
    <Button variant="outline" size="icon" asChild>
      <Link prefetch href={jobPath(job.id)}>
        <LucideSquareArrowOutUpRight />
      </Link>
    </Button>
  );

  const moreMenu = isJobOwner ? (
    <JobMoreMenu
      job={job}
      trigger={
        <Button variant="outline" size="icon">
          <LucideEllipsisVertical />
        </Button>
      }
    />
  ) : null;

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
            <p>
              {job.deadline} by {job.user.username}
            </p>
            <p>{toCurrencyFromCent(job.salary)}</p>
          </CardFooter>
        </Card>
      </div>
      {isDetail ? (
        <div className="flex flex-col gap-2">
          {editButton}

          {moreMenu}
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            {editButton}
            {detailButton}
          </div>
        </>
      )}
    </div>
  );
};
