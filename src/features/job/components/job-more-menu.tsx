'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Job, JobStatus } from '@prisma/client';
import { JOB_STATUS } from '../constants';
import { UpdateJobStatus } from '../actions/update-job-status';
import { toast } from 'sonner';
import { LucideTrash2 } from 'lucide-react';

import { deleteJob } from '../actions/delete-job';

import { UseConfirmDialog } from '@/components/confirm-dialog';

type JobMoreMenuProps = {
  job: Job;
  trigger: React.ReactElement;
};

const JobMoreMenu = ({ job, trigger }: JobMoreMenuProps) => {
  const [alertTrigger, alertDialog] = UseConfirmDialog({
    action: deleteJob.bind(null, job.id),
    trigger: (
      <DropdownMenuItem>
        <LucideTrash2 />
        <span>Delete</span>
      </DropdownMenuItem>
    ),
  });

  const handleTicketStatusChange = async (value: string) => {
    const promise = UpdateJobStatus(job.id, value as JobStatus);

    toast.promise(promise, { loading: 'Loading...' });

    const result = await promise;

    if (result.status === 'SUCCESS') {
      toast.success(result.message);
    }

    if (result.status === 'ERROR') {
      toast.error(result.message);
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup
            value={job.status}
            onValueChange={handleTicketStatusChange}
          >
            {(Object.keys(JOB_STATUS) as Array<JobStatus>).map(
              (key) => (
                <DropdownMenuRadioItem value={key} key={key}>
                  {JOB_STATUS[key]}
                </DropdownMenuRadioItem>
              )
            )}
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />

          {alertTrigger}
        </DropdownMenuContent>
      </DropdownMenu>
      {alertDialog}
    </>
  );
};

export { JobMoreMenu };
