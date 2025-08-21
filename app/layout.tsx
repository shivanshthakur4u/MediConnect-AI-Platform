import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MediConnect AI - 24/7 Online Doctor Consultation',
  description: 'AI-powered telemedicine platform connecting patients with verified doctors worldwide. Get instant medical consultations, AI symptom analysis, and comprehensive healthcare management.',
  keywords: 'telemedicine, online doctor, AI healthcare, medical consultation, symptom checker, prescription, medical records',
  authors: [{ name: 'MediConnect AI Team' }],
  creator: 'MediConnect AI',
  publisher: 'MediConnect AI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mediconnect-ai.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'MediConnect AI - 24/7 Online Doctor Consultation',
    description: 'AI-powered telemedicine platform for instant medical consultations',
    url: 'https://mediconnect-ai.com',
    siteName: 'MediConnect AI',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MediConnect AI Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MediConnect AI - 24/7 Online Doctor Consultation',
    description: 'AI-powered telemedicine platform for instant medical consultations',
    images: ['/twitter-image.jpg'],
    creator: '@mediconnectai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0066CC" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MediConnect AI" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#0066CC" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster 
            position="top-right" 
            richColors 
            closeButton
            toastOptions={{
              duration: 4000,
              style: {
                background: 'white',
                border: '1px solid #e5e7eb',
                color: '#374151',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}