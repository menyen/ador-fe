import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { createClinic } from '../utils/endpointRequests';
import { OrangeButton, OutlinedButton } from './Buttons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '64px',
      width: '100%',
      padding: theme.spacing(4),
    },
  })
);

interface ClinicFormProps {
  openClinicsTablePage: () => void;
}

export default function ClinicForm(props: ClinicFormProps) {
  const [clinicName, setClinicName] = useState<string>('');
  const [taxId, setTaxId] = useState<string>('');
  const [zipcode, setZipcode] = useState<string>('');
  const [streetAddress, setStreetAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [stateAddress, setStateAddress] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [ownerName, setOwnerName] = useState<string>('');
  const [ownerEmail, setOwnerEmail] = useState<string>('');
  const [ownerPassword, setOwnerPassword] = useState<string>('');
  const classes = useStyles();

  const handleNewClinic = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await createClinic({
      name: clinicName,
      tax_id: taxId,
      address_zipcode: zipcode,
      address_street: streetAddress,
      address_city: city,
      address_state: stateAddress,
      phone,
      user: {
        name: ownerName,
        email: ownerEmail,
        password: ownerPassword,
      },
    });
  };
  return (
    <Paper className={classes.root}>
      <form onSubmit={handleNewClinic}>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="clinic-name-input"
              label="Nome da clínica"
              onChange={(e) => setClinicName(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="tax-id-input"
              label="ID de cobrança"
              onChange={(e) => setTaxId(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              id="zipcode-input"
              label="CEP"
              onChange={(e) => setZipcode(e.target.value)}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              id="street-address-input"
              label="Logradouro"
              onChange={(e) => setStreetAddress(e.target.value)}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              fullWidth
              id="city-input"
              label="Cidade"
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              id="state-address-input"
              label="Estado"
              onChange={(e) => setStateAddress(e.target.value)}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              fullWidth
              id="phone-input"
              label="Telefone"
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              id="owner-name-input"
              label="Nome do proprietário"
              onChange={(e) => setOwnerName(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              id="owner-email-input"
              label="Email do proprietário"
              onChange={(e) => setOwnerEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              id="owner-password-input"
              label="Senha do proprietário"
              onChange={(e) => setOwnerPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid
          container
          xs={12}
          justifyContent="center"
          alignItems="center"
          alignContent="center"
        >
          <OutlinedButton
            variant="outlined"
            // size="large"
            onClick={props.openClinicsTablePage}
          >
            Cancelar
          </OutlinedButton>
          <OrangeButton type="submit">Salvar</OrangeButton>
        </Grid>
      </form>
    </Paper>
  );
}
