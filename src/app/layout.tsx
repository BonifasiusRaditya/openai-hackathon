import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { MantineProvider } from '@/components/MantineProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Pintaru',
  description: 'Pintaru by Fasilkom dan FT',
  other: {
    'dicoding:email': 'scarryanda@gmail.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" style={{ colorScheme: 'light' }}>
      <head>
        <style>{`
					:root { color-scheme: light !important; }
					html { color-scheme: light !important; background-color: white !important; }
					body { background-color: white !important; }
				`}</style>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} style={{ backgroundColor: 'white' }}>
        <Toaster richColors></Toaster>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
