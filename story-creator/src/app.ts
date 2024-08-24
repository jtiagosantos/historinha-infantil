import { SQSEvent } from 'aws-lambda';
import { bodySchema } from './schemas/body-schema';
import { createStory } from './infra/openai/services/create-story';
import { Story } from './types/story';

export const handler = async (event: SQSEvent) => {
  try {
    for (const record of event.Records) {
      const { body } = record;
      const { user, preferences } = bodySchema.parse(JSON.parse(body));

      let story: Story;

      try {
        story = await createStory({ preferences });
      } catch (error) {
        throw new Error(`❌ Error creating story for user ${user.email}: ${error}`);
      }

      console.log(story);

      try {
        //TODO: save story on database (fauna db)
      } catch (error) {
        throw new Error(`❌ Error saving story for user ${user.email}: ${error}`);
      }

      try {
        //TODO: send story to EmailsQueue
      } catch (error) {
        throw new Error(
          `❌ Error sending story to queue for user ${user.email}: ${error}`,
        );
      }
    }
  } catch (error) {
    throw new Error(`❌ Internal Server Error: ${error}`);
  }
};
