import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import localFont from 'next/font/local';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] });
const silkSerif = localFont({
  src: '../../public/assets/fonts/silk-serif.otf',
  display: 'swap',
  variable: '--font-silk',
});

export const metadata: Metadata = {
  title: 'DOM',
  description: "Let's initialize a new cycle!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${roboto.className} ${silkSerif.variable}`}>
        {children}
      </body>
    </html>
  );
}
