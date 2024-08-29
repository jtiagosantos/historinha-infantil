import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { fql } from "fauna";
import { fauna } from "@/infra/fauna/client";
import { getUserResponseSchema } from "@/infra/fauna/schemas/get-user-response-schema";

type Context = {
  params: {
    email: string;
  };
};

export const GET = async (_: NextRequest, context: Context) => {
  try {
    const { email } = context.params;

    const { data } = await fauna.query(fql`users.byEmail(${email}).first()`);

    const response = getUserResponseSchema.parse({
      user: data,
      code: !data ? 404 : 200,
      message: !data ? "User not found" : null,
    });

    return NextResponse.json(response);
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json({
        user: null,
        code: 500,
        message: error.response?.data,
      });
    }

    return NextResponse.json({ user: null, code: 500, message: error });
  }
};
