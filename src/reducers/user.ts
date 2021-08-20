import { IActions, IUsersDispatchProps } from '../actions/user';
import { User } from '../models/User';

export default function userReducer(
  state: User[],
  action: IUsersDispatchProps
) {
  const { type } = action;
  switch (type) {
    case IActions.USERS_FETCHED:
      return action.users;
    case IActions.USER_CREATED:
      return [...state, ...action.users];
    case IActions.USER_DELETED:
      return state.filter((user: User) => user.id !== action.users[0].id);
    case IActions.USER_UPDATED:
      return state.map((user: User) => {
        if (user.id === action.users[0].id) {
          return action.users[0];
        }
        return user;
      });
  }
}
