import type { Metadata, Viewport } from 'next';

import Providers from '@/components/providers/Providers';

import '@/index.css';

export const metadata: Metadata = {
  title: 'AOT APP',
  description:
    "Explore the world of 'Attack on Titan' better with the AOT APP! Created by fans, this app will make watching anime easier for you. Find information about characters, browse quotes, save favorites and compare characters. Discover their personalities with the MBTI system.",
  openGraph: {
    title: 'AOT APP',
    description:
      "Explore the world of 'Attack on Titan' better with the AOT APP! Created by fans, this app will make watching anime easier for you.",
    url: 'https://aot.kacperlutynski.pl',
    siteName: 'AOT APP',
    images: [
      {
        url: 'https://aot.kacperlutynski.pl/assets/img/AoT-app-banner-16_9-sharp-en.png',
        width: 1200,
        height: 630
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AOT APP',
    description: "Explore the world of 'Attack on Titan' better with the AOT APP!",
    images: ['https://aot.kacperlutynski.pl/assets/img/AoT-app-banner-16_9-sharp-en.png']
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/assets/icons/aot-icon.svg',
    apple: '/assets/icons/pwa-192x192.png'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
