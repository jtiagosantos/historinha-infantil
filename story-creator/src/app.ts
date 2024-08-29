import { SQSEvent } from 'aws-lambda';
import { bodySchema } from './schemas/body-schema';
import { createStory } from './infra/openai/services/create-story';
import { Story } from './types/story';
import { saveStory } from './infra/fauna/services/save-story';
import { sendEmailToQueue } from './infra/sqs/services/send-email-to-queue';
import { calculateReadingTime } from './helpers/calculate-reading-time';

export const handler = async (event: SQSEvent) => {
  try {
    for (const record of event.Records) {
      const { body } = record;
      const { user, preferences } = bodySchema.parse(JSON.parse(body));

      let story: Story;

      try {
        story = await createStory({ preferences });
      } catch (error) {
        console.log(error);
        throw new Error(`❌ Error creating story for user ${user.email}`);
      }

      try {
        const { id: storyId } = await saveStory({
          userId: user.id,
          preferences,
          story: {
            title: story.title,
            readingTime: calculateReadingTime(story.text),
            text: story.text,
          },
        });

        story = {
          ...story,
          id: storyId,
        };
      } catch (error) {
        console.log(error);
        throw new Error(`❌ Error saving story for user ${user.email}`);
      }

      try {
        await sendEmailToQueue({
          user: {
            email: user.email,
          },
          story: {
            id: story.id,
            title: story.title,
          },
        });
      } catch (error) {
        console.log(error);
        throw new Error(`❌ Error sending story to queue for user ${user.email}`);
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error(`❌ Internal Server Error`);
  }
};
