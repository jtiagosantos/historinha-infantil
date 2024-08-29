import fs from 'node:fs';
import path from 'node:path';
import { SQSEvent } from 'aws-lambda';
import { bodySchema } from './schemas/body-schema';
import { sendEmail } from './infra/resend/services/send-email';
import { compileEmailTemplate } from './helpers/compile-email-template';
import { createSlug } from './helpers/create-slug';

export const handler = async (event: SQSEvent) => {
  try {
    for (const record of event.Records) {
      const { body } = record;
      const { user, story } = bodySchema.parse(JSON.parse(body));

      let htmlFilePath;

      if (process.env.NODE_ENV === 'production') {
        htmlFilePath = path.join(
          process.env.LAMBDA_TASK_ROOT as string,
          '/src/templates/email-about-created-story.html',
        );
      } else {
        htmlFilePath = path.join(__dirname, '/templates/email-about-created-story.html');
      }
      const emailTemplate = fs.readFileSync(htmlFilePath, 'utf-8');

      const slug = createSlug(story.title).concat('--').concat(story.id);

      const { error } = await sendEmail({
        from: 'Historinha Infantil <onboarding@resend.dev>',
        to: user.email,
        subject: 'Historinha criada! 🎉',
        html: compileEmailTemplate(emailTemplate, {
          emailTitle: 'Historinha criada! 🎉',
          storyLink: `https://historinha-infantil.vercel.app/historia/${slug}`,
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
