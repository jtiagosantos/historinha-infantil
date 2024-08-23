import { fql } from "fauna";
import { fauna } from "../client";
import { CreditsHistoryOperation } from "../enums/credits-history-operation";

type InputRegisterCreditsHistory = {
  userId: string;
  creditsQuantity: number;
  operation: keyof typeof CreditsHistoryOperation;
  text: string;
};

export const registerCreditsHistory = async ({
  userId,
  creditsQuantity,
  operation,
  text,
}: InputRegisterCreditsHistory) => {
  const data = {
    user_id: userId,
    credits_quantity: creditsQuantity,
    operation,
    text,
  };

  await fauna.query(fql`credits_history.create(${{ ...data }})`);
};
