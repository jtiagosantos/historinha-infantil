import { fql } from 'fauna';
import { fauna } from '../client';

type InputGetUser = {
  email: string;
}

export const getUser = async ({ email }: InputGetUser) => {
  const { data } = await fauna.query<Record<string, string> | null>(
    fql`users.byEmail(${email}).first()`,
  );

  return data;
}
