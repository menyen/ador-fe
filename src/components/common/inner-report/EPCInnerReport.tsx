import { useMemo } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

import { PatientBasicResult } from '../../../models/PatientForm';
import { InnerReportProps } from '../../../interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '32px',
    },
    paper: {
      padding: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
    EPCFormItem: {
      margin: theme.spacing(3, 0, 6),
    },
    EPCSlider: {
      textAlign: 'center',
      color: '#329D63',
      width: '80%',
      marginLeft: '1rem',
    },
    ECPSliderLabel: {
      fontSize: '0.75rem',
    },
    sliderSubLabel: {
      whiteSpace: 'break-spaces',
      width: '50px',
      fontSize: '0.75rem',
      lineHeight: 1,
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
  })
);

function EPCInnerReport({ selectedForm }: InnerReportProps) {
  const classes = useStyles();

  const { answers, updated_at, scoreEPC, textEPC } = useMemo(() => {
    const { answers, results, updated_at } = selectedForm;
    const { score, text } = results as PatientBasicResult;
    return { answers, updated_at, scoreEPC: score || 0, textEPC: text };
  }, [selectedForm]);

  const questions = [
    'Não posso mais suportar esta dor.',
    'Não importa o que fizer minhas dores não mudarão.',
    'Preciso tomar remédios para dor.',
    'Isso nunca vai acabar.',
    'Sou um caso sem esperança.',
    'Quando ficarei pior novamente?',
    'Essa dor esta me matando.',
    'Eu não consigo mais continuar.',
    'Essa dor esta me deixando maluco.',
  ];
  const marks = [
    {
      value: 0,
      label: (
        <>
          <Typography>0</Typography>
          <Typography className={classes.sliderSubLabel}>
            Quase nunca
          </Typography>
        </>
      ),
    },
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    {
      value: 5,
      label: (
        <>
          <Typography>5</Typography>
          <Typography className={classes.sliderSubLabel}>
            Quase sempre
          </Typography>
        </>
      ),
    },
  ];

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} lg={9}>
        <Paper classes={{ root: classes.paper }}>
          <Typography variant="h6">
            Escala de pensamento catastrófico
          </Typography>
          <Typography variant="caption" display="block">
            {`Preenchido em: ${new Date(updated_at).toLocaleDateString(
              'pt-BR'
            )}`}
          </Typography>
          <Grid container spacing={1}>
            {questions.map((question, index) => (
              <Grid item xs={12} sm={6} key={`question-${index}`}>
                <div className={classes.EPCFormItem} key={`question_${index}`}>
                  <Typography
                    id={`question_${index}`}
                    className={classes.ECPSliderLabel}
                    gutterBottom
                  >
                    {`${index + 1}. ${question}`}
                  </Typography>
                  <Slider
                    aria-labelledby={`question_${index}`}
                    value={answers[index]}
                    className={classes.EPCSlider}
                    step={1}
                    valueLabelDisplay="auto"
                    marks={marks}
                    min={0}
                    max={5}
                    disabled
                  />
                </div>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} lg={3}>
        <Paper classes={{ root: classes.paper }}>
          <Typography variant="h6">Resultado</Typography>
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
              <Typography
                variant="subtitle1"
                component="div"
                color="textSecondary"
              >
                {scoreEPC}
              </Typography>
            </Box>
          </Box>
          <Typography variant="subtitle1">{textEPC}</Typography>
        </Paper>
        <Paper classes={{ root: classes.paper }}>
          <Typography variant="h6">Referência</Typography>
          <Typography variant="body1" align="left">
            {'0 < 3.8 - Negativo'}
          </Typography>
          <Typography variant="body1" align="left">
            {'≥ 3.8 - Positivo'}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default EPCInnerReport;
