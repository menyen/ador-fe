import { useEffect, useMemo } from 'react';
import { AxisOptions, Chart } from 'react-charts';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { deepOrange } from '@material-ui/core/colors';
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import {
  PatientBasicResult,
  PatientBPIResult,
  PatientFibromialgiaResult,
  PatientForm,
  PatientHADResult,
  PatientSBSTResult,
  PatientSF36Result,
  PatientWOMACResult,
  PatientSPADIResult,
  PatientAOFASResult,
} from '../../models/PatientForm';
import BodyMapBPI from '../patient/BodyMapBPI';
import { PatientReportPanelType } from '../../interfaces';

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
      marginTop: theme.spacing(1),
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
    fibromialgiaDiagnosis: {
      color: deepOrange[500],
      margin: theme.spacing(2),
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
  setReportPanel: (panel: PatientReportPanelType) => void;
}

function PatientSummary(props: PatientSummaryProps) {
  const classes = useStyles();

  const { questionaires, setReportPanel } = props;

  const epcForms = questionaires?.filter(
    (q) => q.type === 'EPC' && q.status === 'DONE'
  );
  const epcLatestForm = epcForms && epcForms[epcForms.length - 1];
  const epcResult = epcLatestForm?.results as PatientBasicResult;
  const scoreEPC = epcResult?.score || 0;
  const epcCard = (
    <Paper classes={{ root: classes.paper }}>
      <Typography variant="h6">Escala de pensamento catastrófico</Typography>
      <Typography variant="caption" display="block">
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
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link
            component="button"
            variant="body2"
            onClick={() => setReportPanel(PatientReportPanelType.EPC)}
          >
            Ver respostas
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );

  const dn4Forms = questionaires?.filter(
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
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link
            component="button"
            variant="body2"
            onClick={() => setReportPanel(PatientReportPanelType.DN4)}
          >
            Ver respostas
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );

  const oswForms = questionaires?.filter(
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
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link
            component="button"
            variant="body2"
            onClick={() => setReportPanel(PatientReportPanelType.OSWESTRY)}
          >
            Ver respostas
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );

  const hadForms = questionaires?.filter(
    (q) => q.type === 'HAD' && q.status === 'DONE'
  );
  const hadLatestForm = hadForms && hadForms[hadForms.length - 1];
  const hadResult = hadLatestForm?.results as PatientHADResult;
  const hadAnxiety = hadResult?.ansiedade;
  const hadDepression = hadResult?.depressao;
  const hadCard = (
    <Paper classes={{ root: classes.paper }}>
      <Typography variant="h6">HAD</Typography>
      <Typography variant="caption">
        {`Preenchido em: ${
          hadLatestForm &&
          new Date(hadLatestForm.updated_at).toLocaleDateString('pt-BR')
        }`}
      </Typography>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Ansiedade</Typography>
          <Typography variant="caption">{`Resultado: ${hadAnxiety?.score}`}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1" className={classes.hadTextResult}>
            {hadAnxiety?.text}
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
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link
            component="button"
            variant="body2"
            onClick={() => setReportPanel(PatientReportPanelType.HAD)}
          >
            Ver respostas
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );

  const bpiForms = questionaires?.filter(
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
            preSelectedValues={bpiResult?.body_pain?.reduce((acc, body) => {
              acc[body.area - 1] = body.pain_level;
              return acc;
            }, new Array(53).fill(0))}
          />
        </Grid>
        <Grid item xs={5}>
          {bpiResult?.grades?.map((grade, gradeIndex) => (
            <div key={`grade-${gradeIndex}`}>
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
            </div>
          ))}
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          {bpiResult?.treatments?.map((treatment, treatmentIndex) => (
            <div key={`treatment=${treatmentIndex}`}>
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
            </div>
          ))}
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">
            Como a dor interferiu nas últimas 24 horas em:
          </Typography>
          <List>
            {bpiResult?.percentages?.map((percentage, percentageIndex) => (
              <ListItem key={`percentage-${percentageIndex}`}>
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
            {`Intensidade da melhora proporcionada pelos tratamentos ou medicações nas últimas 24 horas: ${bpiResult?.slider}`}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );

  type Series = {
    label: string;
    data: PatientBasicResult[];
  };
  const sf36Forms = questionaires?.filter(
    (q) => q.type === 'SF36' && q.status === 'DONE'
  );
  const chartData: Series[] = useMemo(
    () =>
      sf36Forms?.reduce((acc: Series[], sf36) => {
        if (sf36.status === 'PENDING') {
          return acc;
        }
        return [
          ...acc,
          {
            label: `Resultado do paciente em ${new Date(
              sf36?.updated_at
            ).toLocaleDateString('pt-BR')}`,
            data: (sf36?.results as PatientSF36Result)?.raw_scale?.filter(
              (result) => result.text !== 'Total'
            ),
          },
        ];
      }, []),
    [sf36Forms]
  );
  const primaryAxis = useMemo(
    (): AxisOptions<PatientBasicResult> => ({
      getValue: (datum) => datum.text,
    }),
    []
  );
  const secondaryAxes = useMemo(
    (): AxisOptions<PatientBasicResult>[] => [
      {
        getValue: (datum) => datum.score,
        elementType: 'line',
      },
    ],
    []
  );

  const sf36Card = (
    <Paper classes={{ root: classes.paper }}>
      <Typography variant="h6">Qualidade de vida (SF-36)</Typography>
      <div style={{ height: '500px', paddingBottom: '10px' }}>
        <Chart
          options={{
            data: chartData,
            primaryAxis,
            secondaryAxes,
          }}
        />
      </div>
    </Paper>
  );

  const fibromialgiaForms = questionaires?.filter(
    (q) => q.type === 'FIBROMIALGIA' && q.status === 'DONE'
  );
  const fibromialgiaLatestForm =
    fibromialgiaForms && fibromialgiaForms[fibromialgiaForms.length - 1];
  const fibromialgiaResult =
    fibromialgiaLatestForm?.results as PatientFibromialgiaResult;
  const fibromialgiaCard = (
    <Paper classes={{ root: classes.paper }}>
      <Typography variant="h6">Fibromialgia</Typography>
      <Typography variant="caption">
        {`Preenchido em: ${
          fibromialgiaLatestForm &&
          new Date(fibromialgiaLatestForm.updated_at).toLocaleDateString(
            'pt-BR'
          )
        }`}
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            className={classes.fibromialgiaDiagnosis}
          >
            {fibromialgiaResult?.diagnosis?.criteria}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="left">
            Índice de Dor Generalizada
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="caption"
            align="left"
            paragraph
          >{`Resultado: ${fibromialgiaResult?.diagnosis?.idg_score}`}</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="left">
            Escala de Severidade dos Sintomas
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="caption"
            align="left"
            paragraph
          >{`Resultado: ${fibromialgiaResult?.diagnosis?.ess_score}`}</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="left">
            Tem sintomas há mais de 3 meses?
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="caption" align="left" paragraph>{`Resultado: ${
            fibromialgiaResult?.booleans?.length > 3 &&
            fibromialgiaResult?.booleans[3]
          }`}</Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link
            component="button"
            variant="body2"
            onClick={() => setReportPanel(PatientReportPanelType.FIBROMIALGIA)}
          >
            Ver respostas
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );

  const iadForms = questionaires?.filter(
    (q) => q.type === 'IAD' && q.status === 'DONE'
  );
  const iadLatestForm = iadForms && iadForms[iadForms.length - 1];
  const iadCard = (
    <Paper classes={{ root: classes.paper }}>
      <Typography variant="h6">Inventário de atitude frente à dor</Typography>
      <Typography variant="caption" display="block">
        {`Preenchido em: ${
          iadLatestForm &&
          new Date(iadLatestForm.updated_at).toLocaleDateString('pt-BR')
        }`}
      </Typography>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link
            component="button"
            variant="body2"
            onClick={() => setReportPanel(PatientReportPanelType.IAD)}
          >
            Ver respostas
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );

  const sbstForms = questionaires?.filter(
    (q) => q.type === 'SBST' && q.status === 'DONE'
  );
  const sbstLatestForm = sbstForms && sbstForms[sbstForms.length - 1];
  const sbstResult = sbstLatestForm?.results as PatientSBSTResult;
  const sbstCard = (
    <Paper classes={{ root: classes.paper }}>
      <Typography variant="h6">Start Back Screening Tool (SBST)</Typography>
      <Typography variant="caption">
        {`Preenchido em: ${
          sbstLatestForm &&
          new Date(sbstLatestForm.updated_at).toLocaleDateString('pt-BR')
        }`}
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="left">
            {`Total de pontos: ${sbstResult?.total_points}`}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="left">
            {`Subescala psicossocial: ${sbstResult?.psychosocial_points}`}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="left">
            {`Resultado: ${sbstResult?.result}`}
          </Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link
            component="button"
            variant="body2"
            onClick={() => setReportPanel(PatientReportPanelType.SBST)}
          >
            Ver respostas
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );

  const pseqForms = questionaires?.filter(
    (q) => q.type === 'PSEQ' && q.status === 'DONE'
  );
  const pseqLatestForm = pseqForms && pseqForms[pseqForms.length - 1];
  const pseqResult = pseqLatestForm?.results as PatientBasicResult;
  const pseqCard = (
    <Paper classes={{ root: classes.paper }}>
      <Typography variant="h6">Autoeficácia da dor (PSEQ)</Typography>
      <Typography variant="caption" display="block">
        {`Preenchido em: ${
          pseqLatestForm &&
          new Date(pseqLatestForm.updated_at).toLocaleDateString('pt-BR')
        }`}
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="left">
            {`Total de pontos: ${pseqResult?.score}`}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="left">
            {`Resultado: ${pseqResult?.text}`}
          </Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link
            component="button"
            variant="body2"
            onClick={() => setReportPanel(PatientReportPanelType.PSEQ)}
          >
            Ver respostas
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );

  const womacForms = questionaires?.filter(
    (q) => q.type === 'WOMAC' && q.status === 'DONE'
  );
  const womacLatestForm = womacForms && womacForms[womacForms.length - 1];
  const womacResult = womacLatestForm?.results as PatientWOMACResult;
  const womacCard = (
    <Paper classes={{ root: classes.paper }}>
      <Typography variant="h6">
        Qualidade de vida específico para osteoartrose WOMAC
      </Typography>
      <Typography variant="caption" display="block">
        {`Preenchido em: ${
          womacLatestForm &&
          new Date(womacLatestForm.updated_at).toLocaleDateString('pt-BR')
        }`}
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="left">
            {`Índice funcional: ${womacResult?.function_index}`}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="left">
            {`Índice de dor: ${womacResult?.pain_index}`}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="left">
            {`Índice de rigidez: ${womacResult?.stiffness_index}`}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="left">
            {`Índice total: ${womacResult?.total_index}`}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="left">
            {`Porcentagem total: ${womacResult?.total_percentage}`}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="left">
            {`Coeficiente total: ${womacResult?.total_ratio}`}
          </Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link
            component="button"
            variant="body2"
            onClick={() => setReportPanel(PatientReportPanelType.WOMAC)}
          >
            Ver respostas
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );

  const spadiForms = questionaires?.filter(
    (q) => q.type === 'SPADI' && q.status === 'DONE'
  );
  const spadiLatestForm = spadiForms && spadiForms[spadiForms.length - 1];
  const spadiResult = spadiLatestForm?.results as PatientSPADIResult;
  const spadiCard = (
    <Paper classes={{ root: classes.paper }}>
      <Typography variant="h6">
        Índice de dor e incapacidade no ombro (SPADI)
      </Typography>
      <Typography variant="caption" display="block">
        {`Preenchido em: ${
          spadiLatestForm &&
          new Date(spadiLatestForm.updated_at).toLocaleDateString('pt-BR')
        }`}
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="left">
            {`Escala de Incapacidade: ${spadiResult?.disability.percentage}`}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="left">
            {`Escala de Dor: ${spadiResult?.pain.percentage}`}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="left">
            {`Escala total: ${spadiResult?.total.percentage}`}
          </Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link
            component="button"
            variant="body2"
            onClick={() => setReportPanel(PatientReportPanelType.SPADI)}
          >
            Ver respostas
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );

  const aofasForms = questionaires?.filter(
    (q) => q.type === 'AOFAS' && q.status === 'DONE'
  );
  const aofasLatestForm = aofasForms && aofasForms[aofasForms.length - 1];
  const aofasResult = aofasLatestForm?.results as PatientAOFASResult;
  const aofasCard = (
    <Paper classes={{ root: classes.paper }}>
      <Typography variant="h6">
        Escala AOFAS para tornozelo e retropé
      </Typography>
      <Typography variant="caption" display="block">
        {`Preenchido em: ${
          aofasLatestForm &&
          new Date(aofasLatestForm.updated_at).toLocaleDateString('pt-BR')
        }`}
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="left">
            {`Escala de dor: ${aofasResult?.pain_score}`}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="left">
            {`Escala funcional: ${aofasResult?.function_score}`}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="left">
            {`Escala de alinhamento: ${aofasResult?.alignment_score}`}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="left">
            {`Escala total: ${aofasResult?.total.percentage}`}
          </Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link
            component="button"
            variant="body2"
            onClick={() => setReportPanel(PatientReportPanelType.AOFAS)}
          >
            Ver respostas
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );

  useEffect(() => {
    setTimeout(() => {
      const tickLabelsY = document.querySelectorAll(
        'svg > .axes:first-child > g:nth-child(2) > .Axis-Group.inner:first-child .tickLabel'
      );
      const indexOfLabel50 = Array.from(tickLabelsY).reduce(
        (acc, el, index) => (el.textContent === '50' ? index : acc),
        0
      );
      if (indexOfLabel50) {
        const lineOfLabel50 = document.querySelectorAll(
          'svg > .axes:first-child > g:nth-child(2) > .Axis-Group.inner:first-child .Axis:first-child > .grid .tick line'
        )[indexOfLabel50];
        lineOfLabel50.setAttribute('stroke', 'yellow');
      }
    }, 1000);
  }, []);

  return (
    <Grid container spacing={1} className={classes.root}>
      <Grid item md={9} xs={12}>
        {bpiForms?.length ? bpiCard : null}
        {chartData?.length ? sf36Card : null}
      </Grid>
      <Grid item md={3} xs={12}>
        {epcForms?.length ? epcCard : null}
        {dn4Forms?.length ? dn4Card : null}
        {oswForms?.length ? oswCard : null}
        {hadForms?.length ? hadCard : null}
        {fibromialgiaForms?.length ? fibromialgiaCard : null}
        {iadForms?.length ? iadCard : null}
        {sbstForms?.length ? sbstCard : null}
        {pseqForms?.length ? pseqCard : null}
        {womacForms?.length ? womacCard : null}
        {spadiForms?.length ? spadiCard : null}
        {aofasForms?.length ? aofasCard : null}
      </Grid>
    </Grid>
  );
}

export default PatientSummary;
