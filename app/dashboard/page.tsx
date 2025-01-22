'use client';

import { Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../components/Auth';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface User {
  name: string;
  email: string;
}

const DashboardContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string | null>(null);
  const { oktaAuth } = useAuth();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get('code');
        const state = searchParams.get('state');

        if (!code || !state) {
          setError('Missing code or state in the callback URL.');
          setLoading(false);
          return;
        }

        sessionStorage.setItem('state', state);
        sessionStorage.setItem('code', code);

        const storedState = sessionStorage.getItem('state');
        if (state !== storedState) {
          setError('State mismatch. Potential CSRF attack.');
          setLoading(false);
          return;
        }

        const dashboardUrl = `${window.location.origin}/dashboard?code=${code}&state=${state}`;

        const tokenResponse = await oktaAuth.token.parseFromUrl({ url: dashboardUrl });
        const accessToken = tokenResponse.tokens.accessToken?.accessToken;
        const idToken = tokenResponse.tokens.idToken?.idToken;
        if (accessToken && idToken) {
          localStorage.setItem('access_token', accessToken);
          localStorage.setItem('id_token', idToken);
        }

        const userInfo = await axios.get(`https://${process.env.NEXT_PUBLIC_OKTA_DOMAIN}/oauth2/default/v1/userinfo`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUser(userInfo.data);
        setUserInformation(userInfo.data);

        router.push('/board');
      } catch (error) {
        setError('Error during authentication');
        console.error('Error during authentication:', error);
      } finally {
        setLoading(false);
      }
    };

    handleAuthCallback();
  }, [oktaAuth.token, router, searchParams]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (user) {
    return (
      <div className="flex flex-col">
        <main className="flex-grow">
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
      </div>
    );
  }

  return null;
};

function setUserInformation(user: User) {
  sessionStorage.setItem('userData', user.name);
  sessionStorage.setItem('userEmail', user.email);
}

const Dashboard = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <DashboardContent />
  </Suspense>
);

export default Dashboard;
