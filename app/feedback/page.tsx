'use client'

import { useAuth } from '../components/Auth'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Feedback() {
  const { authState } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authState?.isAuthenticated) {
      router.push('/login')
    }
  }, [authState, router])

  if (!authState?.isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/dashboard" className="text-xl font-semibold">Bluelinx Conference</Link>
              </div>
            </div>
            <div className="flex items-center">
              <Link href="/logout" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Conference Feedback</h1>
          <div className="mt-6">
            <iframe
              src="https://forms.office.com/Pages/ResponsePage.aspx?id=YOUR_FORM_ID_HERE"
              width="100%"
              height="100%"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
            >
              Loading...
            </iframe>
          </div>
        </div>
      </div>
    </div>
  )
}
