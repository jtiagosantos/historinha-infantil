import 'dotenv/config';

import { handler } from './app';

const body = {
  user: {
    id: 'cm08fkys5000008l7beked8pc',
    email: 'tiagosan040@gmail.com',
  },
  preferences: {
    child: {
      name: 'Sofia',
      age: 6,
    },
    options: {
      gender: 'fantasia',
      characters: 'exploradores',
      lessonOrMoral: 'coragem e superação do medo',
      environment: 'casa mal-assombrada',
      style: 'suspense misterioso',
    },
  },
};

const event = {
  Records: [{ body: JSON.stringify(body) }],
};

handler(event as any);
