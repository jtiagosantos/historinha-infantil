import { CreditsHistoryOperation } from "../enums/credits-history-operation";
import { http } from "@/infra/http/axios/client";

type InputRegisterCreditsHistory = {
  userId: string;
  creditsQuantity: number;
  operation: keyof typeof CreditsHistoryOperation;
  text: string;
};

type OutputRegisterCreditsHistory = {
  code: string;
  message: string | null;
};

export const registerCreditsHistory = async ({
  userId,
  creditsQuantity,
  operation,
  text,
}: InputRegisterCreditsHistory): Promise<OutputRegisterCreditsHistory> => {
  const { data } = await http.post("credits/history/register", {
    userId,
    creditsQuantity,
    operation,
    text,
  });

  return data;
};
