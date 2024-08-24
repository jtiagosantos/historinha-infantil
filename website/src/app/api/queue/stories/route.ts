import { NextRequest, NextResponse } from "next/server";
import { sqs } from "@/infra/sqs/client";
import { SendMessageCommand } from "@aws-sdk/client-sqs";
import { z } from "zod";
import cuid from "cuid";

const bodySchema = z.object({
  user: z.object({
    id: z.string(),
    email: z.string(),
  }),
  preferences: z.object({
    child: z.object({
      name: z.string(),
      age: z.number(),
    }),
    options: z.object({
      gender: z.string(),
      characters: z.string(),
      lessonOrMoral: z.string(),
      environment: z.string(),
      style: z.string(),
    }),
  }),
});

export const POST = async (request: NextRequest) => {
  try {
    const payload = bodySchema.parse(await request.json());

    const command = new SendMessageCommand({
      QueueUrl: process.env.AWS_SQS_STORIES_QUEUE_URL as string,
      MessageBody: JSON.stringify(payload),
      MessageGroupId: "stories-queue",
      MessageDeduplicationId: "stories-queue:".concat(cuid()),
    });

    await sqs.send(command);

    return NextResponse.json(
      {
        ok: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
        ok: false,
        error,
      },
      { status: 500 }
    );
  }
};
