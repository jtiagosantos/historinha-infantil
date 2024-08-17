import Link from 'next/link';
import { Plus } from 'lucide-react';
import { StoriesFallback } from './stories-fallback';
import { StoryCard } from './story-card';

export default function Page() {
  return (
    <main className="p-4 pt-4 lg:p-6 lg:pt-4">
      <div className="w-full flex items-center justify-end">
        <Link href="/criar-historia" className="flex items-center justify-center gap-1 bg-primary py-[10px] px-3 font-heading text-sm font-medium tracking-widest rounded-lg hover:bg-accent max-[444px]:w-full">
          <Plus className="w-[18px] h-[18px]" strokeWidth={2} />
          Criar história
        </Link>
      </div>

      {/* <StoriesFallback /> */}
      <h2 className="font-heading font-medium text-[18px] mt-4 max-sm:text-base">Confira as historinhas que já criamos para você</h2>

      <div className="w-full mt-4 grid grid-cols-3 max-w-[1240px] mx-auto gap-4 max-[1230px]:grid-cols-2 max-[1230px]:max-w-[840px] max-[830px]:grid-cols-1">
        <StoryCard />
        <StoryCard />
        <StoryCard />
        <StoryCard />
      </div>
    </main>
  );
}