import { BackButton } from '@/components/back-button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formData } from './form-data';

type Option = {
  id: string;
  value: string;
  label: string;
}

const renderOptions = (option: Option[]) => {
  return option.map((option) => (
    <div key={option.id} className="flex items-center space-x-2">
      <RadioGroupItem id={option.id} value={option.value} />
      <Label htmlFor={option.id} className="font-body text-muted-foreground">{option.label}</Label>
    </div>
  ));
}

export default function Page() {
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
            <Input type="text" id="kidName" placeholder="Digite o nome da criança" className="w-full" />
          </div>

          <div className="w-full max-w-[250px] space-y-1.5">
            <Label htmlFor="kidAge" className="font-heading text-base text-muted-foreground">Idade da criança</Label>
            <Input type="number" id="kidAge" placeholder="Digite a idade da criança" min={0} className="w-full [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
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
                <RadioGroup className="space-y-2">
                  {renderOptions(data.options)}
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <Button className="mt-10 w-full bg-primary py-[10px] px-3 font-heading text-base font-medium tracking-widest rounded-lg hover:bg-accent max-[444px]:w-full">
          Criar história
        </Button>
      </div>
    </main>
  );
}