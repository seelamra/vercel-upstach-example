'use client'

import { useRouter } from 'next/navigation';
import Login from './login/page'
import { useState, useEffect } from 'react';
import Footer from './components/Footer';
import Image from 'next/image';

export default function Home() {

  const router = useRouter(); // Initialize useRouter
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUserData = sessionStorage.getItem('userData');

    if (!storedUserData) {
      // If userData is not found in sessionStorage, redirect to login page
      router.push('/');
    } else {
      setUserData(storedUserData); // Set userData from sessionStorage
    }
    setLoading(false);
  }, [router]); // Run on component mount

  useEffect(() => {
    if (!loading && userData != null) {
      //router.push(`/board`);
    }
    if (loading || userData === null) {
      router.push('/');
    }
  }, [userData, loading, router])

  return (
    <>

      <div className="flex flex-col items-center justify-center py-8">
        <div className="flex flex-row items-center justify-start w-full px-5">

          <Image src="/bluelinx.jpg" alt="Bluelinx Conference Logo" className="h-8 w-auto" width={150} height={40} id='bluelinx-icon' />
        </div>
        <br />

        <main className="flex flex-col items-center justify-center w-full px-20 text-center">
          <h1 className="text-6xl font-bold">
            Welcome to the Conference
          </h1>

          <p className="mt-3 text-2xl">
            January 27 - 30, 2025
          </p>
          <p className='text-lg'>
            <strong>Location:</strong> Loews Atlanta 1065 Peachtree St NE Atlanta, GA 30309
          </p>
          <Login />
        </main>
      </div>
      <Footer />
    </>
  )
}
