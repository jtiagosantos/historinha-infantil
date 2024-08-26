import { fql } from "fauna";
import { fauna } from "../client";
import { RawStory } from "../types/raw-story";

type InputFindStories = {
  userId: string;
};

export const findStories = async ({ userId }: InputFindStories) => {
  const { data } = await fauna.query<{ data: RawStory[] } | null>(
    fql`stories.byUserId(${userId}).order(desc(.ts))`
  );

  return data?.data;
};
