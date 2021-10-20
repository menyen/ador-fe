import React, { useContext, useEffect, useReducer } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Grid from '@material-ui/core/Grid';
import { deepOrange } from '@material-ui/core/colors';
import { OrangeButton } from '../Buttons';
import termsReducer from '../../reducers/term';
import { getTermsOfUse, setTermsOfUse } from '../../actions/term';
import { AlertContext } from '../../utils/alert';

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
    textarea: {
      width: '100%',
    },
  })
);

export default function Settings() {
  const classes = useStyles();
  const [tou, dispatch] = useReducer(termsReducer, '');
  const [, setAlertMessage] = useContext(AlertContext);

  useEffect(() => {
    getTermsOfUse(setAlertMessage)(dispatch);
  }, [setAlertMessage]);

  const handleSetTerms = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setTermsOfUse(
      ((e.target as HTMLFormElement)[0] as HTMLTextAreaElement).value,
      setAlertMessage
    )(dispatch);
  };

  return (
    <Paper className={classes.root}>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="flex-start"
        alignContent="flex-start"
      >
        <Typography variant="h6" gutterBottom className={classes.headerSection}>
          Termos de uso
        </Typography>
      </Grid>
      <form onSubmit={handleSetTerms}>
        <Grid
          container
          justifyContent="flex-end"
          alignItems="flex-end"
          alignContent="flex-end"
        >
          <Grid item xs={12}>
            <TextareaAutosize
              minRows={10}
              placeholder="Digite os termos de uso aqui..."
              defaultValue={tou}
              className={classes.textarea}
            />
          </Grid>
          <OrangeButton type="submit">Salvar</OrangeButton>
        </Grid>
      </form>
    </Paper>
  );
}
