import { resend } from '../client';

type InputSendEmail = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

export const sendEmail = async ({ from, to, subject, html }: InputSendEmail) => {
  return resend.emails.send({ from, to, subject, html });
};
