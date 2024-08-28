import 'dotenv/config';

import { handler } from './app';

const body = {
  user: {
    email: 'tiagosan040@gmail.com',
  },
  story: {
    id: 'cm0d4ln2p000008l79r7we6vm',
  },
};

const event = {
  Records: [{ body: JSON.stringify(body) }],
};

handler(event as any);
