import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { deepOrange } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { OrangeButton, OutlinedButton } from '../Buttons';
import { User } from '../../models/User';
import { UserPayload } from '../../interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '64px',
      width: '100%',
      padding: theme.spacing(4),
    },
    headerSection: {
      color: deepOrange[500],
    },
    ownerHeaderSection: {
      marginTop: theme.spacing(4),
    },
    footerSection: {
      marginTop: theme.spacing(4),
    },
  })
);

interface UserFormProps {
  currentUser?: User;
  openUsersTablePage: () => void;
  setUser: (id: number | undefined, payload: UserPayload) => Promise<void>;
}

const roleOptions = [
  { value: 'MANAGER', label: 'Gerente' },
  { value: 'PHYSICIAN', label: 'Médico' },
  { value: 'RECEPTIONIST', label: 'Recepcionista' },
];

export default function UserForm(props: UserFormProps) {
  const { currentUser, setUser } = props;
  const [userName, setUserName] = useState<string>(currentUser?.name || '');
  const [taxId, setTaxId] = useState<string>(currentUser?.tax_id || '');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>(currentUser?.email || '');

  const [zipcode, setZipcode] = useState<string>(
    currentUser?.address_zipcode?.toString() || ''
  );
  const [streetAddress, setStreetAddress] = useState<string>(
    currentUser?.address_street || ''
  );
  const [city, setCity] = useState<string>(currentUser?.address_city || '');
  const [stateAddress, setStateAddress] = useState<string>(
    currentUser?.address_state || ''
  );
  const [phone, setPhone] = useState<string>(currentUser?.phone || '');
  const [crm, setCrm] = useState<string>(currentUser?.crm || '');
  const currentRole =
    currentUser?.roles &&
    (Array.isArray(currentUser.roles)
      ? currentUser.roles[0]
      : currentUser.roles);
  const [role, setRole] = useState<string>(currentRole || '');
  const classes = useStyles();

  const handleSetUser = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const payload = {
      name: userName,
      tax_id: taxId,
      password,
      address_zipcode: zipcode,
      address_street: streetAddress,
      address_city: city,
      address_state: stateAddress,
      phone,
      crm,
      role,
    };
    setUser(currentUser?.id, payload);
  };
  return (
    <Paper className={classes.root}>
      <form onSubmit={handleSetUser}>
        <Grid
          container
          justifyContent="flex-start"
          alignItems="flex-start"
          alignContent="flex-start"
        >
          <Typography
            variant="h6"
            gutterBottom
            className={classes.headerSection}
          >
            Dados do Usuário
          </Typography>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={5}>
            <TextField
              fullWidth
              id="user-name-input"
              label="Nome do usuário"
              defaultValue={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              id="tax-id-input"
              label="CNPJ/CPF"
              defaultValue={taxId}
              onChange={(e) => setTaxId(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              id="crm-input"
              label="CRM"
              defaultValue={crm}
              onChange={(e) => setCrm(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              id="email-input"
              label="E-mail"
              defaultValue={email}
              disabled={!!currentUser?.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              id="password-input"
              label="Senha"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl>
              <InputLabel htmlFor="role-select">Perfil</InputLabel>
              <Select
                native
                id="role-select"
                value={role}
                onChange={(e) => setRole(e.target.value as string)}
              >
                {roleOptions.map((roleOption) => (
                  <option key={roleOption.value} value={roleOption.value}>
                    {roleOption.label}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              id="zipcode-input"
              label="CEP"
              defaultValue={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              id="street-address-input"
              label="Logradouro"
              defaultValue={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              fullWidth
              id="city-input"
              label="Cidade"
              defaultValue={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              id="state-address-input"
              label="Estado"
              defaultValue={stateAddress}
              onChange={(e) => setStateAddress(e.target.value)}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              fullWidth
              id="phone-input"
              label="Telefone"
              defaultValue={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          className={classes.footerSection}
        >
          <OutlinedButton variant="outlined" onClick={props.openUsersTablePage}>
            Cancelar
          </OutlinedButton>
          <OrangeButton type="submit">Salvar</OrangeButton>
        </Grid>
      </form>
    </Paper>
  );
}
