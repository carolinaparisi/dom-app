import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import { AuthProvider } from '@/contexts/AuthContext';
import { DataVotingProvider } from '@/contexts/VotingRoomContext';
import { DataIndicationProvider } from '@/contexts/IndicationRoomContext';

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
      <body className={`${silkSerif.variable}`}>
        <AuthProvider>
          <DataIndicationProvider>
            <DataVotingProvider>{children}</DataVotingProvider>
          </DataIndicationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
