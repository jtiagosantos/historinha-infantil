import { http } from "@/infra/http/axios/client";
import { z } from "zod";
import { getStoryResponseSchema } from "../schemas/get-story-response-schema";

type InputGetStory = {
  id: string;
};

type OutputGetStory = z.infer<typeof getStoryResponseSchema>;

export const getStory = async ({
  id,
}: InputGetStory): Promise<OutputGetStory> => {
  const { data } = await http.get(`/stories/unique/${id}`);

  return data;
};
