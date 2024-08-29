import { http } from "@/infra/http/axios/client";
import { z } from "zod";
import { findStoriesResponseSchema } from "../schemas/find-stories-response-schema";

type InputFindStories = {
  userId: string;
};

type OutputFindStories = z.infer<typeof findStoriesResponseSchema>;

export const findStories = async ({
  userId,
}: InputFindStories): Promise<OutputFindStories> => {
  const { data } = await http.get(`/stories/many/user/${userId}`);

  return data;
};
