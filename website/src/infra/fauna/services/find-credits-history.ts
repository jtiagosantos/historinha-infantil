import { http } from "@/infra/http/axios/client";
import { responseSchema } from "@/app/api/credits/history/user/[id]/route";
import { z } from "zod";

type InputFindCreditsHistory = {
  userId: string;
};

type OutputFindCreditsHistory = z.infer<typeof responseSchema>;

export const findCreditsHistory = async ({
  userId,
}: InputFindCreditsHistory): Promise<OutputFindCreditsHistory> => {
  const { data } = await http.get(`/credits/history/user/${userId}`);

  return data;
};
