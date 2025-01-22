'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useAuth } from './Auth';

interface HeaderProps {
  activeLink: string; // The active link to highlight
}

export default function Header({ activeLink }: HeaderProps) {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { oktaAuth } = useAuth();
  useEffect(() => {
    const profileData = sessionStorage.getItem('userData');
    if (profileData) {
      setUserName(profileData);
    }
    setLoading(false);
  }, []);

  const handleSignOut = async () => {
    sessionStorage.clear();
    await oktaAuth.signOut({
      postLogoutRedirectUri: window.location.origin, // Redirect to the home page or login page
      clearTokensBeforeRedirect: true, // Ensure tokens are cleared before redirect
    });

    router.push('/');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Determine the class for active link
  const getLinkClass = (path: string) => {
    return activeLink === path
      ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold px-4 py-2 rounded-lg shadow-lg transform transition duration-500 ease-out hover:scale-110 hover:shadow-xl' // Active link: Cinematic blue gradient with glowing effect
      : 'text-gray-800 hover:bg-blue-300 hover:text-white px-4 py-2 rounded-lg transform transition duration-300 ease-in-out hover:scale-105'; // Inactive link: soft hover with subtle transition
  };

  return (
    <header className="p-4 bg-white"> {/* Only white background for header */}
      <nav className="flex flex-wrap justify-between items-center gap-4"> {/* Allow wrapping and spacing */}
        {/* Logo */}
        <Image
          src="/bluelinx.jpg"
          alt="Bluelinx Conference Logo"
          className="h-8 w-auto"
          width={150}
          height={40}
          id="bluelinx-icon"
        />

        {userName && (
          <>
            {/* Navigation Links */}
            <div className="flex flex-wrap gap-4 items-center justify-center md:gap-6 font-bold" id="bluelinxHeader">
              <Link href="/board" className={getLinkClass('board')}>
                Home
              </Link>
              <Link href="/agenda" className={getLinkClass('agenda')}>
                Agenda
              </Link>
              <Link href="/venue" className={getLinkClass('venue')}>
                Venue Layout
              </Link>
              <Link href="/demoBooth" className={getLinkClass('booth')}>
                Demo Booth
              </Link>
              <Link href="/qr-scanner" className={getLinkClass('scanner')}>
                QR Scanner
              </Link>
            </div>

            {/* User Info and Logout */}
            <div className="flex flex-wrap items-center gap-4 text-sm" id="logoutHeader">
              <span className="block text-gray-700">
                Welcome, {userName.split(' ')[0]} {userName.split(' ')[1]}
              </span>
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="text-black-500 hover:bg-red-600"
              >
                Logout
              </Button>
            </div>
          </>
        )}
      </nav>
    </header>

  );
}