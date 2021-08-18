import { useState } from 'react';
import { UserAuth } from '../models/UserAuth';

export default function useAuth(): [
  token: UserAuth,
  saveToken: (userToken?: UserAuth) => void
] {
  const getAuth = () => {
    const tokenString = localStorage.getItem('auth') || '{}';
    const userToken: UserAuth = JSON.parse(tokenString);
    return userToken;
  };

  const [auth, setAuth] = useState(getAuth());

  const saveAuth = (userAuth?: UserAuth) => {
    if (userAuth) {
      localStorage.setItem('auth', JSON.stringify(userAuth));
      setAuth(userAuth);
    } else {
      localStorage.removeItem('auth');
    }
  };

  return [auth, saveAuth];
}
