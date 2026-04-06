import type { Metadata } from 'next'
import type React from 'react'
import { Geist, Geist_Mono, Orbitron } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });
const _orbitron = Orbitron({ subsets: ["latin"], variable: "--font-display", weight: ["400","500","600","700","800","900"] });

export const metadata: Metadata = {
  title: 'CarX Street Shop — Mod Accounts',
  description: 'Buy modded CarX Street accounts with Cars, XP, Money, Gold & Maps.',
  generator: 'Blackbox AI',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" style={{ "--font-display": "'Orbitron', sans-serif" } as React.CSSProperties}>
      <body className={`${_orbitron.variable} font-sans antialiased`} style={{ backgroundColor: "#0d0a14", color: "#f5f3fa" }}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
