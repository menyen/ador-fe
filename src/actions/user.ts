import { Dispatch } from 'react';
import { UserPayload } from '../interfaces';
import { User } from '../models/User';
import api from '../utils/api';
import { getAuth } from '../utils/loggedUser';

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

export function getUsers(
  setErrorAlert: (message: string) => void,
  role?: string
) {
  return async (dispatch: Dispatch<IUsersDispatchProps>) =>
    api
      .get(`api/v1/users${role ? `/${role}` : ''}`, {
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
        },
      })
      .then((response) =>
        dispatch({ type: IActions.USERS_FETCHED, users: response.data.users })
      )
      .catch((error) => setErrorAlert!(error.response.data.message));
}

export function deleteUser(
  user: User,
  setErrorAlert: (message: string) => void
) {
  return async (dispatch: Dispatch<IUsersDispatchProps>) =>
    api
      .delete(`api/v1/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
        },
      })
      .then((response) =>
        dispatch({ type: IActions.USER_DELETED, users: [user] })
      )
      .catch((error) => setErrorAlert!(error.response.data.message));
}

export function createUser(
  user: UserPayload,
  setErrorAlert: (message: string) => void
) {
  return async (dispatch: Dispatch<IUsersDispatchProps>) =>
    api
      .post('api/v1/users', JSON.stringify(user), {
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) =>
        dispatch({ type: IActions.USER_CREATED, users: [response.data.user] })
      )
      .catch((error) => setErrorAlert!(error.response.data.message));
}

export function updateUser(
  id: number,
  user: UserPayload,
  setErrorAlert: (message: string) => void
) {
  return async (dispatch: Dispatch<IUsersDispatchProps>) =>
    api
      .put(`api/v1/users/${id}`, JSON.stringify(user), {
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) =>
        dispatch({ type: IActions.USER_UPDATED, users: [response.data.user] })
      )
      .catch((error) => {
        setErrorAlert!(error.response.data.message);
        return;
      });
}
