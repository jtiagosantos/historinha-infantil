'use client';

import { FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useSession } from 'next-auth/react';
import { PartyPopper } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type ConfirmationModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ConfirmationModal: FC<ConfirmationModalProps> = ({ open, onOpenChange }) => {
  const session = useSession();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className="w-full flex flex-col items-center mt-6">
          <PartyPopper size={70} strokeWidth={1.2} className="mb-6 text-muted-foreground" />
          <p className="font-body text-base text-muted-foreground w-full text-center">
            A sua historinha personalizada está sendo criada. Em alguns instantes você receberá um email em{' '}
            <Link target='_blank' href="https://mail.google.com" className="underline underline-offset-4">
              {session.data?.user?.email}
            </Link>
            {' '}com o link de acesso completo à história.
          </p>
        </div>
        <DialogFooter className="w-full justify-center mt-4">
          {typeof window !== 'undefined' && (
            <Link
              href={window.location.origin}
              className="flex items-center justify-center gap-[6px] bg-primary py-[10px] px-3 font-heading text-sm font-medium tracking-widest rounded-lg hover:bg-accent"
            >
              Voltar para a página inicial
            </Link>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}