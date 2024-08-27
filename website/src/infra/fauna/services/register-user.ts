import { http } from "@/infra/http/axios/client";

type InputRegisterUser = {
  customerId: string;
  email: string;
  firstName: string;
  lastName: string;
};

type OutputRegisterUser = {
  code: number;
  message: string;
};

export const registerUser = async ({
  customerId,
  email,
  firstName,
  lastName,
}: InputRegisterUser): Promise<OutputRegisterUser> => {
  const { data } = await http.post("/users/register", {
    customerId,
    email,
    firstName,
    lastName,
  });

  return data;
};
