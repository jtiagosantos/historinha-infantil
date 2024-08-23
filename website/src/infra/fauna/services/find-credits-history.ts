import { fql } from "fauna";
import { fauna } from "../client";
import { CreditsHistoryOperation } from "../enums/credits-history-operation";

type InputFindCreditsHistory = {
  userId: string;
};

type RawCreditsHistory = {
  id: string;
  credits_quantity: number;
  text: string;
  ts: {
    isoString: string;
  };
  operation: keyof typeof CreditsHistoryOperation;
};

export const findCreditsHistory = async ({
  userId,
}: InputFindCreditsHistory) => {
  const { data } = await fauna.query<{ data: RawCreditsHistory[] } | null>(
    fql`credits_history.byUserId(${userId}).order(desc(.ts)).take(10)`
  );

  return data?.data;
};
