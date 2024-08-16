'use client';

import { signOut } from 'next-auth/react';
import { Button } from './ui/button';

export const SignOutButton = () => {
  return (
    <Button 
      onClick={() => signOut({ callbackUrl: '/autenticar' })} 
      className="text-sm hover:underline hover:text-accent underline-offset-4"
    >
      Sair da conta
    </Button>
  );
}
