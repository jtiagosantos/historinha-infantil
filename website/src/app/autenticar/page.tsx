'use client';

import { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GoogleIcon } from '@/components/icons/google';
import { signIn } from 'next-auth/react';

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSign = async () => {
    setIsLoading(true);
    await signIn('google', { redirectTo: '/' });
    setIsLoading(false);
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-lg py-6 pb-3 px-2 shadow-lg rounded-lg bg-card border border-red-400 border-border max-sm:h-screen max-sm:flex max-sm:items-center max-sm:pb-[80px]">
        <CardContent className="space-y-10 max-sm:px-1">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-card-foreground mb-3">Historinha Personalizada</h2>
            <p className="text-muted-foreground">
              Crie histórias únicas para sua criança com base em seus interesses e preferências.
              Deixe sua criança mergulhar em aventuras épicas, com detalhes personalizados que a cativam.
            </p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground w-full text-left">* Faça login para criar uma história.</p>
            <Button 
              disabled={isLoading}
              onClick={handleSign} 
              className="mt-2 flex items-center justify-center w-full bg-background border border-input text-muted-foreground py-3 rounded-lg hover:bg-accent hover:text-accent-foreground outline-accent"
            >
              {!isLoading ? (
                <>
                  <GoogleIcon className="mr-2 h-5 w-5" />
                  Entrar com Google
                </>
              ) : (
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}