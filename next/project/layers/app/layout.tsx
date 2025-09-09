import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  axes: ['opsz'],
})

export const metadata: Metadata = {
  title: 'Modern Design Tool Landing Page',
  description: 'Created with the help of Frontend Tribe',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${inter.variable} bg-background font-sans text-foreground antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          disableTransitionOnChange
          enableSystem
        >
          {children}
        </ThemeProvider>
        <TailwindIndicator />
      </body>
    </html>
  )
}
