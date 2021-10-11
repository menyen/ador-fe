import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Slider,
  Typography,
} from '@material-ui/core';
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
import {
  PatientBasicResult,
  PatientBPIResult,
  PatientForm,
  PatientHADResult,
} from '../../models/PatientForm';
import { deepOrange } from '@material-ui/core/colors';
import BodyMapBPI from '../patient/BodyMapBPI';

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
    hadTextResult: {
      margin: theme.spacing(1),
    },
    slider: {
      margin: '30px 0',
    },
    divider: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
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

  const epcForms = props?.questionaires?.filter(
    (q) => q.type === 'EPC' && q.status === 'DONE'
  );
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

  const dn4Forms = props?.questionaires?.filter(
    (q) => q.type === 'DN4' && q.status === 'DONE'
  );
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

  const oswForms = props?.questionaires?.filter(
    (q) => q.type === 'OSWESTRY' && q.status === 'DONE'
  );
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

  const hadForms = props?.questionaires?.filter(
    (q) => q.type === 'HAD' && q.status === 'DONE'
  );
  const hadLatestForm = hadForms && hadForms[hadForms.length - 1];
  const hadResult = hadLatestForm?.results as PatientHADResult;
  const hadAnsiety = hadResult?.ansiedade;
  const hadDepression = hadResult?.depressao;
  const hadCard = (
    <Paper classes={{ root: classes.paper }}>
      <Typography variant="h6">Oswestry De Lombalgia</Typography>
      <Typography variant="caption">
        {`Preenchido em: ${
          hadLatestForm &&
          new Date(hadLatestForm.updated_at).toLocaleDateString('pt-BR')
        }`}
      </Typography>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Ansiedade</Typography>
          <Typography variant="caption">{`Resultado: ${hadAnsiety?.score}`}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1" className={classes.hadTextResult}>
            {hadAnsiety?.text}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Depressão</Typography>
          <Typography variant="caption">{`Resultado: ${hadDepression?.score}`}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1" className={classes.hadTextResult}>
            {hadDepression?.text}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );

  const bpiForms = props?.questionaires?.filter(
    (q) => q.type === 'BPI' && q.status === 'DONE'
  );
  const bpiLatestForm = bpiForms && bpiForms[bpiForms.length - 1];
  const bpiResult = bpiLatestForm?.results as PatientBPIResult;
  const gradesLabels = [
    'Pior dor que sentiu nas últimas 24 horas:',
    'Dor mais fraca das últimas 24 horas:',
    'Média de dor do paciente:',
    'Dor do momento:',
  ];
  const percentagesLabels = [
    'Atividades em geral',
    'Humor',
    'Habilidade de caminhar',
    'Trabalho',
    'Relacionamento com outras pessoas',
    'Habilidade para apreciar a vida',
  ];
  const bpiCard = (
    <Paper classes={{ root: classes.paper }}>
      <Typography variant="h6">Breve Inventário de Dor (BPI)</Typography>
      <Typography variant="caption">
        {`Preenchido em: ${
          bpiLatestForm &&
          new Date(bpiLatestForm.updated_at).toLocaleDateString('pt-BR')
        }`}
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <BodyMapBPI
            disabledBodyMapClick={true}
            preSelectedValues={bpiResult.body_pain.reduce((acc, body) => {
              acc[body.area - 1] = body.pain_level;
              return acc;
            }, new Array(53).fill(0))}
          />
        </Grid>
        <Grid item xs={5}>
          {bpiResult.grades.map((grade, gradeIndex) => (
            <>
              <Typography variant="subtitle1">
                {gradesLabels[gradeIndex]}
              </Typography>
              <Slider
                defaultValue={0}
                classes={{
                  root: classes.slider,
                  // markLabel: classes.sliderMakrLabel,
                }}
                step={1}
                valueLabelDisplay="on"
                marks={[
                  { label: 'Sem dor', value: 0 },
                  { label: 'Pior dor', value: 10 },
                ]}
                min={0}
                max={10}
                disabled={true}
                value={grade}
              />
            </>
          ))}
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          {bpiResult.treatments.map((treatment, treatmentIndex) => (
            <>
              <Typography variant="subtitle1">{`Tratamento ${
                treatmentIndex + 1
              }`}</Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Nome do tratamento"
                    secondary={treatment?.name}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Quando iniciou?"
                    secondary={treatment?.started_at}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Qual a dose/frequência do tratamento?"
                    secondary={treatment?.frequency}
                  />
                </ListItem>
              </List>
              <Divider className={classes.divider} variant="middle" />
            </>
          ))}
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">
            Como a dor interferiu nas últimas 24 horas em:
          </Typography>
          <List>
            {bpiResult.percentages.map((percentage, percentageIndex) => (
              <ListItem>
                <ListItemText
                  primary={percentagesLabels[percentageIndex]}
                  secondary={percentage}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="left" paragraph>
            {`Intensidade da melhora proporcionada pelos tratamentos ou medicações nas últimas 24 horas: ${bpiResult.slider}`}
          </Typography>
        </Grid>
      </Grid>
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
      <Grid item xs={3}>
        {hadCard}
      </Grid>
      <Grid item xs={9}>
        {bpiCard}
      </Grid>
    </Grid>
  );
}

export default PatientSummary;
