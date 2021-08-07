import { useState } from 'react';

export interface UserToken {
  token: string;
}

export default function useToken(): [
  token: string,
  saveToken: (userToken?: UserToken) => void
] {
  const getToken = () => {
    const tokenString = localStorage.getItem('token') || '{}';
    const userToken: UserToken = JSON.parse(tokenString);
    return userToken.token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken?: UserToken) => {
    if (userToken) {
      localStorage.setItem('token', JSON.stringify(userToken));
      setToken(userToken.token);
    } else {
      localStorage.removeItem('token');
    }
  };

  return [token, saveToken];
}
