import { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Grid from '@material-ui/core/Grid';
import { deepOrange } from '@material-ui/core/colors';
import { getTermsOfUse, setTermsOfUse } from '../utils/endpointRequests';
import { OrangeButton } from './Buttons';

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
  const [tou, setTou] = useState<string>('');
  useEffect(() => {
    async function getTOU() {
      const termsOfUse: { message: string; term: string } =
        await getTermsOfUse();
      setTou(termsOfUse.term);
    }
    getTOU();
  }, []);

  const handleSetTerms = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setTermsOfUse(tou);
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
              onChange={(e) => setTou(e.target.value)}
            />
          </Grid>
          <OrangeButton type="submit">Salvar</OrangeButton>
        </Grid>
      </form>
    </Paper>
  );
}
