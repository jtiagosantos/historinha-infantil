import { Client } from "fauna";

export const fauna = new Client({
  secret: process.env.FAUNA_SECRET,
});
