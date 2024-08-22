'use client';

import { useEffect, useState } from 'react';
import { Coins } from 'lucide-react';
import { Oval } from 'react-loader-spinner';
import { SessionProvider, useSession } from 'next-auth/react';
import { BackButton } from '@/components/back-button';
import { CreditsFallback } from './credits-fallback';
import { Button } from '@/components/ui/button';
import { BuyCreditsModal } from '@/components/buy-credits-modal';
import { getCredits } from '@/infra/fauna/services/get-credits';
import { formatDate } from '@/utils/format-date';
import { formatPrice } from '@/utils/format-price';

type Credits = {
  remainingQuantity: number;
  totalQuantity: number;
  price: string;
  purchasedAt: string;
}

const PageComponent = () => {
  const session = useSession();
  const [openModal, setOpenModal] = useState(false);
  const [isLoadingCredits, setIsLoadingCredits] = useState(true);
  const [credits, setCredits] = useState<Credits | undefined>(undefined);

  const handleFetchCredits = async (userId: string) => {
    try {
      const credits = await getCredits({ userId });
      if (credits) {
        setCredits({
          remainingQuantity: credits.remaining_quantity,
          totalQuantity: credits.total_quantity,
          price: formatPrice(credits.price),
          purchasedAt: formatDate(credits.purchased_at.isoString),
        })
      }
    } finally {
      setIsLoadingCredits(false);
    }
  }

  useEffect(() => {
    if (session.data?.user?.id) {
      handleFetchCredits(session.data.user.id);
    }
  }, [session]);

  return (
    <main className="max-w-[1000px] mx-auto mb-6 p-4 pt-4 lg:p-6 lg:pt-4">
      <div className="w-full flex items-center justify-between">
        <BackButton href="/" />

        <Button
          onClick={() => setOpenModal(true)}
          className="flex items-center justify-center gap-[6px] bg-primary py-[10px] px-3 font-heading text-sm font-medium tracking-widest rounded-lg hover:bg-accent"
        >
          <Coins className="w-[18px] h-[18px]" strokeWidth={2} />
          Comprar créditos
        </Button>
        <BuyCreditsModal open={openModal} onOpenChange={setOpenModal} />
      </div>

      {isLoadingCredits && (
        <div className="flex justify-center mt-[190px]">
          <Oval
            visible={true}
            height="46"
            width="46"
            color="#5c4523"
            ariaLabel="oval-loading"
            secondaryColor="#c7a26b"
            strokeWidth={4}
          />
        </div>
      )}

      {!isLoadingCredits && !credits && <CreditsFallback />}

      {!isLoadingCredits && !!credits && (
        <>
          <div className="mt-10 space-y-10">
            <div className="w-full flex flex-col items-center">
              <p className="font-heading tracking-widest font-semibold text-2xl text-muted-foreground">
                {credits.remainingQuantity}/{credits.totalQuantity}
              </p>
              <p className="font-body text-base text-muted-foreground">restante/total</p>
            </div>
    
            <div>
              <p className="font-heading tracking-widest font-semibold text-base text-muted-foreground mb-1">Informações Gerais</p>
              <p className="font-body text-muted-foreground text-base">
                - Crédito(s) comprado(s) em {credits.purchasedAt}
              </p>
              <p className="font-body text-muted-foreground text-base">
                - Pacote comprado com {credits.totalQuantity} crédito(s)
              </p>
              <p className="font-body text-muted-foreground text-base">
                - Pacote comprado por R$ {credits.price}
              </p>
            </div>
    
            <div>
              <p className="font-heading tracking-widest font-semibold text-base text-muted-foreground">
                Histórico de Créditos
              </p>
              <p className="font-heading tracking-wider text-muted-foreground text-sm">Os 10 últimos registros</p>
              <ol className="mt-6 space-y-4">
                <li className="w-full flex items-center justify-between">
                  <p className="font-body text-base text-muted-foreground">1. Criação de história</p>
                  <div className="flex items-center gap-5 max-[494px]:flex-col max-[494px]:items-end max-[494px]:gap-1">
                    <p className="min-w-[124px] text-center font-body font-medium text-sm text-red-700 bg-red-400 py-1 px-[6px] rounded">
                      -1 crédito(s)
                    </p>
                    <p className="font-body text-base text-muted-foreground">15/08/2024</p>
                  </div>
                </li>
                <li className="w-full flex items-center justify-between">
                  <p className="font-body text-base text-muted-foreground">2. Compra de crédito(s)</p>
                  <div className="flex items-center gap-5 max-[494px]:flex-col max-[494px]:items-end max-[494px]:gap-1">
                    <p className="min-w-[124px] text-center font-body font-medium text-sm text-green-700 bg-green-400 py-1 px-[6px] rounded">
                      +3 crédito(s)
                    </p>
                    <p className="font-body text-base text-muted-foreground">10/08/2024</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default function Page() {
  return (
    <SessionProvider>
      <PageComponent />
    </SessionProvider>
  );
}