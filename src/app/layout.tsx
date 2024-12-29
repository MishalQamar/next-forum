import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { ThemeProvider } from '@/components/themes/theme-provider';
import { Nav } from '@/components/nav';
import { Toaster } from 'sonner';
import { RedirectToast } from '@/components/redirect-toast';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'next job',
  description: 'Find your next job',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Nav />

          <main className="mx-auto w-full max-w-7xl px-6 pb-16 pt-10 sm:pb-24 lg:px-8">
            {children}
          </main>
          <Toaster />
          <RedirectToast />
        </ThemeProvider>
      </body>
    </html>
  );
}
