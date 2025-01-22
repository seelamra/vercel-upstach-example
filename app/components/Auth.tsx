'use client'

import React, { } from 'react'
import { useOktaAuth } from '@okta/okta-react'
import { OktaAuth } from '@okta/okta-auth-js'
import { Security } from '@okta/okta-react'


const oktaAuth = new OktaAuth({
  issuer: `https://${process.env.NEXT_PUBLIC_OKTA_DOMAIN}/oauth2/default`,
  clientId: process.env.NEXT_PUBLIC_OKTA_CLIENT_ID,
  redirectUri: typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : '',
  scopes: ["openid", "profile", "email"],
  pkce: true,
  // tokenManager: {
  //   storage: 'sessionStorage', // or 'sessionStorage'
  // },
})

export function Auth({ children }: { children: React.ReactNode }) {
  // const [userInfo, setUserInfo] = useState<UserClaims | null>();
  const restoreOriginalUri = async (_oktaAuth: unknown, originalUri: string) => {
    window.location.replace(originalUri || "/");
  };
  // const tokenManager = oktaAuth.tokenManager



  // console.log("The token manager is : ", tokenManager);

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      {children}
    </Security>
  )
}

export function useAuth() {
  return useOktaAuth()
}

// export async function loginWithCredentials(username: string, password: string) {
//   let factorsid;
//   try {
//     const transaction = await oktaAuth.signInWithCredentials({
//       username, // Use encrypted username
//       password
//     })
//     console.log("The transaction is : ", transaction);


//     if (transaction.status === 'SUCCESS') {
//       await oktaAuth.token.getWithRedirect({
//         sessionToken: transaction.sessionToken,
//       })

//       const userData = {
//         id: transaction.user?.id,
//         profile: {
//           login: transaction.user?.profile?.login,
//           firstName: transaction.user?.profile?.firstName,
//           lastName: transaction.user?.profile?.lastName
//         }
//       }

//       sessionStorage.setItem('profileData', JSON.stringify(userData));
//       return { success: true }
//     } else if (transaction.status === 'MFA_REQUIRED') {
//       const factors = transaction.factors;
//       console.log("The factors are from transaction is : ", factors);
//       if (factors && Array.isArray(factors)) {
//         console.log("Available factors:");
//         for (const factor of factors) {
//           console.log(`Factor ID: ${factor.id}, Type: ${factor.factorType}`);
//           if (factor.factorType === 'sms') {
//             // Trigger the OTP using the factor

//             const response = await factor.verify();
//             console.log('Verification successful:', response);// `verify()` is async
//             console.log('OTP sent successfully to the registered phone number.');
//             //return { success: false, mfaRequired: true, factorId: factor.id }; // Return the factor ID for OTP verification
//           }
//         }

//         const factorsObject = factors.reduce((acc: Record<string, string>, factor) => {
//           acc[factor.factorType] = factor.id;
//           return acc;
//         }, {});
//         console.log("The factorsObject is : ", factorsObject);

//         factorsid = factorsObject['sms'];
//         console.log("The factors id is : ", factorsid);


//       } else {
//         console.error("No factors found in the response.");
//       }
//       return { success: false, mfaRequired: true, factorId: factorsid, stateToken: transaction.stateToken }; // Return factor ID for MFA verification
//     } else {
//       return { success: false, error: 'Authentication failed' }
//     }
//   } catch (error) {
//     console.error('Login error:', error)
//     return { success: false, error: 'An error occurred during login' }
//   }
// }

// New function to verify MFA code
// export async function verifyMfa(factorId: string, code: string) {

//   console.log("The factor id is : ", factorId);
//   try {

//     // Construct the URL for verifying the factor using the factorId
//     const response = await fetch(`https://${process.env.NEXT_PUBLIC_OKTA_DOMAIN}/api/v1/authn/factors/${factorId}/verify`, {
//       method: 'POST',
//       mode: 'no-cors',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `SSWS ${process.env.NEXT_PUBLIC_OKTA_API_TOKEN}`, // Use your Okta API token
//       },
//       body: JSON.stringify({ passCode: code }), // Send the MFA code
//     });

//     const data = await response.json();

//     if (response.ok && data.status === 'SUCCESS') {
//       // Optionally fetch tokens or redirect as needed here.
//       return { success: true };
//     } else {
//       return { success: false, error: data.error || 'Invalid MFA code' };
//     }
//   } catch (error) {
//     console.error('MFA verification error:', error);
//     return { success: false, error: 'An error occurred during MFA verification' };
//   }
// }

// export async function verifyMfa(factorId: string, code: string) {
//   console.log("The factor id is : ", factorId);

//   try {
//     // Assuming the transaction and factor object are already retrieved and accessible

//     // Find the factor object by ID from the transaction (this could be sms, totp, etc.)
//     const factor = await oktaAuth.getFactor(factorId);

//     // Verify the MFA factor by passing the code
//     const verification = await factor.verify({ passCode: code });

//     // Check if the verification was successful
//     if (verification.status === 'SUCCESS') {
//       console.log('MFA verification successful');
//       return { success: true };
//     } else {
//       console.error('MFA verification failed:', verification);
//       return { success: false, error: verification.error || 'Invalid MFA code' };
//     }
//   } catch (error) {
//     console.error('MFA verification error:', error);
//     return { success: false, error: 'An error occurred during MFA verification' };
//   }
// }




