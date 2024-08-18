import Link from 'next/link';
import { MoveLeft } from 'lucide-react';
import { FC } from 'react';

type BackButtonProps = {
  href: string;
}

export const BackButton: FC<BackButtonProps> = ({ href }) => {
  return (
    <Link 
      href={href}
      className="w-fit flex items-center gap-[6px] font-heading font-medium text-[18px] hover:underline hover:text-accent underline-offset-4" 
      prefetch={false}
    >
      <MoveLeft className="w-5 h-5 pt-[3px]" />
      voltar
    </Link>
  );
}