import { fql } from "fauna";
import { fauna } from "../client";
import { filterNotUndefinedObjectValues } from "@/utils/filter-not-undefined-object-values";

type InputUpdateCredits = {
  id: string;
  remainingQuantity?: number;
  totalQuantity?: number;
  price?: string;
  active?: boolean;
  purchasedAt?: Date;
};

export const updateCredits = async ({
  id,
  remainingQuantity,
  totalQuantity,
  price,
  active,
  purchasedAt,
}: InputUpdateCredits) => {
  const data = filterNotUndefinedObjectValues({
    remaining_quantity: remainingQuantity,
    total_quantity: totalQuantity,
    price,
    active,
    purchased_at: purchasedAt,
  });

  await fauna.query(fql`credits.byId(${id})?.update(${{ ...data }})`);
};
