import { responseSchema } from "@/app/api/stories/many/user/[userId]/route";
import { http } from "@/infra/http/axios/client";
import { z } from "zod";

type InputFindStories = {
  userId: string;
};

type OutputFindStories = z.infer<typeof responseSchema>;

export const findStories = async ({
  userId,
}: InputFindStories): Promise<OutputFindStories> => {
  const { data } = await http.get(`/stories/many/user/${userId}`);

  return data;
};
