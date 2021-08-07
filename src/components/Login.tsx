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
import clsx from 'clsx';
import { UserToken } from '../hooks/useToken';
import minilogo from '../image/mini-logo-white.svg';
import logo from '../image/logo.svg';
import { loginUser } from '../utils/endpointRequests';

interface LoginProps {
  setToken: (userToken: UserToken) => void;
}

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
      width: '50vw',
      textAlign: 'center',
    },
    margin: {
      marginLeft: theme.spacing(6),
      marginRight: theme.spacing(6),
    },
    // control: {
    //   padding: theme.spacing(2),
    // },
  })
);

const ColorButton = withStyles((theme: Theme) => ({
  root: {
    color: 'white',
    backgroundColor: 'black',
    '&:hover': {
      backgroundColor: 'black',
    },
  },
}))(Button);

export default function Login(props: LoginProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const classes = useStyles();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password,
    });
    props.setToken(token);
  };
  return (
    <Grid container className={classes.root} spacing={1}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={0}>
          <Grid item>
            <Paper className={clsx(classes.paper, classes.left)}>
              <img src={minilogo} alt="logo" width="300" />
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={clsx(classes.paper, classes.right)}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <img src={logo} className="app-logo" alt="logo" />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Seja Bem-vindo!
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      Por favor informe suas credenciais para acessar a
                      plataforma!
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      fullWidth
                      className={classes.margin}
                      id="email-input"
                      label="E-mail"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      fullWidth
                      className={classes.margin}
                      id="password-input"
                      label="Senha"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ColorButton variant="contained" type="submit">
                      Entrar
                    </ColorButton>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
