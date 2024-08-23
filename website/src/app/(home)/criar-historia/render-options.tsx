import { FC, memo } from 'react';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

type Option = {
  id: string;
  value: string;
  label: string;
}

type RenderOptionsComponentProps = {
  options: Option[];
}

const RenderOptionsComponent: FC<RenderOptionsComponentProps> = ({ options }) => {
  return options.map((option) => (
    <div key={option.id} className="flex items-center space-x-2">
      <RadioGroupItem id={option.id} value={option.value} />
      <Label htmlFor={option.id} className="font-body text-muted-foreground">{option.label}</Label>
    </div>
  ));
}

export const RenderOptions = memo(RenderOptionsComponent);