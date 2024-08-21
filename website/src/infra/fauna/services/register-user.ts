import { fql } from 'fauna';
import { fauna } from '../client';

type InputRegisterUser = {
  email: string;
  firstName: string;
  lastName: string;
  customerId: string;
}

export const registerUser = async ({
  email,
  firstName,
  lastName,
  customerId,
}: InputRegisterUser) => {
  const user = {
    email,
    first_name: firstName,
    last_name: lastName,
    customer_id: customerId,
  };

  await fauna.query(
    fql`users.create(${{ ...user }})`,
  );
}
