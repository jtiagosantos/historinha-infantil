import { fql } from 'fauna';
import { fauna } from '../client';

type InputSaveStory = {
  userId: string;
  preferences: {
    child: {
      name: string;
      age: number;
    };
    options: {
      gender: string;
      characters: string;
      lessonOrMoral: string;
      environment: string;
      style: string;
    };
  };
  story: {
    title: string;
    readingTime: number;
    text: string[];
  };
};

type OutputSaveStory = {
  id: string;
};

export const saveStory = async ({
  userId,
  preferences,
  story,
}: InputSaveStory): Promise<OutputSaveStory> => {
  const data = {
    user_id: userId,
    preferences: {
      child: {
        name: preferences.child.name,
        age: preferences.child.age,
      },
      options: {
        gender: preferences.options.gender,
        characters: preferences.options.characters,
        lesson_or_moral: preferences.options.lessonOrMoral,
        environment: preferences.options.environment,
        style: preferences.options.style,
      },
    },
    story: {
      title: story.title,
      reading_time: story.readingTime,
      text: story.text,
    },
  };

  const { data: createdStory } = await fauna.query(fql`stories.create(${{ ...data }})`);

  return {
    id: createdStory.id,
  };
};
