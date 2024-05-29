import StoreProvider from '@/components/providers/redux-store-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import { ModalProvider } from '@/components/providers/modal-provider'

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AirTeach',
  description: 'Try our application for airlines food menu generation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={font.className}>
        <StoreProvider>
          <ModalProvider />
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}
