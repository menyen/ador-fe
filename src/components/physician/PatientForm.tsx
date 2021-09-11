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
import { PatientPayload } from '../../interfaces';
import { Patient } from '../../models/Patient';

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
  currentPatient?: Patient;
  openPatientsTablePage: () => void;
  setPatient: (
    id: number | undefined,
    payload: PatientPayload
  ) => Promise<void>;
}

const roleOptions = [
  { value: 'MANAGER', label: 'Gerente' },
  { value: 'PHYSICIAN', label: 'Médico' },
  { value: 'RECEPTIONIST', label: 'Recepcionista' },
];

export default function UserForm(props: UserFormProps) {
  const { currentPatient, setPatient } = props;
  const [patientName, setPatientName] = useState<string>(
    currentPatient?.name || ''
  );
  const [taxId, setTaxId] = useState<string>(currentPatient?.tax_id || '');
  const [email, setEmail] = useState<string>(currentPatient?.email || '');

  const [phone, setPhone] = useState<string>(currentPatient?.phone || '');
  const [birthdate, setBirthdate] = useState<Date>(
    currentPatient?.birthdate || new Date()
  );
  const [gender, setGender] = useState<string>(currentPatient?.gender || '');
  const [physicianId, setPhysicianId] = useState<number>(
    currentPatient?.physician_id || 0
  );
  const classes = useStyles();

  const handleSetPatient = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const payload = {
      name: patientName,
      tax_id: taxId,
      email,
      phone,
      birthdate,
      gender,
      physician_id: physicianId,
    };
    setPatient(currentPatient?.id, payload);
  };
  return (
    <Paper className={classes.root}>
      <form onSubmit={handleSetPatient}>
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
            Dados do Paciente
          </Typography>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              id="user-name-input"
              label="Nome do usuário"
              defaultValue={patientName}
              onChange={(e) => setPatientName(e.target.value)}
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
          <Grid item xs={4}>
            <TextField
              fullWidth
              type="date"
              id="birthdate-input"
              label="Data de aniversário"
              defaultValue={birthdate}
              onChange={(e) => setBirthdate(new Date(e.target.value))}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              id="email-input"
              label="E-mail"
              defaultValue={email}
              disabled={!!currentPatient?.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl>
              <InputLabel htmlFor="gender-select">Sexo</InputLabel>
              <Select
                native
                id="gender-select"
                value={gender}
                onChange={(e) => setGender(e.target.value as string)}
              >
                <option key="female" value="F">
                  F
                </option>
                <option key="male" value="M">
                  M
                </option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              id="physician-id-input"
              label="Médico"
              defaultValue={physicianId}
              onChange={(e) => setPhysicianId(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={4}>
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
          <OutlinedButton
            variant="outlined"
            onClick={props.openPatientsTablePage}
          >
            Cancelar
          </OutlinedButton>
          <OrangeButton type="submit">Salvar</OrangeButton>
        </Grid>
      </form>
    </Paper>
  );
}
