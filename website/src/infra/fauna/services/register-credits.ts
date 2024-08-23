import { fql } from "fauna";
import { fauna } from "../client";

type InputRegisterCredits = {
  userId: string;
  remainingQuantity: number;
  totalQuantity: number;
  price: string;
  active: boolean;
};

export const registerCredits = async ({
  userId,
  remainingQuantity,
  totalQuantity,
  price,
  active,
}: InputRegisterCredits) => {
  const data = {
    user_id: userId,
    remaining_quantity: remainingQuantity,
    total_quantity: totalQuantity,
    price,
    active,
  };

  await fauna.query(fql`credits.create(${{ ...data }})`);
};
