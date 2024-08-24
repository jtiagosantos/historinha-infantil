import { fql } from "fauna";
import { fauna } from "../client";

type InputGetUser = {
  email: string;
};

type RawUser = {
  id: string;
  customer_id: string;
  email: string;
};

export const getUser = async ({ email }: InputGetUser) => {
  const { data } = await fauna.query<RawUser | null>(
    fql`users.byEmail(${email}).first()`
  );

  return data;
};
