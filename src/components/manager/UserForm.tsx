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
import { maskCNPJandCPF } from '../../utils/formFieldMask';

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
  const [role, setRole] = useState<string>(currentRole || roleOptions[0].value);
  const classes = useStyles();

  const handleSetUser = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const pseudoPayload = {
      name: userName,
      tax_id: taxId,
      address_zipcode: zipcode,
      address_street: streetAddress,
      address_city: city,
      address_state: stateAddress,
      phone,
      crm,
      role,
    };
    const payload = !!password ? { ...pseudoPayload, password } : pseudoPayload;
    setUser(
      currentUser?.id,
      currentUser?.id ? payload : { ...payload, email: email }
    );
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
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              id="user-name-input"
              label="Nome do usuário"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id="tax-id-input"
              label="CNPJ/CPF"
              value={maskCNPJandCPF(taxId)}
              onChange={(e) => setTaxId(e.target.value?.match(/\d+/g)?.join('') || '')}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              id="crm-input"
              label="Conselho Regional"
              value={crm}
              onChange={(e) => setCrm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id="email-input"
              label="E-mail"
              value={email}
              disabled={!!currentUser?.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id="password-input"
              label="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id="zipcode-input"
              label="CEP"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              id="street-address-input"
              label="Logradouro"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              id="city-input"
              label="Cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              id="state-address-input"
              label="Estado"
              value={stateAddress}
              onChange={(e) => setStateAddress(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              id="phone-input"
              label="Telefone"
              value={phone}
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
