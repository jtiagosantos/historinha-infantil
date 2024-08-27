import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { getUser } from "@/infra/fauna/services/get-user";
import { registerUser } from "@/infra/fauna/services/register-user";
import { registerCustomer } from "@/infra/stripe/services/register-customer";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [Google],
  callbacks: {
    async signIn({ user, profile }) {
      try {
        const { code } = await getUser({ email: user.email! });

        if (code === 200) return true;

        const { customer, code: customerCode } = await registerCustomer({
          name: profile?.given_name ?? "",
          email: user.email!,
        });

        if (customerCode !== 202) return false;

        const { code: userCode } = await registerUser({
          email: user.email!,
          firstName: profile?.given_name ?? "",
          lastName: profile?.family_name ?? "",
          customerId: customer.id,
        });

        return userCode === 202;
      } catch {
        return false;
      }
    },
  },
});
