import './globals.css'
import { Inter } from 'next/font/google'
import { Auth } from './components/Auth'
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Bluelinx Conference',
  description: 'Conference assistant for Bluelinx',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Auth>
          <div>
            {children}
          </div>
        </Auth>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
