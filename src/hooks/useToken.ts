import { useState } from 'react';
import { UserAuth } from '../interfaces';

export default function useToken(): [
  token: string,
  saveToken: (userToken?: UserAuth) => void
] {
  const getToken = () => {
    const tokenString = localStorage.getItem('auth') || '{}';
    const userToken: UserAuth = JSON.parse(tokenString);
    return userToken.token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken?: UserAuth) => {
    if (userToken) {
      localStorage.setItem('auth', JSON.stringify(userToken));
      setToken(userToken.token);
    } else {
      localStorage.removeItem('auth');
    }
  };

  return [token, saveToken];
}
