import { fql } from "fauna";
import { fauna } from "../client";
import { RawStory } from "../types/raw-story";

type InputGetStory = {
  id: string;
};

export const getStory = async ({ id }: InputGetStory) => {
  const { data } = await fauna.query<RawStory | null>(fql`stories.byId(${id})`);

  return data;
};
