import { BackButton } from '@/components/back-button';
import { formatStoryText } from '@/utils/format-story-text';

const story = {
  "title": "O Mistério das Montanhas Mágicas",
  "readingTime": 12,
  "text": [
    "Em um reino distante, cercado por montanhas misteriosas, viviam animais de estimação muito especiais. Eles não eram como os animais que conhecemos; cada um deles possuía poderes mágicos. Havia o gato chamado Sol, que podia controlar a luz, e o coelho Lume, que podia saltar mais alto que as árvores mais altas. Juntos, eles moravam em uma pequena casa na base das Montanhas Mágicas, um lugar onde ninguém se atrevia a ir, pois diziam que lá habitavam segredos antigos e feitiçarias poderosas.",
    "Certa noite, algo estranho aconteceu. Uma neblina espessa e brilhante desceu sobre as montanhas, cobrindo tudo em um manto de mistério. Sol, com seus olhos brilhando como duas estrelas, sentiu que algo não estava certo. ‘Lume, precisamos descobrir o que está acontecendo nas montanhas’, disse Sol, e Lume concordou com um salto empolgado. Eles decidiram explorar as montanhas, mesmo sabendo dos perigos que poderiam enfrentar.",
    "À medida que subiam, a neblina ficava cada vez mais densa, tornando difícil enxergar o caminho. Mas Sol usou sua magia para criar uma pequena esfera de luz que iluminava o caminho à frente. Depois de horas caminhando, chegaram a uma grande caverna com uma entrada em forma de arco, decorada com símbolos antigos. ‘Este lugar é tão antigo quanto o tempo’, murmurou Lume, olhando com curiosidade. Eles sabiam que a caverna guardava algo importante.",
    "Dentro da caverna, encontraram uma coruja chamada Sábia, que estava sentada em um grande livro de feitiços. Sábia era conhecida como a guardiã das Montanhas Mágicas e observava tudo o que acontecia ali. ‘Vocês são corajosos por virem até aqui’, disse Sábia com sua voz suave, mas firme. ‘Mas para desvendar o mistério, vocês precisam aprender a verdadeira lição dessas montanhas: respeito e tolerância’. Sol e Lume se entreolharam, intrigados.",
    "A coruja Sábia explicou que a neblina mágica era causada por uma antiga disputa entre dois animais mágicos, um dragão e um unicórnio, que viviam no topo das montanhas. O dragão, com seu fogo, acreditava que só ele deveria governar as montanhas, enquanto o unicórnio, com seu poder de cura, pensava que todos deveriam seguir suas regras. Por séculos, os dois brigaram, sem nunca tentar entender o ponto de vista do outro, e isso encheu as montanhas de mágoa e mistério.",
    "Sol e Lume sabiam que precisavam ajudar. Eles subiram ainda mais alto até o topo da montanha, onde encontraram o dragão e o unicórnio. Quando chegaram, viram que ambos estavam cansados e tristes, mas ainda se recusavam a falar um com o outro. Sol, com sua luz brilhante, chamou a atenção dos dois. ‘Vocês dois são muito poderosos, mas não veem que essa disputa só trouxe tristeza às montanhas?’, perguntou Sol.",
    "Lume, que sempre pulava de um lado para o outro, se aproximou do unicórnio e disse: ‘Você tem o poder de curar, então por que não usá-lo para trazer paz, em vez de continuar essa luta?’ O unicórnio olhou para Lume e depois para o dragão. ‘Eu nunca pensei nisso dessa forma’, admitiu o unicórnio, com uma voz suave. O dragão, que havia escutado, abaixou a cabeça e murmurou: ‘Eu também só queria proteger as montanhas, mas agora vejo que minha chama trouxe mais dor do que proteção’.",
    "Com a ajuda de Sol e Lume, o dragão e o unicórnio finalmente começaram a conversar, descobrindo que, na verdade, ambos queriam o mesmo: proteger as montanhas e os animais que lá viviam. Eles perceberam que, ao se respeitarem e entenderem os poderes e habilidades um do outro, poderiam trabalhar juntos para trazer de volta a paz e a magia às Montanhas Mágicas.",
    "A neblina começou a se dissipar, e a luz do sol brilhou novamente nas Montanhas Mágicas. O dragão e o unicórnio, agora amigos, agradeceram a Sol e Lume por mostrarem a eles o valor do respeito e da tolerância. Sábia, a coruja, também apareceu, sorrindo com sabedoria. ‘Vocês dois têm corações verdadeiramente mágicos’, disse ela. ‘Lembre-se sempre de que o respeito e a compreensão são a chave para resolver qualquer mistério’.",
    "Sol e Lume desceram as montanhas, felizes por terem ajudado a restaurar a paz. E assim, as Montanhas Mágicas voltaram a ser um lugar de alegria e magia, onde todos os seres viviam em harmonia. E toda vez que um novo mistério surgia, os habitantes das montanhas se lembravam da lição aprendida: a importância do respeito e da tolerância.",
    "João, assim como Sol e Lume, aprendeu que a verdadeira magia está em entender e respeitar os outros, mesmo quando são diferentes. E assim, a história das Montanhas Mágicas continuou a ser contada por gerações, inspirando todos a serem mais gentis e compreensivos uns com os outros."
  ],
}

export default function Page() {
  return (
    <main className="max-w-[1000px] mx-auto mb-6 p-4 pt-4 lg:p-6 lg:pt-4">
      <BackButton href="/" />

      <div className="mt-5 lg:mt-10">
        <h1 className="font-body font-semibold text-2xl text-muted-foreground">{story.title}</h1>
        <p className="font-body text-base text-muted-foreground mt-2 mb-10">Tempo de leitura: {story.readingTime} min</p>
        <div className="w-full flex flex-col gap-6">
          {story.text.map((text, index) => (
            <p key={index} className="font-body text-base text-muted-foreground">
              {formatStoryText(text)}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}