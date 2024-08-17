import { Frown } from 'lucide-react';

export const StoriesFallback = () => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center mt-[140px]">
      <Frown className="text-muted-foreground" size={40} strokeWidth={1.5} />
      <span className="font-body text-base text-center">Você não possui histórias criadas até o momento</span>
    </div>
  );
}