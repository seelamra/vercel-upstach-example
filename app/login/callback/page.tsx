'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useAuth } from '../../components/Auth'

export default function LoginCallback() {

    const router = useRouter()

    const { oktaAuth, authState } = useAuth()

    useEffect(() => {

        if (!authState?.isAuthenticated) {

            oktaAuth.handleLoginRedirect()

        } else {

            router.push('/dashboard')

        }

    }, [oktaAuth, authState, router])

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 max-w-sm w-full bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-semibold text-center text-gray-700">Processing login...</h1>
            </div>
        </div>

    )

}

