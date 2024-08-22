import { stripe } from '../client';

type InputCreatePaymentCheckout = {
  customerId: string;
  priceId: string;
  cancelURL: string;
  successURL: string;
}

type OutputCreatePaymentCheckout = {
  checkoutURL: string | null;
}

export const createPaymentCheckout = async ({ 
  customerId, 
  priceId, 
  cancelURL, 
  successURL,
}: InputCreatePaymentCheckout): Promise<OutputCreatePaymentCheckout> => {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'payment',
    cancel_url: cancelURL,
    success_url: successURL,
    locale: 'pt-BR',
  });

  return {
    checkoutURL: session.url,
  };
}