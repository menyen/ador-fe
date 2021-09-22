import React, { useContext, useState } from 'react';
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

import { Credentials, LoginPanelType, PanelCommonProps } from '../interfaces';
import minilogo from '../image/mini-logo-white.svg';
import logo from '../image/logo.svg';
import { OutlinedButton } from './Buttons';
import { AuthContext, baseUrl } from '../utils/loggedUser';

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
  })
);

async function loginUser(credentials: Credentials) {
  return fetch(`${baseUrl}/api/v1/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

async function loginPatient(tax_id: string, clinicId: number) {
  return fetch(`${baseUrl}/api/v1/patient/login/${clinicId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tax_id }),
  }).then((data) => data.json());
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
  const preventDefault = (event: React.SyntheticEvent) =>
    event.preventDefault();

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
              onClick={preventDefault}
              className={classes.link}
            >
              Termos de uso
            </Link>
            &nbsp;e&nbsp;
            <Link
              href="#"
              color="textPrimary"
              onClick={preventDefault}
              className={classes.link}
            >
              Políticas de privacidade
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

function LoginPanel(props: PanelCommonProps) {
  const [, setAuth] = useContext(AuthContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation<{ from: { pathname: string } }>();

  const handleLoginSubmit = async (e: React.SyntheticEvent) => {
    const { from } = location.state || { from: { pathname: '/' } };
    e.preventDefault();
    const token = await loginUser({
      email,
      password,
    });
    setAuth(token);
    history.replace(from);
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

  const handleForgotPswSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // TODO call forgotPassword function here
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

interface RouterParams {
  clinic_id?: string;
}

function PatientPanel() {
  const [taxId, setTaxId] = useState('');
  const [, setAuth] = useContext(AuthContext);
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation<{ from: { pathname: string } }>();
  const { clinic_id } = useParams<RouterParams>();
  const handleLoginSubmit = async (e: React.SyntheticEvent) => {
    const { from } = location.state || { from: { pathname: '/' } };
    e.preventDefault();
    const token = await loginPatient(taxId, Number(clinic_id));
    setAuth(token);
    history.replace(from);
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
            onChange={(e) => setTaxId(e.target.value)}
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
