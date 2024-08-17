import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const StoryCard = () => {
  return (
    <Card className="max-w-[400px] w-full shadow-md rounded-lg bg-card border border-border p-4 max-[830px]:max-w-full">
      <CardHeader className="p-0">
        <CardTitle className="text-muted-foreground text-[18px] truncate">Viagem para a terra do nunca</CardTitle>
        <CardDescription className="text-muted-foreground font-body">Tempo de leitura: 5 min</CardDescription>
      </CardHeader>
      <CardContent className="p-0 mt-5">
        <p className="font-body text-muted-foreground leading-[20px] text-sm min-h-[100px] line-clamp-5">
          Luca, um menino curioso de 8 anos, adora visitar o parque perto de sua casa. 
          Nesta história, ele embarca em uma jornada emocionante, encontrando seus amigos 
          animais favoritos e descobrindo um tesouro escondido.
        </p>
        <Link href="/historia/mocked-id" className="w-full text-right block mt-2 text-[15px] hover:underline hover:text-accent underline-offset-4">
          Ler história
        </Link>
      </CardContent>
    </Card>
  );
}