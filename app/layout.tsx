import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
    title: 'ForYan',
    description: 'Wish you all the best!',
    generator: 'v0.app',
    keywords: ['Yan', 'special moments', 'carousel', 'wishes'],
    authors: [{ name: 'Dat, Hoang Tien', url: 'https://foryan.tiendat.id.vn' }],
    robots: 'index, follow',
    openGraph: {
      title: 'ForYan',
      description: 'Wish you all the best!',
      url: 'https://foryan.tiendat.id.vn',
      siteName: 'ForYan',
      images: [
        {
          url: '/Yan/IMG_20250830_174909_Original.jpg',
          width: 1440,
          height: 1440,
          alt: 'Special Moments for Yan',
        },
      ],
      locale: 'en_US, vi_VN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'ForYan',
      description: 'Wish you all the best, Yan!',
      images: ['/Yan/IMG_20250830_174909_Original.jpg'],
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
