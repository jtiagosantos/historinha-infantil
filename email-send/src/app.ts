import fs from 'node:fs';
import path from 'node:path';
import { SQSEvent } from 'aws-lambda';
import { bodySchema } from './schemas/body-schema';
import { sendEmail } from './infra/resend/services/send-email';
import { compileEmailTemplate } from './helpers/compile-email-template';

export const handler = async (event: SQSEvent) => {
  try {
    for (const record of event.Records) {
      const { body } = record;
      const { user, story } = bodySchema.parse(JSON.parse(body));

      const rootDir =
        process.env.NODE_ENV === 'production' ? process.env.LAMBDA_TASK_ROOT! : __dirname;

      const htmlFilePath = path.join(
        rootDir,
        '/templates/email-about-created-story.html',
      );
      const emailTemplate = fs.readFileSync(htmlFilePath, 'utf-8');

      const { error } = await sendEmail({
        from: 'Historinha Infantil <onboarding@resend.dev>',
        to: user.email,
        subject: 'Historinha criada! 🎉',
        html: compileEmailTemplate(emailTemplate, {
          emailTitle: 'Historinha criada! 🎉',
          storyLink: `http://localhost:3000/historia/${story.id}`, //TODO: add correct domain
        }),
      });

      if (error) {
        console.log(error);
        throw new Error(`❌ Error send email for user ${user.email}`);
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error(`❌ Internal Server Error`);
  }
};
