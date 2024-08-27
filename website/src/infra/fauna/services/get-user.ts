import { http } from "@/infra/http/axios/client";
import { z } from "zod";
import { responseSchema } from "@/app/api/users/unique/[email]/route";

type InputGetUser = {
  email: string;
};

type OutputGetUser = z.infer<typeof responseSchema>;

export const getUser = async ({
  email,
}: InputGetUser): Promise<OutputGetUser> => {
  const { data } = await http.get(`/users/unique/${email}`);

  return data;
};
