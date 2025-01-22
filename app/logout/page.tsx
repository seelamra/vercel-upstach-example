'use client'

import { useAuth } from '../components/Auth'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Logout() {
  const { oktaAuth } = useAuth()
  const router = useRouter()

  useEffect(() => {
    oktaAuth.signOut()
    // sessionStorage.removeItem("profileData");
    router.push('/')
  }, [oktaAuth, router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 max-w-sm w-full bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-semibold text-center text-gray-700">Logging out...</h1>
      </div>
    </div>
  )
}
