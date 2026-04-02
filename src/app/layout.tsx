import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'QRisto — Menu Digital para Restaurantes',
  description: 'Transforme seu menu em uma máquina de conversão. SaaS de menu digital inteligente para restaurantes europeus.',
  keywords: 'menu digital, restaurante, QR code, cardápio digital, SaaS',
  openGraph: {
    title: 'QRisto — Menu Digital para Restaurantes',
    description: 'Transforme seu menu em uma máquina de conversão.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}
