import { LucideBriefcaseBusiness } from 'lucide-react';
import { ReactElement, cloneElement } from 'react';

type PlaceHolderProps = {
  label: string;
  icon?: ReactElement<{ className?: string }>;
  button?: ReactElement<{ className?: string }>;
};

const Placeholder = ({
  icon = <LucideBriefcaseBusiness />,
  label,
  button = <div />,
}: PlaceHolderProps) => {
  return (
    <div className="flex-1 self-center flex flex-col items-center justify-center gap-y-2 mt-44">
      {cloneElement(icon, { className: 'w-16 h-16 ' })}

      <h4 className="text-lg font-bold">{label}</h4>

      {cloneElement(button, { className: ' h-10' })}
    </div>
  );
};

export default Placeholder;
