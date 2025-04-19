// src/app/layout.tsx
import './globals.css'
import { ReactQueryProvider } from '@/lib/react-query-provider'

export const metadata = {
  title: 'Dashboard - Eventos',
  description: 'Sistema de gerenciamento de eventos',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  )
}