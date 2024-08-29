import { http } from "@/infra/http/axios/client";

type InputUpdateCredits = {
  id: string;
  remainingQuantity?: number;
  totalQuantity?: number;
  price?: string;
  active?: boolean;
  purchasedAt?: string;
};

type OutputUpdateCredits = {
  code: string;
  message: string | null;
};

export const updateCredits = async ({
  id,
  remainingQuantity,
  totalQuantity,
  price,
  active,
  purchasedAt,
}: InputUpdateCredits): Promise<OutputUpdateCredits> => {
  const { data } = await http.put(`/credits/update/${id}`, {
    remainingQuantity,
    totalQuantity,
    price,
    active,
    purchasedAt,
  });

  return data;
};
