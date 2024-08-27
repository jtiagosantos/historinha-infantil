import { http } from "@/infra/http/axios/client";

type InputRegisterCredits = {
  userId: string;
  remainingQuantity: number;
  totalQuantity: number;
  price: string;
  active: boolean;
};

type OutputRegisterCredits = {
  code: number;
  message: string;
};

export const registerCredits = async ({
  userId,
  remainingQuantity,
  totalQuantity,
  price,
  active,
}: InputRegisterCredits): Promise<OutputRegisterCredits> => {
  const { data } = await http.post("/credits/register", {
    userId,
    remainingQuantity,
    totalQuantity,
    price,
    active,
  });

  return data;
};
