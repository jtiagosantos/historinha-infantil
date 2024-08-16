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
  const date = new Date();

  const user = {
    email,
    first_name: firstName,
    last_name: lastName,
    customer_id: customerId,
    created_at: date, 
    updated_at: date, 
  };

  await fauna.query(
    fql`users.create(${{ ...user }})`,
  );
}
