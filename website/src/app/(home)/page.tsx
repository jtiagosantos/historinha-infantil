/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Oval } from 'react-loader-spinner';
import { StoriesFallback } from './stories-fallback';
import { StoryCard } from './story-card';
import { getUser } from '@/infra/fauna/services/get-user';
import { findStories } from '@/infra/fauna/services/find-stories';
import { formatStoryTextPreview } from '@/utils/format-story-text-preview';

type Story = {
  id: string;
  title: string;
  readingTime: number;
  text: string;
}

const PageComponent = () => {
  const session = useSession();
  const [isLoadingStories, setIsLoadingStories] = useState(true);
  const [stories, setStories] = useState<Story[]>([]);

  const handleFetchStories = async () => {
    try {
      const user = (await getUser({ email: session.data?.user?.email! }))!;

      const stories = await findStories({ userId: user.id });

      if (stories) {
        const formattedStories = stories.map((story) => ({
          id: story.id,
          title: story.story.title,
          readingTime: story.story.reading_time,
          text: formatStoryTextPreview(story.story.text.join(' ')),
        }));

        setStories(formattedStories);
      }
    } finally {
      setIsLoadingStories(false);
    }
  }

  useEffect(() => {
    if (session.data?.user?.email) {
      handleFetchStories();
    }
  }, [session]);

  return (
    <main className="p-4 pt-4 lg:p-6 lg:pt-4">
      <div className="w-full flex items-center justify-end">
        <Link href="/criar-historia" className="flex items-center justify-center gap-1 bg-primary py-[10px] px-3 font-heading text-sm font-medium tracking-widest rounded-lg hover:bg-accent max-[444px]:w-full">
          <Plus className="w-[18px] h-[18px]" strokeWidth={2} />
          Criar história
        </Link>
      </div>

      {isLoadingStories && (
        <div className="flex justify-center mt-[170px]">
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

      {!isLoadingStories && stories.length === 0 && <StoriesFallback />}

      {!isLoadingStories && stories.length > 0 && (
        <>
          <h2 className="font-heading font-medium text-[18px] mt-4 max-sm:text-base">Confira as historinhas que já criamos para você</h2>

          <div className="w-full mt-4 grid grid-cols-3 max-w-[1240px] mx-auto gap-4 max-[1230px]:grid-cols-2 max-[1230px]:max-w-[840px] max-[830px]:grid-cols-1">
            {stories.map((story) => (
              <StoryCard key={story.id} {...story} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}

export default function Page() {
  return (
    <SessionProvider>
      <PageComponent />
    </SessionProvider>
  );
}