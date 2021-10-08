import { Slider, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import { PatientBasicResult, PatientForm } from '../../models/PatientForm';
import { deepOrange } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '32px',
    },
    circularProgress: {
      margin: theme.spacing(4),
      color: deepOrange[500],
      position: 'absolute',
      left: 0,
    },
    circle: {
      strokeLinecap: 'round',
    },
    bottom: {
      margin: theme.spacing(4),
      color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    paper: {
      padding: theme.spacing(1),
    },
    dn4Slider: {
      width: '80%',
    },
    oswLinearProgress: {
      margin: theme.spacing(1),
    },
    oswPercentage: {
      color: deepOrange[500],
    },
  })
);

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: deepOrange[500],
    },
  })
)(LinearProgress);

interface PatientSummaryProps {
  questionaires: PatientForm[];
}

function PatientSummary(props: PatientSummaryProps) {
  const classes = useStyles();

  const epcForms = props?.questionaires?.filter((q) => q.type === 'EPC');
  const epcLatestForm = epcForms && epcForms[epcForms.length - 1];
  const epcResult = epcLatestForm?.results as PatientBasicResult;
  const scoreEPC = epcResult?.score || 0;
  const epcCard = (
    <Paper classes={{ root: classes.paper }}>
      <Typography variant="h6">Escala de pensamento catastrófico</Typography>
      <Typography variant="caption">
        {`Preenchido em: ${
          epcLatestForm &&
          new Date(epcLatestForm.updated_at).toLocaleDateString('pt-BR')
        }`}
      </Typography>
      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant="determinate"
          className={classes.bottom}
          size={100}
          thickness={5}
          {...props}
          value={100}
        />
        <CircularProgress
          variant="determinate"
          value={scoreEPC * 10}
          size={100}
          thickness={5}
          className={classes.circularProgress}
          classes={{ circle: classes.circle }}
        />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="subtitle1" component="div" color="textSecondary">
            {scoreEPC}
          </Typography>
        </Box>
      </Box>
      <Typography variant="subtitle1">{epcResult?.text}</Typography>
    </Paper>
  );

  const dn4Forms = props?.questionaires?.filter((q) => q.type === 'DN4');
  const dn4LatestForm = dn4Forms && dn4Forms[dn4Forms.length - 1];
  const dn4Result = dn4LatestForm?.results as PatientBasicResult;
  const scoreDN4 = dn4Result?.score || 0;
  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: scoreDN4,
      label: scoreDN4.toString(),
    },
    {
      value: 10,
      label: '10',
    },
  ];
  const dn4Card = (
    <Paper classes={{ root: classes.paper }}>
      <Typography variant="h6">Dor neuropática (DN4)</Typography>
      <Typography variant="caption">
        {`Preenchido em: ${
          dn4LatestForm &&
          new Date(dn4LatestForm.updated_at).toLocaleDateString('pt-BR')
        }`}
      </Typography>
      <Slider
        defaultValue={scoreDN4}
        aria-labelledby="discrete-slider-custom"
        step={1}
        valueLabelDisplay="off"
        marks={marks}
        disabled
        max={10}
        className={classes.dn4Slider}
      />
      <Typography variant="subtitle1">{dn4Result?.text}</Typography>
    </Paper>
  );

  const oswForms = props?.questionaires?.filter((q) => q.type === 'OSWESTRY');
  const oswLatestForm = oswForms && oswForms[oswForms.length - 1];
  const oswResult = oswLatestForm?.results as PatientBasicResult;
  const scorOSW = oswResult?.score || 0;
  const oswCard = (
    <Paper classes={{ root: classes.paper }}>
      <Typography variant="h6">Oswestry De Lombalgia</Typography>
      <Typography variant="caption">
        {`Preenchido em: ${
          oswLatestForm &&
          new Date(oswLatestForm.updated_at).toLocaleDateString('pt-BR')
        }`}
      </Typography>
      <BorderLinearProgress
        variant="determinate"
        value={scorOSW}
        className={classes.oswLinearProgress}
      />
      <Typography
        variant="subtitle1"
        className={classes.oswPercentage}
      >{`${scorOSW}%`}</Typography>
      <Typography variant="subtitle1">{oswResult?.text}</Typography>
    </Paper>
  );

  return (
    <Grid container spacing={1} className={classes.root}>
      <Grid item xs={3}>
        {epcCard}
      </Grid>
      <Grid item xs={3}>
        {dn4Card}
      </Grid>
      <Grid item xs={3}>
        {oswCard}
      </Grid>
    </Grid>
  );
}

export default PatientSummary;
