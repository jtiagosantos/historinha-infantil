import { http } from "@/infra/http/axios/client";

type InputRegisterCustomer = {
  name: string;
  email: string;
};

type OutputRegisterCustomer = {
  customer: {
    id: string;
  };
  code: number;
  message: string;
};

export const registerCustomer = async ({
  name,
  email,
}: InputRegisterCustomer): Promise<OutputRegisterCustomer> => {
  const { data } = await http.post("/gateway/payment/customer/register", {
    name,
    email,
  });

  return data;
};
