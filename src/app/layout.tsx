import './globals.css'
import type { Metadata } from 'next'
import { Fredoka } from 'next/font/google'
import Alert from './components/Alert'

const fredoka = Fredoka({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hot Confessions',
  description: 'Welcome to Hot Confessions, the ultimate platform where you can liberate your thoughts, secrets, and stories without fear or judgment. Whether you have a deep, dark confession weighing on your mind or a heartwarming tale you are itching to share, Hot Confessions provides a safe and anonymous space for you to do just that',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={fredoka.className} >
          {children}
          <Alert />
      </body>
    </html >
  )
}
