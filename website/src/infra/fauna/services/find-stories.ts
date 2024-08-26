import { fql } from "fauna";
import { fauna } from "../client";

type InputFindStories = {
  userId: string;
};

type RawStory = {
  id: string;
  story: {
    title: string;
    reading_time: number;
    text: string[];
  };
};

export const findStories = async ({ userId }: InputFindStories) => {
  const { data } = await fauna.query<{ data: RawStory[] } | null>(
    fql`stories.byUserId(${userId}).order(desc(.ts))`
  );

  return data?.data;
};
