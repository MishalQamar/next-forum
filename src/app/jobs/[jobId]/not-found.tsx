import Placeholder from '@/components/placeholder';
import { Button } from '@/components/ui/button';
import { jobsPath } from '@/paths';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Placeholder
      label="we could not find the job"
      button={
        <Button asChild variant="outline">
          <Link href={jobsPath()}>Go to Jobs</Link>
        </Button>
      }
    />
  );
}
