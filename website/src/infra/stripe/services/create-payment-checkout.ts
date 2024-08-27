import { http } from "@/infra/http/axios/client";

type InputCreatePaymentCheckout = {
  customerId: string;
  priceId: string;
  cancelURL: string;
  successURL: string;
};

type OutputCreatePaymentCheckout = {
  checkoutURL: string | null;
  code: number;
  message: string;
};

export const createPaymentCheckout = async ({
  customerId,
  priceId,
  cancelURL,
  successURL,
}: InputCreatePaymentCheckout): Promise<OutputCreatePaymentCheckout> => {
  const { data } = await http.post("/gateway/payment/checkout/session/create", {
    customerId,
    priceId,
    cancelURL,
    successURL,
  });

  return data;
};
