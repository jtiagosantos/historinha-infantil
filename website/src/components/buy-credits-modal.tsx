'use client';

import { FC, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Check, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import clsx from 'clsx';
import { ThreeDots } from 'react-loader-spinner';
import { useSession } from 'next-auth/react';
import { getUser } from '@/infra/fauna/services/get-user';
import { createPaymentCheckout } from '@/infra/stripe/services/create-payment-checkout';
import { useToast } from './ui/use-toast';

const PRICE_IDS = {
  PACKAGE_WITH_ONE_CREDIT: 'price_1Pq3ncGl06TQK25QRcXu4RJA',
  PACKAGE_WITH_THREE_CREDIS: 'price_1Pq3rwGl06TQK25Qu5OqTfNb',
  PACKAGE_WITH_FIVE_CREDITS: 'price_1Pq3sRGl06TQK25QHzc2eQQL',
};

type BuyCreditsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  successURL: string;
}

export const BuyCreditsModal: FC<BuyCreditsModalProps> = ({ open, onOpenChange, successURL }) => {
  const session = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [priceId, setPriceId] = useState<string | undefined>(undefined);
  const [isLoadingPaymentCheckout, setIsLoadingPaymentCheckout] = useState(false);

  const handleCreateCheckout = async () => {
    try {
      setIsLoadingPaymentCheckout(true);

      const user = await getUser({ email: session.data?.user?.email! });

      const { checkoutURL } = await createPaymentCheckout({
        customerId: user!.customer_id,
        priceId: priceId!,
        cancelURL: window.location.href,
        successURL,
      });

      if (!checkoutURL) {
        toast({
          description: 'Erro inesperado ao gerar o link de pagamento, tente novamente',
        });
        return;
      }

      router.push(checkoutURL);
    } finally {
      setIsLoadingPaymentCheckout(false);
    }
  }

  const handleClose = (open: boolean) => {
    setPriceId(undefined);
    onOpenChange(open);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Compra de Créditos</DialogTitle>
          <DialogDescription className="font-body text-muted-foreground">Selecione a opção desejada</DialogDescription>
        </DialogHeader>
        <div className="w-full flex flex-col gap-3">
          <button
            onClick={() => setPriceId(PRICE_IDS.PACKAGE_WITH_ONE_CREDIT)}
            className={clsx('w-full border-[2px] rounded-lg flex flex-col items-start gap-2 p-2', {
              'border-muted-foreground': priceId === PRICE_IDS.PACKAGE_WITH_ONE_CREDIT,
              'border-muted': priceId !== PRICE_IDS.PACKAGE_WITH_ONE_CREDIT,
            })}
          >
            <p className="font-heading text-xl font-semibold text-muted-foreground">R$ 1,49</p>
            <ol>
              <li className="font-body text-base text-muted-foreground text-left flex items-center gap-1">
                <Check size={16} strokeWidth={2} />
                Pacote com 1 crédito
              </li>
              <li className="font-body text-base text-muted-foreground text-left flex items-center gap-1">
                <Check size={16} strokeWidth={2} />
                Crie até 1 história
              </li>
            </ol>
          </button>
          <button
            onClick={() => setPriceId(PRICE_IDS.PACKAGE_WITH_THREE_CREDIS)}
            className={clsx('w-full border-[2px] rounded-lg flex flex-col items-start gap-2 p-2', {
              'border-muted-foreground': priceId === PRICE_IDS.PACKAGE_WITH_THREE_CREDIS,
              'border-muted': priceId !== PRICE_IDS.PACKAGE_WITH_THREE_CREDIS,
            })}
          >
            <p className="font-heading text-xl font-semibold text-muted-foreground">R$ 3,00</p>
            <ol>
              <li className="font-body text-base text-muted-foreground text-left flex items-center gap-1">
                <Sparkles size={16} strokeWidth={2} />
                Desconto de 67%
              </li>
              <li className="font-body text-base text-muted-foreground text-left flex items-center gap-1">
                <Check size={16} strokeWidth={2} />
                Pacote com 3 créditos
              </li>
              <li className="font-body text-base text-muted-foreground text-left flex items-center gap-1">
                <Check size={16} strokeWidth={2} />
                Crie até 3 histórias
              </li>
            </ol>
          </button>
          <button
            onClick={() => setPriceId(PRICE_IDS.PACKAGE_WITH_FIVE_CREDITS)}
            className={clsx('w-full border-[2px] rounded-lg flex flex-col items-start gap-2 p-2', {
              'border-muted-foreground': priceId === PRICE_IDS.PACKAGE_WITH_FIVE_CREDITS,
              'border-muted': priceId !== PRICE_IDS.PACKAGE_WITH_FIVE_CREDITS,
            })}
          >
            <p className="font-heading text-xl font-semibold text-muted-foreground">R$ 5,00</p>
            <ol>
              <li className="font-body text-base text-muted-foreground text-left flex items-center gap-1">
                <Sparkles size={16} strokeWidth={2} />
                Desconto de 67%
              </li>
              <li className="font-body text-base text-muted-foreground text-left flex items-center gap-1">
                <Check size={16} strokeWidth={2} />
                Pacote com 5 créditos
              </li>
              <li className="font-body text-base text-muted-foreground text-left flex items-center gap-1">
                <Check size={16} strokeWidth={2} />
                Crie até 5 histórias
              </li>
            </ol>
          </button>
        </div>
        <DialogFooter className="sm:justify-end">
          <Button
            disabled={!priceId || isLoadingPaymentCheckout}
            onClick={handleCreateCheckout}
            className="flex items-center justify-center gap-[6px] bg-primary py-[10px] px-3 font-heading text-sm font-medium tracking-widest rounded-lg hover:bg-accent"
          >
            {!isLoadingPaymentCheckout ? 'Finalizar compra' : (
              <ThreeDots
                height="20"
                width="40"
                radius="9"
                color="#5c4523"
                ariaLabel="three-dots-loading"
                visible={true}
              />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}