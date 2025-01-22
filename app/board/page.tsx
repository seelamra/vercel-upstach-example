'use client'

import Link from 'next/link';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';


const Board = () => {

    const router = useRouter()
    const [userName, setUserName] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const profileData = sessionStorage.getItem('userData')
            if (profileData) {
                //const parsedData = JSON.parse(profileData)
                setUserName(profileData)
            }
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (!loading && userName === null) {
            router.push('/')
        }
    }, [userName, loading, router])

    if (loading || userName === null) {
        return null
    }

    return (
        <>
            <Header activeLink="board" />
            <div className="flex flex-col">
                {/* <div className="flex-grow overflow-hidden"> */}
                <main className='flex-grow'>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <div className="px-4 py-6 sm:px-0 border-blue-700">
                            <h1 className="text-2xl font-semibold text-gray-900">Welcome to Bluelinx Conference</h1>
                            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                <Link href="/agenda" className="bg-white overflow-hidden shadow rounded-lg">
                                    <div className="px-4 py-5 sm:p-6">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Agenda</h3>
                                        <p className="mt-1 text-sm text-gray-500">View the conference schedule</p>
                                    </div>
                                </Link>
                                <Link href="/venue" className="bg-white overflow-hidden shadow rounded-lg">
                                    <div className="px-4 py-5 sm:p-6">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Venue Layout</h3>
                                        <p className="mt-1 text-sm text-gray-500">Navigate the conference venue</p>
                                    </div>
                                </Link>
                                <Link href="/demoBooth" className="bg-white overflow-hidden shadow rounded-lg">
                                    <div className="px-4 py-5 sm:p-6">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Demo Booth</h3>
                                        <p className="mt-1 text-sm text-gray-500">Navigate the conference demo booth</p>
                                    </div>
                                </Link>
                                <Link href="/qr-scanner" className="bg-white overflow-hidden shadow rounded-lg">
                                    <div className="px-4 py-5 sm:p-6">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">QR Scanner</h3>
                                        <p className="mt-1 text-sm text-gray-500">Scan QR codes for check-ins and feedback</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
                {/* </div> */}
            </div>
            <Footer />
        </>
    );
};

export default Board;