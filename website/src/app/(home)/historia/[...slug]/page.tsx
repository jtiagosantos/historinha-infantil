'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { BackButton } from "@/components/back-button";
import { getStory } from "@/infra/fauna/services/get-story";
import { formatStoryText } from "@/utils/format-story-text";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

type Story = {
  id: string;
  title: string;
  readingTime: number;
  text: string[];
}

export default function Page() {
  const pathname = usePathname();
  const [story, setStory] = useState<Story | undefined>(undefined);
  const [isLoadingStory, setIsLoadingStory] = useState(true);

  const [_, storyId] = pathname.replace('/historia/', '').split('--');

  const handleFetchStory = async () => {
    try {
      const { story } = await getStory({ id: storyId });

      if (story) {
        setStory({
          id: story.id,
          title: story.story.title,
          readingTime: story.story.readingTime,
          text: story.story.text
        });
      }
    } finally {
      setIsLoadingStory(false);
    }
  }

  useEffect(() => {
    handleFetchStory();
  }, [storyId]);

  return (
    <main className="max-w-[1000px] mx-auto mb-6 p-4 pt-4 lg:p-6 lg:pt-4">
      <BackButton href="/" />

      <div className="mt-5 lg:mt-10">
        {isLoadingStory && (
          <div className="flex justify-center mt-[190px]">
            <Oval
              visible={true}
              height="46"
              width="46"
              color="#5c4523"
              ariaLabel="oval-loading"
              secondaryColor="#c7a26b"
              strokeWidth={4}
            />
          </div>
        )}

        {!isLoadingStory && !!story && (
          <>
            <h1 className="font-body font-semibold text-2xl text-muted-foreground">{story?.title}</h1>
            <p className="font-body text-base text-muted-foreground mt-2 mb-10">Tempo de leitura: {story?.readingTime} min</p>
            <div className="w-full flex flex-col gap-6">
              {story?.text?.map((text, index) => (
                <p key={index} className="font-body text-base text-muted-foreground">
                  {formatStoryText(text)}
                </p>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}