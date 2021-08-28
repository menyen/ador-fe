import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { UserTableColumn, UserTableData } from '../interfaces';
import GenericTable from './GenericTable';
import { OrangeButton } from './Buttons';
import { User } from '../models/User';

const columns: UserTableColumn[] = [
  // { id: 'id', label: 'ID' },
  { id: 'name', label: 'Nome', minWidth: 100 },
  { id: 'tax_id', label: 'CPF/CNPJ', minWidth: 50 },
  { id: 'email', label: 'E-mail', minWidth: 100 },
  { id: 'address_zipcode', label: 'CEP', minWidth: 50 },
  { id: 'address_street', label: 'Endereço', minWidth: 100 },
  { id: 'address_city', label: 'Cidade', minWidth: 50 },
  { id: 'address_state', label: 'Estado', minWidth: 10 },
  { id: 'crm', label: 'CRM', minWidth: 50 },
  { id: 'phone', label: 'Telefone', minWidth: 50 },
  { id: 'details', label: 'Detalhes', minWidth: 50 },
];

function setUsersIntoTable(
  users: User[],
  deleteUser: (user: User) => Promise<void>,
  openUserForm: (user?: User) => void
) {
  return users.map((user: UserTableData) => {
    const handleUserDetails = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      e.stopPropagation();
      openUserForm(user);
    };
    const handleDeleteUser = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      e.stopPropagation();
      deleteUser(user);
    };

    user.details = (
      <>
        <IconButton onClick={handleUserDetails}>
          <VisibilityIcon />
        </IconButton>
        <IconButton onClick={handleDeleteUser}>
          <DeleteIcon />
        </IconButton>
      </>
    );
    return user;
  });
}

interface UsersTableProps {
  users: User[];
  deleteUser: (user: User) => Promise<void>;
  openUserForm: (user?: User) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '64px',
      width: '100%',
    },
  })
);

export default function UsersTable(props: UsersTableProps) {
  const classes = useStyles();
  const [rows, setRows] = useState<UserTableData[]>([]);

  const { deleteUser, openUserForm, users } = props;

  useEffect(() => {
    setRows(setUsersIntoTable(users, deleteUser, openUserForm));
  }, [users, deleteUser, openUserForm]);

  return (
    <Grid
      container
      className={classes.root}
      spacing={1}
      alignItems="flex-end"
      justifyContent="flex-end"
    >
      <OrangeButton
        variant="contained"
        color="primary"
        onClick={() => props.openUserForm()}
      >
        Cadastrar novo Usuário
      </OrangeButton>
      <GenericTable columns={columns} rows={rows} />
    </Grid>
  );
}
