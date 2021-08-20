import { useEffect, useReducer, useState } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import LeftNav from './LeftNav';
import { ManagerPanelType, UserPayload } from '../interfaces';
import UsersTable from './UsersTable';
import userReducer from '../reducers/user';
import { getUsers, deleteUser, updateUser, createUser } from '../actions/user';
import { User } from '../models/User';
import UserForm from './UserForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appRoot: {
      display: 'flex',
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

export default function ManagerPage() {
  const classes = useStyles();
  const [panel, setPanel] = useState<ManagerPanelType>(
    ManagerPanelType.UsersTable
  );
  const [currentUser, setCurrentUser] = useState<User>();
  const [users, dispatch] = useReducer(userReducer, []);

  useEffect(() => {
    getUsers()(dispatch);
  }, []);

  const setUser = async (id: number | undefined, payload: UserPayload) => {
    if (id) {
      await updateUser(id, payload)(dispatch);
    } else {
      await createUser(payload)(dispatch);
    }
    setPanel(ManagerPanelType.UsersTable);
  };

  return (
    <div
      className={clsx({
        [classes.appRoot]: true,
      })}
    >
      <CssBaseline />
      <LeftNav role='manager' currentPanel={panel} />
      <main className={classes.content}>
        {panel === ManagerPanelType.UsersTable && (
          <UsersTable
            users={users}
            deleteUser={(user: User) => deleteUser(user)(dispatch)}
            openUserForm={(user?: User) => {
              setCurrentUser(user);
              setPanel(ManagerPanelType.UserForm);
            }}
          />
        )}
        {panel === ManagerPanelType.UserForm && (
          <UserForm
            setUser={setUser}
            openUsersTablePage={() => setPanel(ManagerPanelType.UsersTable)}
          />
        )}
      </main>
    </div>
  );
}
