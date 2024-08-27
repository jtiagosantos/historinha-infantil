import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { fql } from "fauna";
import { fauna } from "@/infra/fauna/client";

const bodySchema = z
  .object({
    customerId: z.string(),
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
  })
  .transform((input) => ({
    customer_id: input.customerId,
    email: input.email,
    first_name: input.firstName,
    last_name: input.lastName,
  }));

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const { customer_id, email, first_name, last_name } =
      bodySchema.parse(body);

    const { data: userByEmail } = await fauna.query(
      fql`users.byEmail(${email}).first()`
    );

    if (!!userByEmail) {
      return NextResponse.json({ code: 409, message: "User already exists" });
    }

    const { data: userByCustomerId } = await fauna.query(
      fql`users.where(.customer_id == ${customer_id}).first()`
    );

    if (!!userByCustomerId) {
      return NextResponse.json({ code: 409, message: "User already exists" });
    }

    const user = {
      email,
      first_name,
      last_name,
      customer_id,
    };

    await fauna.query(fql`users.create(${{ ...user }})`);

    return NextResponse.json({
      code: 202,
      message: "User created",
    });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json({ code: 500, message: error.response?.data });
    }

    return NextResponse.json({ code: 500, message: error });
  }
};
