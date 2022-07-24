import React, { useCallback, useContext, useState } from 'react';
import {
  withStyles,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Link from '@material-ui/core/Link';
import clsx from 'clsx';
import { green } from '@material-ui/core/colors';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import {
  Credentials,
  LoginPanelType,
  PanelCommonProps,
  RouterParams,
} from '../interfaces';
import minilogo from '../image/mini-logo-white.svg';
import logo from '../image/logo.svg';
import { OutlinedButton } from './Buttons';
import { AuthContext } from '../utils/loggedUser';
import { AlertContext } from '../utils/alert';
import { ClinicSlugContext } from '../utils/clinicSlug';
import api from '../utils/api';
import { maskCNPJandCPF } from '../utils/formFieldMask';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    loginPatient: {
      backgroundColor: '#CEEBEA',
      height: '100vh',
    },
    paperLoginPatient: {
      margin: 'auto',
      width: '90vw',
    },
    gridLoginPatient: {
      padding: '1rem',
    },
    left: {
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
    },
    right: {
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
    },
    paper: {
      height: '100vh',
      boxShadow: 'none',
    },
    contentBox: {
      maxWidth: '400px',
    },
    centralize: {
      textAlign: 'center',
      marginBottom: theme.spacing(6),
      marginTop: theme.spacing(6),
    },
    input: {
      marginTop: theme.spacing(2),
    },
    termsAndPolicy: {
      fontSize: '0.875rem',
    },
    link: {
      textDecoration: 'underline',
    },
    alignRight: {
      textAlign: 'end',
    },
    forgotLink: {
      marginTop: 10,
      fontSize: '0.75rem',
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalPaper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      height: '400px',
      width: '900px',
      overflow: 'auto',
    },
    textarea: {
      width: '100%',
    },
  })
);

async function loginUser(
  credentials: Credentials,
  setAlertMessage?: (message: string) => void
) {
  return api
    .post('api/v1/login', JSON.stringify(credentials), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      setAlertMessage!(error.response.data.message);
      return null;
    });
}

async function loginPatient(
  tax_id: string,
  clinic_slug: string,
  setAlertMessage?: (message: string) => void
) {
  return api
    .post(`api/v1/patient/login/${clinic_slug}`, JSON.stringify({ tax_id }), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      setAlertMessage!(error.response.data.message);
      return null;
    });
}

async function getTermsNoLogin(setAlertMessage?: (message: string) => void) {
  return api
    .get('api/v1/terms/text', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      setAlertMessage!(error.response.data.message);
      return null;
    });
}

const DefaultButton = withStyles((theme: Theme) => ({
  root: {
    color: 'white',
    backgroundColor: 'black',
    '&:hover': {
      backgroundColor: 'black',
    },
    textTransform: 'capitalize',
    maxWidth: 185,
    margin: theme.spacing(1),
  },
}))(Button);

const LoginPatientButton = withStyles((theme: Theme) => ({
  root: {
    color: 'white',
    backgroundColor: green[400],
  },
  '&:hover': {
    backgroundColor: green[700],
  },
}))(Button);

function InitialPanel(props: PanelCommonProps) {
  const classes = useStyles();
  const [terms, setTerms] = useState({ message: '', term: '' });
  const [, setAlertMessage] = useContext(AlertContext);

  const setErrorAlert = useCallback(
    (message: string) =>
      setAlertMessage({
        type: 'error',
        text: message,
      }),
    [setAlertMessage]
  );

  const [openModal, setOpenModal] = React.useState(false);

  const handleOpenModal = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const fetchedTerms = await getTermsNoLogin(setErrorAlert);
    setTerms(fetchedTerms);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Paper className={clsx(classes.paper, classes.right)}>
      <Grid container spacing={0} className={classes.contentBox}>
        <Grid item xs={12} className={classes.centralize}>
          <img src={logo} className="app-logo" alt="logo" />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Seja Bem-vindo!
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Por favor informe suas credenciais para acessar a plataforma!
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.centralize}>
          <DefaultButton
            variant="contained"
            onClick={props.nextPanel}
            size="large"
          >
            Entrar
          </DefaultButton>
        </Grid>
        <Grid item xs={12} className={classes.centralize}>
          <Typography className={classes.termsAndPolicy}>
            <Link
              href="#"
              color="textPrimary"
              onClick={handleOpenModal}
              className={classes.link}
            >
              Termos de uso
            </Link>
          </Typography>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openModal}
            onClose={handleCloseModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openModal}>
              <div className={classes.modalPaper}>
                <h2 id="transition-modal-title">{terms.message}</h2>
                <TextareaAutosize
                  id="transition-modal-description"
                  disabled
                  minRows={10}
                  defaultValue={terms.term}
                  className={classes.textarea}
                />
                <Button onClick={handleCloseModal} variant="contained">
                  Fechar
                </Button>
              </div>
            </Fade>
          </Modal>
        </Grid>
      </Grid>
    </Paper>
  );
}

function LoginPanel(props: PanelCommonProps) {
  const [, setAuth] = useContext(AuthContext);
  const [, setAlertMessage] = useContext(AlertContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const classes = useStyles();

  const setErrorAlert = useCallback(
    (message: string) =>
      setAlertMessage({
        type: 'error',
        text: message,
      }),
    [setAlertMessage]
  );

  const history = useHistory();
  const location = useLocation<{ from: { pathname: string } }>();

  const handleLoginSubmit = async (e: React.SyntheticEvent) => {
    const { from } = location.state || { from: { pathname: '/' } };
    e.preventDefault();
    const token = await loginUser(
      {
        email,
        password,
      },
      setErrorAlert
    );
    if (token) {
      setAuth(token);
      history.replace(from);
    }
  };

  return (
    <Paper className={clsx(classes.paper, classes.right)}>
      <form onSubmit={handleLoginSubmit}>
        <Grid container spacing={0} className={classes.contentBox}>
          <Grid item xs={12} className={classes.centralize}>
            <img src={logo} className="app-logo" alt="logo" />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Seja Bem-vindo!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Por favor informe suas credenciais para acessar a plataforma!
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.input}>
            <TextField
              fullWidth
              id="email-input"
              label="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} className={classes.input}>
            <TextField
              fullWidth
              id="password-input"
              label="Senha"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} className={classes.alignRight}>
            <Typography className={classes.forgotLink}>
              <Link href="#" color="textPrimary" onClick={props.nextPanel}>
                Esqueceu a senha?
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.centralize}>
            <DefaultButton variant="contained" type="submit" size="large">
              Entrar
            </DefaultButton>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

function ForgotPasswordPanel(props: PanelCommonProps) {
  const [emailForgotPsw, setEmailForgotPsw] = useState<string>('');
  const [, setAlertMessage] = useContext(AlertContext);

  const setErrorAlert = useCallback(
    (message: string) =>
      setAlertMessage({
        type: 'error',
        text: message,
      }),
    [setAlertMessage]
  );

  const setSuccessAlert = useCallback(
    (message: string) =>
      setAlertMessage({
        type: 'success',
        text: message,
      }),
    [setAlertMessage]
  );

  const handleForgotPswSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    api
      .post(
        'api/v1/forgot_password',
        JSON.stringify({ email: emailForgotPsw }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        props.nextPanel();
        const jsonResp = response.data;
        setSuccessAlert(jsonResp.message);
      })
      .catch((error) => {
        setErrorAlert(error.response.data.message);
      });
  };

  const classes = useStyles();
  return (
    <Paper className={clsx(classes.paper, classes.right)}>
      <form onSubmit={handleForgotPswSubmit}>
        <Grid container spacing={0} className={classes.contentBox}>
          <Grid item xs={12} className={classes.centralize}>
            <img src={logo} className="app-logo" alt="logo" />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Esqueceu sua senha?
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Enviaremos um código de recuperação para o seu email
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.input}>
            <TextField
              fullWidth
              id="email-forgot-psw-input"
              label="E-mail"
              onChange={(e) => setEmailForgotPsw(e.target.value)}
            />
          </Grid>
          <Grid container className={classes.centralize}>
            <Grid item xs={6}>
              <OutlinedButton
                variant="outlined"
                size="large"
                onClick={props.nextPanel}
              >
                Cancelar
              </OutlinedButton>
            </Grid>
            <Grid item xs={6}>
              <DefaultButton variant="contained" type="submit" size="large">
                Enviar
              </DefaultButton>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

function PatientPanel() {
  const [taxId, setTaxId] = useState('');
  const [, setAuth] = useContext(AuthContext);
  const [, setAlertMessage] = useContext(AlertContext);
  const [, setClinicSlug] = useContext(ClinicSlugContext);
  const classes = useStyles();

  const setErrorAlert = useCallback(
    (message: string) =>
      setAlertMessage({
        type: 'error',
        text: message,
      }),
    [setAlertMessage]
  );

  const history = useHistory();
  const location = useLocation<{ from: { pathname: string } }>();
  const { clinic_slug } = useParams<RouterParams>();
  const handleLoginSubmit = async (e: React.SyntheticEvent) => {
    const { from } = location.state || {
      from: { pathname: `/patient` },
    };
    e.preventDefault();
    const token = await loginPatient(taxId, clinic_slug || '', setErrorAlert);
    if (token) {
      setAuth(token);
      if (clinic_slug) setClinicSlug(clinic_slug);
      history.replace(from);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      spacing={0}
      className={classes.loginPatient}
    >
      <Paper className={classes.paperLoginPatient}>
        <Grid item xs={12} spacing={0} className={classes.gridLoginPatient}>
          <Typography component="h1" variant="h6">
            Acesse para continuar
          </Typography>
        </Grid>
        <Grid item xs={12} spacing={0} className={classes.gridLoginPatient}>
          <Typography variant="body1" align="left">
            Para ter acesso aos questionários, por favor insira seu CPF abaixo:
          </Typography>
        </Grid>
        <Grid item xs={12} spacing={0} className={classes.gridLoginPatient}>
          <TextField
            fullWidth
            id="tax-id-input"
            label="CPF"
            value={maskCNPJandCPF(taxId)}
            onChange={(e) => setTaxId(e.target.value?.match(/\d+/g)?.join('') || '')}
          />
        </Grid>
        <Grid item xs={12} spacing={0} className={classes.gridLoginPatient}>
          <LoginPatientButton variant="contained" onClick={handleLoginSubmit}>
            Entrar
          </LoginPatientButton>
        </Grid>
      </Paper>
    </Grid>
  );
}

interface LoginProps {
  isPatient?: boolean;
}

export default function Login(props: LoginProps) {
  const [panel, setPanel] = useState<LoginPanelType>(LoginPanelType.Initial);
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={1}>
      <Grid item xs={12}>
        {props.isPatient ? (
          <PatientPanel />
        ) : (
          <Grid container justifyContent="center" spacing={0}>
            <Slide
              in={panel !== LoginPanelType.Initial}
              direction="right"
              mountOnEnter
              unmountOnExit
            >
              <Grid item xs={6}>
                <Paper className={clsx(classes.paper, classes.left)}>
                  <img src={minilogo} alt="logo" width="300" />
                </Paper>
              </Grid>
            </Slide>
            <Grid item xs={6}>
              {panel === LoginPanelType.Initial && (
                <InitialPanel
                  nextPanel={() => setPanel(LoginPanelType.Login)}
                />
              )}
              {panel === LoginPanelType.Login && (
                <LoginPanel
                  nextPanel={() => setPanel(LoginPanelType.ForgotPassword)}
                />
              )}
              {panel === LoginPanelType.ForgotPassword && (
                <ForgotPasswordPanel
                  nextPanel={() => setPanel(LoginPanelType.Login)}
                />
              )}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
