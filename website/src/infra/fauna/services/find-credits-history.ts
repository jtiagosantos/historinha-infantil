import { http } from "@/infra/http/axios/client";
import { z } from "zod";
import { findCreditsHistoryResponseSchema } from "../schemas/find-credits-history-response-schema";

type InputFindCreditsHistory = {
  userId: string;
};

type OutputFindCreditsHistory = z.infer<
  typeof findCreditsHistoryResponseSchema
>;

export const findCreditsHistory = async ({
  userId,
}: InputFindCreditsHistory): Promise<OutputFindCreditsHistory> => {
  const { data } = await http.get(`/credits/history/user/${userId}`);

  return data;
};
