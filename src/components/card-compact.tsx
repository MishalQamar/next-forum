import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

type CardCompactProps = {
  title: string;
  description: string;

  content: React.ReactNode;
  action: React.ReactNode;
};

const CardCompact = ({
  title,
  description,
  content,
  action,
}: CardCompactProps) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description} </CardDescription>
        <CardAction>{action}</CardAction>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
};

export { CardCompact };
