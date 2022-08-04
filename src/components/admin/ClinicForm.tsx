import React, { useState, useReducer, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { deepOrange } from '@material-ui/core/colors';
import { OrangeButton, OutlinedButton } from '../Buttons';
import { Clinic } from '../../models/Clinic';
import { Plan } from '../../models/Plan';
import { ClinicPayload, SubscriptionPayload } from '../../interfaces';
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

interface ClinicFormProps {
  currentClinic?: Clinic;
  openClinicsTablePage: () => void;
  setClinicAndSubscription: (
    clinicId: number | undefined,
    clinicPayload: ClinicPayload,
    subscriptionId: number | undefined,
    subscriptionPayload: SubscriptionPayload
  ) => Promise<void>;
  plans?: Plan[];
}

export default function ClinicForm(props: ClinicFormProps) {
  const { currentClinic, setClinicAndSubscription, plans } = props;

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
  const [ownerName, setOwnerName] = useState<string>(
    currentClinic?.owner?.name || ''
  );
  const [ownerEmail, setOwnerEmail] = useState<string>(
    currentClinic?.owner?.email || ''
  );
  const [ownerPassword, setOwnerPassword] = useState<string>('');

  const [subscriptionEnd, setSubscriptionEnd] = useState<string>(
    currentClinic?.subscription?.active_until?.split('T')[0] || ''
  );

  const [selectedPlanId, setSelectedPlanId] = useState<number>(
    Number(currentClinic?.subscription?.plan?.id)
  );

  const classes = useStyles();

  const handleSetClinicAndSubscription = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const clinicPayload = {
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
    const subscriptionPayload: SubscriptionPayload = {
      plan_id: selectedPlanId,
      active_until: subscriptionEnd
    }
    setClinicAndSubscription(
      currentClinic?.id,
      clinicPayload,
      currentClinic?.subscription?.id,
      subscriptionPayload
    );
  };
  return (
    <Paper className={classes.root}>
      <form onSubmit={handleSetClinicAndSubscription}>
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
            Dados da clínica
          </Typography>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="clinic-name-input"
              label="Nome da clínica"
              value={clinicName}
              onChange={(e) => setClinicName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="tax-id-input"
              label="CNPJ/CPF"
              value={maskCNPJandCPF(taxId)}
              onChange={(e) => setTaxId(e.target.value?.match(/\d+/g)?.join('') || '')}
            />
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
          justifyContent="flex-start"
          alignItems="flex-start"
          alignContent="flex-start"
        >
          <Typography
            variant="h6"
            gutterBottom
            className={clsx(classes.headerSection, classes.ownerHeaderSection)}
          >
            Dados do proprietário
          </Typography>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id="owner-name-input"
              label="Nome do proprietário"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id="owner-email-input"
              label="Email do proprietário"
              value={ownerEmail}
              disabled={!!currentClinic?.owner?.email}
              onChange={(e) => setOwnerEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type="password"
              id="owner-password-input"
              label="Senha do proprietário"
              value={ownerPassword}
              onChange={(e) => setOwnerPassword(e.target.value)}
            />
          </Grid>
        </Grid>

        <Grid
          container
          justifyContent="flex-start"
          alignItems="flex-start"
          alignContent="flex-start"
        >
          <Typography
            variant="h6"
            gutterBottom
            className={clsx(classes.headerSection, classes.ownerHeaderSection)}
          >
            Dados da assinatura
          </Typography>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel htmlFor="subscription-type">Plano Adquirido</InputLabel>
              <Select
                native
                id="subscription-type"
                value={selectedPlanId}
                onChange={(e) => {setSelectedPlanId(Number(e.target.value))}}
              >
                {plans?.map(plan => (
                  <option key={plan.id} value={plan.id}>
                    {plan.slug}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <InputLabel htmlFor="subscription-start">
              Data de início
            </InputLabel>
            <TextField
              fullWidth
              type="date"
              id="subscription-start"
              value={currentClinic?.subscription?.created_at?.split('T')[0]}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* TODO: Need to make this field available to change once back-end is ready */}
            <InputLabel htmlFor="subscription-end">
              Válido até
            </InputLabel>
            <TextField
              fullWidth
              type="date"
              id="subscription-end"
              value={subscriptionEnd}
              // disabled
              onChange={(e) => setSubscriptionEnd(e.target.value)}
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
