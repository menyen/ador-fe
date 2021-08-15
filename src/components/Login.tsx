import React, { useState } from 'react';
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
import { LoginPanelType, LoginProps, PanelCommonProps } from '../interfaces';
import minilogo from '../image/mini-logo-white.svg';
import logo from '../image/logo.svg';
import { loginUser } from '../utils/endpointRequests';
import { useHistory, useLocation } from 'react-router-dom';
import { OutlinedButton } from './Buttons';

type LoginPanelProps = LoginProps & PanelCommonProps;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
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

function LoginPanel(props: LoginPanelProps) {
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
    props.setAuth(token);
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
          <Grid container xs={12} className={classes.centralize}>
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

export default function Login(props: LoginProps) {
  const [panel, setPanel] = useState<LoginPanelType>(LoginPanelType.Initial);
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={1}>
      <Grid item xs={12}>
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
              <InitialPanel nextPanel={() => setPanel(LoginPanelType.Login)} />
            )}
            {panel === LoginPanelType.Login && (
              <LoginPanel
                {...props}
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
      </Grid>
    </Grid>
  );
}
