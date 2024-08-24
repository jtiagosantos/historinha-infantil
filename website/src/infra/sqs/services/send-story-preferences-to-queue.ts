type InputSendStoryPreferencesToQueue = {
  user: {
    id: string;
    email: string;
  };
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

export const sendStoryPreferencesToQueue = async ({
  user,
  preferences,
}: InputSendStoryPreferencesToQueue) => {
  await fetch(window.location.origin.concat("/api/queue/stories"), {
    method: "POST",
    body: JSON.stringify({
      user,
      preferences,
    }),
  });
};
