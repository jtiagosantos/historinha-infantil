import { fql } from "fauna";
import { fauna } from "../client";

type InputUpdateCredits = {
  id: string;
  remainingQuantity: number;
  totalQuantity: number;
  price: string;
  active: boolean;
};

export const updateCredits = async ({
  id,
  remainingQuantity,
  totalQuantity,
  price,
  active,
}: InputUpdateCredits) => {
  const data = {
    remaining_quantity: remainingQuantity,
    total_quantity: totalQuantity,
    price,
    active,
    purchased_at: new Date(),
  };

  await fauna.query(fql`credits.byId(${id})?.update(${{ ...data }})`);
};
