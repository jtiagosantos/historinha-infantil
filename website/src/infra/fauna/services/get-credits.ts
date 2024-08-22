import { fql } from 'fauna';
import { fauna } from '../client';

type InputGetCredits = {
  userId: string;
}

type RawCredits = {
  remaining_quantity: number;
  total_quantity: number;
  price: number;
  purchased_at: {
    isoString: string;
  }
}

export const getCredits = async ({ userId }: InputGetCredits) => {
  const { data } = await fauna.query<RawCredits | null>(
    fql`credits.byUserId(${userId}).first()`,
  );

  return data;
}