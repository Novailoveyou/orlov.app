import 'server-only'
import '@/app/globals.scss'

import { ThemeProvider } from '@repo/ui/theme-provider'
import type { Metadata } from 'next'
import localFont from 'next/font/local'

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
})
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'orlov.app',
  description: 'orlov.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider defaultTheme='dark'>{children}</ThemeProvider>
      </body>
    </html>
  )
}
