import { http } from "@/infra/http/axios/client";
import { z } from "zod";
import { getCreditsResponseSchema } from "../schemas/get-credits-response-schema";

type InputGetCredits = {
  userId: string;
};

type OutputGetCredits = z.infer<typeof getCreditsResponseSchema>;

export const getCredits = async ({
  userId,
}: InputGetCredits): Promise<OutputGetCredits> => {
  const { data } = await http.get(`/credits/user/${userId}`);

  return data;
};
