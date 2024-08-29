import { randomUUID } from 'node:crypto';
import { SendMessageCommand } from '@aws-sdk/client-sqs';
import { sqs } from '../client';

type InputSendEmailToQueue = {
  user: {
    email: string;
  };
  story: {
    id: string;
    title: string;
  };
};

export const sendEmailToQueue = async ({ user, story }: InputSendEmailToQueue) => {
  const payload = { user, story };

  const command = new SendMessageCommand({
    QueueUrl: process.env.AWS_SQS_EMAILS_QUEUE_URL as string,
    MessageBody: JSON.stringify(payload),
    MessageGroupId: 'emails-queue',
    MessageDeduplicationId: 'emails-queue:'.concat(randomUUID()),
  });

  await sqs.send(command);
};
