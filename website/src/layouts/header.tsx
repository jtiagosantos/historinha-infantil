import Link from 'next/link';
import { BookOpenText, Menu } from 'lucide-react';
import { SignOutButton } from '@/components/signout-button';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';

export const Header = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center justify-between border-b">
      <Link href="/" className="flex items-center gap-2 text-lg font-semibold" prefetch={false}>
        <BookOpenText className="w-[26px] h-[26px]" />
        <div className="flex flex-col">
          <span className="leading-none text-base">Historinha</span>
          <span className="leading-none text-base">Infantil</span>
        </div>
      </Link>

      <nav className="ml-auto flex gap-4 sm:gap-10 font-medium max-[444px]:hidden">
        <Link href="/meus-creditos" className="text-sm hover:underline hover:text-accent underline-offset-4" prefetch={false}>
          Meus créditos
        </Link>
        <SignOutButton />
      </nav>

      <div className="hidden max-[444px]:block">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger className="text-gray-700 font-semibold">
              <Menu color="#374151" size={26} />
            </MenubarTrigger>
            <MenubarContent className="border -mt-2 mr-4 flex flex-col items-end gap-2 px-3 py-2 rounded-lg">
              <Link href="/meus-creditos" className="text-sm hover:underline hover:text-accent underline-offset-4" prefetch={false}>
                Meus créditos
              </Link>
              <SignOutButton />
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </header>
  );
}