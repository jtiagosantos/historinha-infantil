import { responseSchema } from "@/app/api/stories/unique/[id]/route";
import { http } from "@/infra/http/axios/client";
import { z } from "zod";

type InputGetStory = {
  id: string;
};

type OutputGetStory = z.infer<typeof responseSchema>;

export const getStory = async ({
  id,
}: InputGetStory): Promise<OutputGetStory> => {
  const { data } = await http.get(`/stories/unique/${id}`);

  return data;
};
