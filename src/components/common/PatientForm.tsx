import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { deepOrange } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { OrangeButton, OutlinedButton } from '../Buttons';
import { PatientPayload } from '../../interfaces';
import { Patient } from '../../models/Patient';
import { PatientForm as PatientFormModel } from '../../models/PatientForm';
import userReducer from '../../reducers/user';
import { getUsers } from '../../actions/user';
import { AlertContext } from '../../utils/alert';
import { AuthContext } from '../../utils/loggedUser';
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

interface PatientFormProps {
  currentPatient?: Patient;
  questionaires: PatientFormModel[];
  openPatientsTablePage: () => void;
  setPatient: (
    id: number | undefined,
    patientPayload: PatientPayload,
    questionairePayload: string[],
    sendEmail: boolean
  ) => Promise<void>;
}

export default function PatientForm(props: PatientFormProps) {
  const { currentPatient, setPatient } = props;
  const [patientName, setPatientName] = useState<string>(
    currentPatient?.name || ''
  );
  const [taxId, setTaxId] = useState<string>(currentPatient?.tax_id || '');
  const [email, setEmail] = useState<string>(currentPatient?.email || '');

  const [phone, setPhone] = useState<string>(currentPatient?.phone || '');
  const [birthdate, setBirthdate] = useState<string>(
    currentPatient?.birthdate || ''
  );
  const [gender, setGender] = useState<string>(currentPatient?.gender || 'F');
  const [physicianId, setPhysicianId] = useState<number>(
    currentPatient?.physician_id || 0
  );
  const [sendEmail, setSendEmail] = useState<boolean>(false);

  const questionairesClassified = props.questionaires.reduce(
    (acc, q) => ({ ...acc, [q.type]: q }),
    {}
  );
  const initialQuestionaires: any = Object.values(
    questionairesClassified
  ).reduce((acc, q) => {
    if ((q as PatientFormModel).status === 'PENDING') {
      return [...(acc as string[]), (q as PatientFormModel).type];
    }
    return acc;
  }, []);
  const [questionaires, setQuestionaires] =
    useState<string[]>(initialQuestionaires);

  const [physicians, physiciansDispatch] = useReducer(userReducer, []);
  const [, setAlertMessage] = useContext(AlertContext);
  const [auth] = useContext(AuthContext);
  const classes = useStyles();

  const setErrorAlert = useCallback(
    (message: string) =>
      setAlertMessage({
        type: 'error',
        text: message,
      }),
    [setAlertMessage]
  );

  useEffect(() => {
    getUsers(setErrorAlert, 'physicians')(physiciansDispatch);
  }, [setErrorAlert]);

  useEffect(() => {
    if (physicians?.length && !physicianId) {
      setPhysicianId(physicians[0]?.id);
    }
  }, [physicians, physicianId]);

  const handleSetPatient = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const patientPayload = {
      name: patientName,
      tax_id: taxId,
      email,
      phone,
      birthdate,
      gender,
      physician_id: physicianId,
    };
    setPatient(currentPatient?.id, patientPayload, questionaires, sendEmail);
    
  };

  const handleCheckboxOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuestionaires(
      event.target.checked
        ? [...questionaires, event.target.name]
        : questionaires.filter((q) => q !== event.target.name)
    );
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
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              id="tax-id-input"
              label="CNPJ/CPF"
              value={maskCNPJandCPF(taxId)}
              onChange={(e) => setTaxId(e.target.value?.match(/\d+/g)?.join('') || '')}
            />
          </Grid>
          <Grid item xs={4}>
            <InputLabel htmlFor="birthdate-input">
              Data de Nascimento
            </InputLabel>
            <TextField
              fullWidth
              type="date"
              id="birthdate-input"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              id="email-input"
              label="E-mail"
              value={email}
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
            <InputLabel htmlFor="physician-id-input">
              Médico Responsável
            </InputLabel>
            <Select
              fullWidth
              native
              id="physician-id-input"
              value={physicianId}
              onChange={(e) => setPhysicianId(Number(e.target.value))}
            >
              {physicians?.length &&
                physicians.map((physician) => (
                  <option key={physician.id} value={physician.id}>
                    {physician.name}
                  </option>
                ))}
            </Select>
          </Grid>
          <Grid item xs={4}>
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
          style={{ marginTop: 36 }}
        >
          <Grid item xs={12}>
            <Typography variant="subtitle1" align="left">
              Quais questionários foram solicitados para esse paciente?
            </Typography>
          </Grid>
          {auth.user!.clinic.forms.map((item) => (
            <Grid item xs={12} key={item.id}>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={questionaires.includes(item.code)}
                      onChange={handleCheckboxOnChange}
                      name={item.code}
                    />
                  }
                  label={item.name}
                />
              </FormGroup>
            </Grid>
          ))}
          <Grid item xs={12}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={sendEmail}
                    name="sendEmail"
                    onChange={(event) => setSendEmail(event.target.checked)}
                  />
                }
                label="Enviar formulários por e-mail"
              />
            </FormGroup>
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
