import { FC } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createSlug } from '@/utils/create-slug';

type StoryCardProps = {
  id: string;
  title: string;
  readingTime: number;
  text: string;
}

export const StoryCard: FC<StoryCardProps> = ({ id, title, readingTime, text }) => {
  const href = '/historia/'.concat(createSlug(title).concat('--').concat(id));

  return (
    <Card className="max-w-[400px] w-full shadow-md rounded-lg bg-card border border-border p-4 max-[830px]:max-w-full">
      <CardHeader className="p-0">
        <CardTitle className="text-muted-foreground text-[18px] truncate">{title}</CardTitle>
        <CardDescription className="text-muted-foreground font-body">Tempo de leitura: {readingTime} min</CardDescription>
      </CardHeader>
      <CardContent className="p-0 mt-5">
        <p className="font-body text-muted-foreground leading-[20px] text-sm min-h-[100px] line-clamp-5">
          {text}
        </p>
        <Link href={href} className="w-full text-right block mt-2 text-[15px] hover:underline hover:text-accent underline-offset-4">
          Ler história
        </Link>
      </CardContent>
    </Card>
  );
}