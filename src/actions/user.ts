import { Dispatch } from 'react';
import { UserPayload } from '../interfaces';
import { User } from '../models/User';
import { baseUrl, getAuth } from '../utils/loggedUser';

export enum IActions {
  USERS_FETCHED,
  // USER_FETCHED,
  USER_CREATED,
  USER_DELETED,
  USER_UPDATED,
}

export interface IUsersDispatchProps {
  type: IActions;
  users: User[];
}

export function getUsers(role?: string) {
  return async (dispatch: Dispatch<IUsersDispatchProps>) => {
    const response = await fetch(`${baseUrl}/api/v1/users${role ? `?role=${role}` : ''}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getAuth().token}`,
      },
    }).then((data) => data.json());

    dispatch({ type: IActions.USERS_FETCHED, users: response.users });
  };
}

export function deleteUser(user: User) {
  return async (dispatch: Dispatch<IUsersDispatchProps>) => {
    const response = await fetch(`${baseUrl}/api/v1/users/${user.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getAuth().token}`,
      },
    });
    if (response.ok) {
      dispatch({ type: IActions.USER_DELETED, users: [user] });
    }
  };
}

export function createUser(user: UserPayload) {
  return async (dispatch: Dispatch<IUsersDispatchProps>) => {
    const response = await fetch(`${baseUrl}/api/v1/users`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getAuth().token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then((data) => data.json());
    dispatch({ type: IActions.USER_CREATED, users: [response.user] });
  };
}

export function updateUser(id: number, user: UserPayload, setAlertMessage: (message: string) => void) { 
  return async (dispatch: Dispatch<IUsersDispatchProps>) => {
    const response = await fetch(`${baseUrl}/api/v1/users/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getAuth().token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const dataResponse = await response.json();
    if (!response.ok) {
      setAlertMessage!(dataResponse.message);
      return;
    }
    dispatch({ type: IActions.USER_UPDATED, users: [dataResponse.user] });
  };
}
