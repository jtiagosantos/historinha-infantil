import { http } from "@/infra/http/axios/client";
import { z } from "zod";
import { getUserResponseSchema } from "../schemas/get-user-response-schema";

type InputGetUser = {
  email: string;
};

type OutputGetUser = z.infer<typeof getUserResponseSchema>;

export const getUser = async ({
  email,
}: InputGetUser): Promise<OutputGetUser> => {
  const { data } = await http.get(`/users/unique/${email}`);

  return data;
};
