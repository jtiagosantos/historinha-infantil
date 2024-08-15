import { DM_Sans } from 'next/font/google';
import { Space_Mono } from 'next/font/google';
import './globals.css';

const fontHeading = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
});

const fontBody = Space_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: ['400', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${fontHeading.variable} ${fontBody.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
