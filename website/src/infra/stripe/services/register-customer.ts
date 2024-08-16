import { stripe } from "../client";

type InputRegisterCustomer = {
  name: string;
  email: string;
}

type OutputRegisterCustomer = {
  id: string;
}

export const registerCustomer = async ({ 
  name,
  email,
}: InputRegisterCustomer): Promise<OutputRegisterCustomer> => {
  const customer = await stripe.customers.create({ name, email });

  return {
    id: customer.id,
  }
}
