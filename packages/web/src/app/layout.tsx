import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { ReactQueryProvider } from '@/context/react-query-provider';
import { AuthProvider } from '@/context/auth-provider';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Inmobiliaria Dyxersoft',
  description: 'Plataforma inmobiliaria moderna para Bolivia',
  keywords: ['inmobiliaria', 'propiedades', 'Bolivia', 'bienes raíces'],
  authors: [{ name: 'Inmobiliaria Dyxersoft Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <ReactQueryProvider>
            <AuthProvider>
              {children}
              <Toaster />
            </AuthProvider>
          </ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}