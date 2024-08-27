import { responseSchema } from "@/app/api/credits/user/[id]/route";
import { http } from "@/infra/http/axios/client";
import { z } from "zod";

type InputGetCredits = {
  userId: string;
};

type OutputGetCredits = z.infer<typeof responseSchema>;

export const getCredits = async ({
  userId,
}: InputGetCredits): Promise<OutputGetCredits> => {
  const { data } = await http.get(`/credits/user/${userId}`);

  return data;
};
