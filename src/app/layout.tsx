import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import { AuthProvider } from '@/contexts/AuthContext';
import { DataProvider } from '@/contexts/RoomContext';

const silkSerif = localFont({
  src: '../../public/fonts/silk-serif.otf',
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
      <body suppressHydrationWarning className={`${silkSerif.variable}`}>
        <AuthProvider>
          <DataProvider>{children}</DataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
