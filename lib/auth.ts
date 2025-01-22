// This is a mock authentication service for testing purposes
// Replace this with actual Okta authentication in production

const TEST_USER = {
  username: 'testuser@bluelinx.com',
  password: 'BluelinxTest123!',
  name: 'Test User',
  email: 'testuser@bluelinx.com',
  role: 'attendee'
}

export const signIn = async (username: string, password: string) => {
  if (username === TEST_USER.username && password === TEST_USER.password) {
    localStorage.setItem('user', JSON.stringify(TEST_USER))
    return true
  }
  throw new Error('Invalid username or password')
}

export const signOut = async () => {
  localStorage.removeItem('user')
  // console.log("The session storage data is : ", sessionStorage.getItem('profileData'));
  // sessionStorage.removeItem('profileData');
}

export const getUser = async () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export const isAuthenticated = async () => {
  return !!localStorage.getItem('user')
}

