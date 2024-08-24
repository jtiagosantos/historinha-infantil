import { SQSClient } from "@aws-sdk/client-sqs";

export const sqs = new SQSClient({
  region: process.env.AWS_PROFILE_REGION as string,
  credentials: {
    secretAccessKey: process.env.AWS_PROFILE_SECRET_ACCESS_KEY as string,
    accessKeyId: process.env.AWS_PROFILE_ACCESS_KEY_ID as string,
  },
});
