'use client';

import { useEffect, useRef, useState } from 'react';
import { parseAsJson, parseAsString, useQueryStates } from 'nuqs';
import { BackButton } from '@/components/back-button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { RadioGroup } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formData } from './form-data';
import { RenderOptions } from './render-options';
import { useToast } from '@/components/ui/use-toast';
import { BuyCreditsModal } from '@/components/buy-credits-modal';
import { SessionProvider, useSession } from 'next-auth/react';
import { getUser } from '@/infra/fauna/services/get-user';
import { getCredits } from '@/infra/fauna/services/get-credits';
import { ThreeDots } from 'react-loader-spinner';
import { updateCredits } from '@/infra/fauna/services/update-credits';
import { registerCreditsHistory } from '@/infra/fauna/services/register-credits-history';
import { CreditsHistoryOperation } from '@/infra/fauna/enums/credits-history-operation';
import { ConfirmationModal } from './confirmation-modal';
import { sendStoryPreferencesToQueue } from '@/infra/sqs/services/send-story-preferences-to-queue';

const THREE_SECONDS = 1000 * 3;

const PageComponent = () => {
  const session = useSession();
  const { toast, dismiss } = useToast();
  const [form, setForm] = useQueryStates({
    nome: parseAsString.withDefault(''),
    idade: parseAsString.withDefault(''),
    opcoes: parseAsJson(),
  });
  const [openBuyCreditsModal, setOpenBuyCreditsModal] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const validateForm = () => {
    if (form.nome === '') return {
      invalid: true,
      message: 'O nome da criança é obrigatório',
    }

    if (form.idade === '') return {
      invalid: true,
      message: 'A idade da criança é obrigatória',
    }

    if (!form.opcoes?.genero) return {
      invalid: true,
      message: 'Selecione uma opção para o gênero da história',
    }

    if (!form.opcoes?.personagens) return {
      invalid: true,
      message: 'Selecione uma opção para os personagens da história',
    }

    if (!form.opcoes?.['licao-ou-moral']) return {
      invalid: true,
      message: 'Selecione uma opção para a lição ou moral da história',
    }

    if (!form.opcoes?.ambiente) return {
      invalid: true,
      message: 'Selecione uma opção para o ambiente da história',
    }

    if (!form.opcoes?.estilo) return {
      invalid: true,
      message: 'Selecione uma opção para o estilo da história',
    }

    return {
      invalid: false,
      message: null,
    }
  }

  const handleCreateStory = async () => {
    const { invalid, message } = validateForm();

    if (invalid) {
      toast({ description: message });
      return;
    }

    try {
      setIsLoading(true);

      const { user } = await getUser({ email: session.data?.user?.email! });

      const { credits } = await getCredits({ userId: user!.id });

      if (!credits) {
        setOpenBuyCreditsModal(true);

        const { id: toastId } = toast({ description: 'Você deve ter créditos em conta para criar uma história' });
        timeoutRef.current = setTimeout(() => {
          dismiss(toastId);
        }, THREE_SECONDS);

        return;
      }

      if (credits.remainingQuantity === 0) {
        setOpenBuyCreditsModal(true);

        const { id: toastId } = toast({ description: 'Você não possui créditos suficientes para criar uma história' });
        timeoutRef.current = setTimeout(() => {
          dismiss(toastId);
        }, THREE_SECONDS);

        return;
      }

      await sendStoryPreferencesToQueue({
        user: {
          id: user!.id,
          email: user!.email,
        },
        preferences: {
          child: {
            name: form.nome,
            age: Number(form.idade),
          },
          options: {
            gender: form.opcoes.genero,
            characters: form.opcoes.personagens,
            lessonOrMoral: form.opcoes['licao-ou-moral'],
            environment: form.opcoes.ambiente,
            style: form.opcoes.estilo,
          },
        },
      });

      await updateCredits({
        id: credits.id,
        remainingQuantity: credits.remainingQuantity - 1,
        active: credits.remainingQuantity - 1 !== 0,
      });

      await registerCreditsHistory({
        userId: user!.id,
        creditsQuantity: 1,
        operation: CreditsHistoryOperation.SPENDING,
        text: "Criação de história",
      });

      setOpenConfirmationModal(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  return (
    <main className="max-w-[1000px] mx-auto mb-6 p-4 pt-4 lg:p-6 lg:pt-4">
      <BackButton href="/" />

      <div className="mt-5 lg:mt-10">
        <h1 className="font-heading font-semibold text-2xl text-muted-foreground tracking-wide">Historinha Personalizada</h1>
        <p className="font-heading text-base text-muted-foreground mt-1 mb-10 tracking-wide">
          Defina os detalhes e as preferências para criar a sua história.
        </p>

        <div className="w-full flex gap-10 mb-6 max-[570px]:flex-col max-[570px]:gap-5">
          <div className="w-full max-w-[250px] space-y-1.5">
            <Label htmlFor="kidName" className="font-heading text-base text-muted-foreground">Nome da criança</Label>
            <Input
              type="text"
              id="kidName"
              placeholder="Digite o nome da criança"
              className="w-full"
              value={form.nome}
              onChange={({ target }) => setForm({ nome: target.value || null })}
            />
          </div>

          <div className="w-full max-w-[250px] space-y-1.5">
            <Label htmlFor="kidAge" className="font-heading text-base text-muted-foreground">Idade da criança</Label>
            <Input
              type="number"
              id="kidAge"
              placeholder="Digite a idade da criança"
              min={1}
              className="w-full [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              value={form.idade}
              onChange={({ target }) => setForm({ idade: target.value || null })}
            />
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {formData.map((data) => (
            <AccordionItem key={data.title} value={data.title}>
              <AccordionTrigger className="font-heading font-medium text-base text-muted-foreground hover:no-underline">
                <div className="flex flex-col items-start">
                  <span>{data.title}</span>
                  <span className="font-body text-xs text-muted-foreground opacity-90">{data.description}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="mt-3">
                <RadioGroup className="space-y-2" value={form.opcoes?.[data.key]} onValueChange={(value) => setForm({
                  opcoes: (() => {
                    const values = { ...form.opcoes };
                    values[data.key] = value;
                    return values;
                  })()
                })}>
                  <RenderOptions options={data.options} />
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <Button
          disabled={isLoading}
          onClick={handleCreateStory}
          className="mt-10 w-full bg-primary py-[10px] px-3 font-heading text-base font-medium tracking-widest rounded-lg hover:bg-accent max-[444px]:w-full"
        >
          {!isLoading ? 'Criar história' : (
            <ThreeDots
              height="20"
              width="40"
              radius="9"
              color="#5c4523"
              ariaLabel="three-dots-loading"
              visible={true}
            />
          )}
        </Button>

        <ConfirmationModal
          open={openConfirmationModal}
          onOpenChange={setOpenConfirmationModal}
        />

        {typeof window !== 'undefined' && (
          <BuyCreditsModal
            open={openBuyCreditsModal}
            onOpenChange={setOpenBuyCreditsModal}
            successURL={window.location.origin.concat(
              `/pagamento/processamento?url=${window.location.href}`
            )}
          />
        )}
      </div>
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