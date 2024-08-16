import localFont from 'next/font/local';
import { Metadata } from 'next';
import './globals.css';

const dmSans = localFont({
  src: [
    {
      path: '../../public/fonts/dm-sans/DMSans-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/dm-sans/DMSans-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/fonts/dm-sans/DMSans-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/dm-sans/DMSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/dm-sans/DMSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/dm-sans/DMSans-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/dm-sans/DMSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/dm-sans/DMSans-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/dm-sans/DMSans-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-heading'
});

const spaceMono = localFont({
  src: [
    {
      path: '../../public/fonts/space-mono/SpaceMono-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/space-mono/SpaceMono-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'Historinha Infantil',
  description: 'Crie histórias únicas para sua criança com base em seus interesses e preferências. Deixe sua criança mergulhar em aventuras épicas, com detalhes personalizados que a cativam.',
  openGraph: {
    title: 'Historinha Infantil',
    description: 'Crie histórias únicas para sua criança com base em seus interesses e preferências. Deixe sua criança mergulhar em aventuras épicas, com detalhes personalizados que a cativam.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${dmSans.variable} ${spaceMono.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
