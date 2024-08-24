type InputCreateStoryPrompt = {
  preferences: {
    child: {
      name: string;
      age: number;
    };
    options: {
      gender: string;
      characters: string;
      lessonOrMoral: string;
      environment: string;
      style: string;
    };
  };
};

export const createStoryPrompt = ({
  preferences: { child, options },
}: InputCreateStoryPrompt) => {
  const prompt = `
    Eu quero uma história infantil bem detalhada, bem escrita e longa para uma criança chamada ${child.name}, 
    que tem ${child.age} anos de idade. Crie a história baseada nas seguintes preferências:
    - Gênero da História: ${options.gender}
    - Personagens da História: ${options.characters}
    - Lição ou Moral da História: ${options.lessonOrMoral}
    - Ambiente da História: ${options.environment}
    - Estilo da Narrativa: ${options.style}

    Me retorne em um json baseado no seguinte schema do zod:
    z.object({
      title: z.string(),
      readingTime: z.number(),
      text: z.array(
        z.string()
      ),
    })

    * Eu quero que o readingTime seja um tempo aproximado em minutos
    * Eu quero que text seja um array com cada item sendo um parágrafo da história
  `;

  return prompt;
};
