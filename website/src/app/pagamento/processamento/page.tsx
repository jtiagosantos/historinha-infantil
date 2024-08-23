/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Oval } from 'react-loader-spinner';
import { PartyPopper } from 'lucide-react';
import { SessionProvider, useSession } from 'next-auth/react';
import { getUser } from '@/infra/fauna/services/get-user';
import { getCredits } from '@/infra/fauna/services/get-credits';

const ONE_SECOND = 1000;

const PageComponent = () => {
  const session = useSession();
  const [successfulPayment, setSuccessfulPayment] = useState<boolean | undefined>(undefined);
  const pollingRef = useRef<NodeJS.Timeout>();
  const fetchingCredits = useRef(false);

  const getRedirectURL = () => {
    const url = window.location.search.replace('?url=', '');

    return url;
  }

  const cancelPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = undefined;
    }
  };

  const handleFetchCredits = async () => {
    if (fetchingCredits.current) return;

    fetchingCredits.current = true;

    try {
      const user = await getUser({ email: session.data?.user?.email! });
      const credits = await getCredits({ userId: user?.id! });

      if (credits?.active) {
        cancelPolling();
        setSuccessfulPayment(true);
      }
    } finally {
      fetchingCredits.current = false;
    }
  }

  useEffect(() => {
    if (session.data?.user?.email) {
      pollingRef.current = setInterval(() => {
        handleFetchCredits();
      }, ONE_SECOND);
    }

    return () => {
      clearInterval(pollingRef.current);
    };
  }, [session]);

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center">
      {!successfulPayment ? (
        <>
          <Oval
            visible={true}
            height="100"
            width="100"
            color="#5c4523"
            ariaLabel="oval-loading"
            secondaryColor="#c7a26b"
            strokeWidth={3}
          />
          <p className="font-body font-semibold text-muted-foreground text-[18px] max-w-[230px] w-full text-center mt-10">
            Estamos processando o seu pagamento, aguarde...
          </p>
        </>
      ) : (
        <>
          <PartyPopper size={90} strokeWidth={1.5} className="mb-6" />
          <p className="font-body font-semibold text-muted-foreground text-[17px] w-full text-center mb-6">
            Pagamento realizado com sucesso :)
          </p>
          <Link
            href={getRedirectURL()}
            className="flex items-center justify-center gap-[6px] bg-primary py-[10px] px-3 font-heading text-sm font-medium tracking-widest rounded-lg hover:bg-accent"
          >
            Continuar
          </Link>
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