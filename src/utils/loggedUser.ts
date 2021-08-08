import { UserAuth } from '../interfaces';

export function getLoggedUserInfo() {
  const authString = localStorage.getItem('auth') || '{}';
  const userAuth: UserAuth = JSON.parse(authString);
  return userAuth.user;
}
