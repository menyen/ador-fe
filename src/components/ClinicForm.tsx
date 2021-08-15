import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { deepOrange } from '@material-ui/core/colors';
import { createClinic, updateClinic } from '../utils/endpointRequests';
import { OrangeButton, OutlinedButton } from './Buttons';
import { Clinic } from '../models/Clinic';

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

interface ClinicFormProps {
  currentClinic?: Clinic;
  openClinicsTablePage: () => void;
}

export default function ClinicForm(props: ClinicFormProps) {
  const { currentClinic } = props;
  const [clinicName, setClinicName] = useState<string>(
    currentClinic?.name || ''
  );
  const [taxId, setTaxId] = useState<string>(currentClinic?.tax_id || '');
  const [zipcode, setZipcode] = useState<string>(
    currentClinic?.address_zipcode?.toString() || ''
  );
  const [streetAddress, setStreetAddress] = useState<string>(
    currentClinic?.address_street || ''
  );
  const [city, setCity] = useState<string>(currentClinic?.address_city || '');
  const [stateAddress, setStateAddress] = useState<string>(
    currentClinic?.address_state || ''
  );
  const [phone, setPhone] = useState<string>(currentClinic?.phone || '');
  // TODO: Need to get owner's data. Get clinic is not returning them
  const [ownerName, setOwnerName] = useState<string>('');
  const [ownerEmail, setOwnerEmail] = useState<string>('');
  const [ownerPassword, setOwnerPassword] = useState<string>('');
  const classes = useStyles();

  const handleSetClinic = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const payload = {
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
    };
    let response;
    if (currentClinic?.id) {
      response = await updateClinic(currentClinic.id, payload);
    } else {
      response = await createClinic(payload);
    }
    if (response.ok) {
      props.openClinicsTablePage();
    }
  };
  return (
    <Paper className={classes.root}>
      <form onSubmit={handleSetClinic}>
        <Grid
          container
          xs={12}
          justifyContent="flex-start"
          alignItems="flex-start"
          alignContent="flex-start"
        >
          <Typography
            variant="h6"
            gutterBottom
            className={classes.headerSection}
          >
            Dados da clínica
          </Typography>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="clinic-name-input"
              label="Nome da clínica"
              defaultValue={clinicName}
              onChange={(e) => setClinicName(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="tax-id-input"
              label="ID de cobrança"
              defaultValue={taxId}
              onChange={(e) => setTaxId(e.target.value)}
            />
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
          xs={12}
          justifyContent="flex-start"
          alignItems="flex-start"
          alignContent="flex-start"
        >
          <Typography
            variant="h6"
            gutterBottom
            className={clsx(classes.headerSection, classes.ownerHeaderSection)}
          >
            Dados da proprietário
          </Typography>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              id="owner-name-input"
              label="Nome do proprietário"
              defaultValue={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              id="owner-email-input"
              label="Email do proprietário"
              defaultValue={ownerEmail}
              onChange={(e) => setOwnerEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              type="password"
              id="owner-password-input"
              label="Senha do proprietário"
              defaultValue={ownerPassword}
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
          className={classes.footerSection}
        >
          <OutlinedButton
            variant="outlined"
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
