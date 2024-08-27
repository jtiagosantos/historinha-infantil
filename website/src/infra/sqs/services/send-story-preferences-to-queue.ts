import { http } from "@/infra/http/axios/client";

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
  await http.post("/queue/stories/send", { user, preferences });
};
