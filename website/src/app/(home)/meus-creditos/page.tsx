'use client';

import { useState } from 'react';
import { BackButton } from '@/components/back-button';
import { CreditsFallback } from './credits-fallback';
import { Button } from '@/components/ui/button';
import { Coins } from 'lucide-react';
import { BuyCreditsModal } from '@/components/buy-credits-modal';

export default function Page() {
  const [openModal, setOpenModal] = useState(false);

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

      <div className="mt-10 lg:mt-10 space-y-10">
        {/* <CreditsFallback /> */}

        <div className="w-full flex flex-col items-center">
          <p className="font-heading tracking-widest font-semibold text-2xl text-muted-foreground">2/3</p>
          <p className="font-body text-base text-muted-foreground">restante/total</p>
        </div>

        <div>
          <p className="font-heading tracking-widest font-semibold text-base text-muted-foreground mb-1">Informações Gerais</p>
          <p className="font-body text-muted-foreground text-base">- Crédito(s) comprado(s) em 10/08/2024</p>
          <p className="font-body text-muted-foreground text-base">- Pacote comprado com 3 crédito(s)</p>
          <p className="font-body text-muted-foreground text-base">- Pacote comprado por R$ 3,00</p>
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
    </main>
  );
}