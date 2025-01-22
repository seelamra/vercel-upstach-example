'use client'
import { useOktaAuth } from '@okta/okta-react';
import { useEffect } from 'react';

export default function Login() {

  const { oktaAuth } = useOktaAuth();

  const handleLogin = async () => {
    const response =await oktaAuth.signInWithRedirect({
      scopes: ['openid', 'profile', 'email'],
      prompt: 'login', // Force Okta to show the login screen
    });
    console.log("The response is : ", response);
  };

  // const handleLogout = async () => {
  //   oktaAuth.signOut();
  // };

  //if (!authState) return <div>Loading...</div>;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const headerDocument = document.getElementById('bluelinxHeader')
      if (sessionStorage.getItem('username') == null && headerDocument) {
        headerDocument.style.display = 'none'
        const logoutDocument = document.getElementById('logoutHeader')
        if (logoutDocument) {
          logoutDocument.style.display = 'none'
        }
      }
    }
  }, [])

  return (
    <>
      <br />
      <div className="flex items-center justify-center shadow-inner">
        <div className="p-6 max-w-sm w-full shadow-md rounded-md">
          {/* <div className="flex justify-center mb-6">
          <Image src="/okta.png" alt="Okta Logo" width={100} height={40} />
        </div>
        <hr />*/}
          {/* <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">Sign In to okta</h1> */}
          <button onClick={handleLogin} className='font-bold text-cyan-500 text-3xl'>Login with Okta</button>
          {/* <button onClick={handleLogout}>Logout</button> */}

        </div>
      </div>
    </>
  )
}
