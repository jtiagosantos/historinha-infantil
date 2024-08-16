import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { getUser } from '@/infra/fauna/services/get-user';
import { registerUser } from '@/infra/fauna/services/register-user';
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, profile }) {
      const isRegisteredUser = !!(await getUser({ email: user.email! }));

      if (isRegisteredUser) return true;

      //TODO: register customer on Stripe

      await registerUser({
        email: user.email!,
        firstName: profile?.given_name ?? '',
        lastName: profile?.family_name ?? '',
        customerId: '', //TODO: pass correct data
      });

      return true;
    },
  },
});
