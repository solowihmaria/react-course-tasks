import '../assets/styles/main.css';
import type { Metadata } from 'next';
import { Press_Start_2P } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Pokémon App',
};

const pressStart = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={pressStart.className}>
      <body>{children}</body>
    </html>
  );
}
