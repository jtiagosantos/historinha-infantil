import { getStory } from '@/infra/fauna/services/get-story';
import { BackButton } from '@/components/back-button';
import { formatStoryText } from '@/utils/format-story-text';

type PageProps = {
  params: {
    slug: string[];
  };
};

export default async function Page({ params }: PageProps) {
  const [pathname] = params.slug;
  const [_, storyId] = pathname.split('--');

  const handleFetchStory = async () => {
    const story = await getStory({ id: storyId });

    if (story) {
      return {
        id: story.id,
        title: story.story.title,
        readingTime: story.story.reading_time,
        text: story.story.text
      };
    }
  }

  const story = await handleFetchStory();

  return (
    <main className="max-w-[1000px] mx-auto mb-6 p-4 pt-4 lg:p-6 lg:pt-4">
      <BackButton href="/" />
      {!!story && (
        <div className="mt-5 lg:mt-10">
          <h1 className="font-body font-semibold text-2xl text-muted-foreground">{story?.title}</h1>
          <p className="font-body text-base text-muted-foreground mt-2 mb-10">Tempo de leitura: {story?.readingTime} min</p>
          <div className="w-full flex flex-col gap-6">
            {story?.text?.map((text, index) => (
              <p key={index} className="font-body text-base text-muted-foreground">
                {formatStoryText(text)}
              </p>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}