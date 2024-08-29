import { zodResponseFormat } from 'openai/helpers/zod';
import { openai } from '../client';
import { createStoryPrompt } from '../prompts/create-story';
import { storySchema } from '@/schemas/story-schema';
import { Story } from '@/types/story';

type InputCreateStory = {
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
};

export const createStory = async ({ preferences }: InputCreateStory): Promise<Story> => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: createStoryPrompt({ preferences }),
      },
    ],
    model: 'gpt-4o-mini',
    temperature: 0.4,
    response_format: zodResponseFormat(storySchema, 'story'),
  });

  const story = completion.choices[0].message.content;

  return JSON.parse(story!);
};
