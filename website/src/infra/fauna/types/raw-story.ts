export type RawStory = {
  id: string;
  story: {
    title: string;
    reading_time: number;
    text: string[];
  };
};
