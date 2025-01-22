'use client'


import { useState, useEffect } from 'react';
import VenueLayout from '../components/VenueLayout'
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Venue() {

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

  // If still loading or userData is not set, render nothing or a loader
  if (loading || Object.keys(userData).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100">
      <Header activeLink="venue" />
      <VenueLayout />
      <Footer />
    </div>
  )
}