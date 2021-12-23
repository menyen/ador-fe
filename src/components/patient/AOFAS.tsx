import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { ArrowBack } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Radio from '@material-ui/core/Radio';

import { PatientFormProps, PatientPanel } from '../../interfaces';
import { baseUrl } from '../../utils/loggedUser';
import { UserAuth } from '../../models/UserAuth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainColor: {
      color: '#205072',
    },
    appBar: {
      backgroundColor: '#205072',
      color: 'white',
    },
    title: {
      color: '#205072',
      margin: theme.spacing(5, 2, 2),
    },
    bodyContent: {
      '& > *': {
        textAlign: 'left',
        margin: theme.spacing(6, 3),
      },
    },
    form: {
      margin: theme.spacing(2),
      textAlign: 'left',
    },
    formItem: {
      margin: theme.spacing(3, 0, 6),
    },
    formLabel: { fontSize: '0.875rem', margin: '5px 0' },
    footer: {
      textAlign: 'center',
      '& button': {
        display: 'block',
        margin: '1rem auto',
      },
    },
    referenceInfo: {
      fontSize: '0.75rem',
      color: grey[500],
    },
    progressBarRoot: {
      margin: '15px 0',
    },
    progressBarLine: {
      backgroundColor: '#205072',
    },
  })
);

const questions = [
  {
    title: 'Dor',
    alternatives: [
      { label: 'Nenhuma', value: 1 },
      { label: 'Leve, ocasional', value: 2 },
      { label: 'Moderada, diária', value: 3 },
      { label: 'Intensa, quase sempre presente', value: 4 },
    ],
  },
  {
    title:
      'Funcional: Limitação nas atividades, necessidade de suporte',
    alternatives: [
      { label: 'Sem limitação, sem suporte', value: 1 },
      { label: 'Sem limitação nas atividades diárias, limitação nas atividades recreacionais, sem suporte', value: 2 },
      { label: 'Limitação nas atividades diárias e recreacionais, bengala', value: 3 },
      { label: 'Limitação intensa nas atividades diárias e recreacionais, andador, muletas, cadeira-de-rodas, órtese (tornozeleira, imobilizador de tornozelo)', value: 4 },
    ],
  },
  {
    title:
      'Funcional: Distância máxima de caminhada, quarteirões',
    alternatives: [
      { label: 'Mais que 6', value: 1 },
      { label: 'De 4 a 6', value: 2 },
      { label: 'De 1 a 3', value: 3 },
      { label: 'Menos que 1', value: 4 },
    ],
  },
  {
    title: 'Funcional: Superfícies de caminhada',
    alternatives: [
      { label: 'Sem dificuldade em qualquer superfície', value: 1 },
      { label: 'Alguma dificuldade em terrenos irregulares, escadas, inclinações e ladeiras', value: 2 },
      { label: 'Dificuldade intensa em terrenos irregulares, escadas, inclinações e ladeiras', value: 3 },
    ],
  },
  {
    title: 'Funcional: Anormalidade na marcha',
    alternatives: [
      { label: 'Nenhuma, leve', value: 1 },
      { label: 'Evidente', value: 2 },
      { label: 'Acentuada', value: 3 },
    ],
  },
  {
    title: 'Funcional: Mobilidade sagital (flexão + extensão)',
    alternatives: [
      { label: 'Normal ou levemente restrito (30° ou mais)', value: 1 },
      { label: 'Restrição moderada (15° - 29°)', value: 2 },
      { label: 'Restrição intensa (menor que 15°)', value: 3 },
    ],
  },
  {
    title: 'Funcional: Mobilidade do Retro-Pé (inversão + eversão)',
    alternatives: [
      { label: 'Normal ou levemente restrito (75 - 100% do normal)', value: 1 },
      { label: 'Restrição moderada (25 - 74% do normal)', value: 2 },
      { label: 'Restrição intensa (menos que 25% dor normal)', value: 3 },
    ],
  },
  {
    title: 'Funcional: Estabilidade do tornozelo e retro-pé (anteroposterior, varo-valgo)',
    alternatives: [
      { label: 'Estável', value: 1 },
      { label: 'Instável', value: 2 },
    ],
  },
  {
    title:
      'Alinhamento',
    alternatives: [
      { label: 'Bom, pé plantígrado, ante-pé e retro-pé bem alinhado', value: 1 },
      { label: 'Regular, pé plantígrado, algum grau de desalinhamento do tornozelo e retro-pé, sem sintomas', value: 2 },
      { label: 'Ruim, pé não plantígrado, desalinhamento intenso e sintomático', value: 3 },
    ],
  },
];

async function postAOFASAnswers(
  auth: UserAuth,
  answers: number[],
  goToQuestionaire: () => void
) {
  const response = await fetch(`${baseUrl}/api/v1/forms/patient/fill/aofas`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${auth.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ answers }),
  });

  if (response.ok) {
    goToQuestionaire();
  }
}

export default function AOFAS(props: PatientFormProps) {
  const classes = useStyles();
  const [currentPanel, setCurrentPanel] = React.useState(0);
  const [answers, setAnswers] = React.useState(new Array(questions.length));

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string,
    questionIndex: number
  ): void => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = Number(value);
    setAnswers(newAnswers);
  };

  return (
    <>
      <AppBar position="static" classes={{ colorPrimary: classes.appBar }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => props.setCurrentPanel(PatientPanel.INITIAL)}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="subtitle1">Questionário AOFAS</Typography>
        </Toolbar>
      </AppBar>
      {currentPanel === 0 && (
        <>
          <div className={classes.title}>
            <Typography variant="h6">Questionário</Typography>
            <Typography variant="h6">
              Escala AOFAS para tornozelo e retropé
            </Typography>
          </div>
          <div className={classes.bodyContent}>
            <Typography variant="body1">
              Em 1994, um comitê da American Orthopaedic Foot and Ankle Society (AOFAS) desenvolveu um sistema de avaliação para as diferentes regiões anatômicas do pé, dando origem a quatro escalas que geram uma pontuação
            </Typography>
            <Button
              variant="contained"
              className={classes.appBar}
              onClick={() => setCurrentPanel(1)}
            >
              Começar
            </Button>
            <Typography variant="body2" className={classes.referenceInfo}>
              Tradução, adaptação cultural e validação do "American Orthopaedic Foot and Ankle Society (AOFAS) ankle-hindfoot scale"
            </Typography>
          </div>
        </>
      )}
      {currentPanel > 0 && (
        <div className={classes.form}>
          <LinearProgress
            variant="determinate"
            value={(currentPanel / questions.length) * 100}
            classes={{
              root: classes.progressBarRoot,
              bar: classes.progressBarLine,
            }}
          />
          {questions.map(
            (question, qIndex) =>
              currentPanel - 1 === qIndex && (
                <div key={`question${qIndex}`}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Typography variant="body1">{question.title}</Typography>
                    </Grid>
                    <FormControl component="fieldset">
                      <RadioGroup
                        onChange={(e, v) => handleChange(e, v, qIndex)}
                        aria-label={question.title}
                        name={`question${qIndex}`}
                      >
                        {question.alternatives.map((alternative) => {
                          return (
                            <FormControlLabel
                              value={alternative.value}
                              key={alternative.value}
                              control={<Radio />}
                              label={alternative.label}
                              checked={answers[qIndex] === alternative.value}
                              classes={{
                                label: classes.formLabel,
                              }}
                            />
                          );
                        })}
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </div>
              )
          )}

          <div className={classes.footer}>
            <Button
              variant="contained"
              className={classes.appBar}
              onClick={() =>
                currentPanel === questions.length
                  ? postAOFASAnswers(props.patientAuth, answers, () =>
                      props.setCurrentPanel(PatientPanel.INITIAL)
                    )
                  : setCurrentPanel(currentPanel + 1)
              }
              disabled={answers[currentPanel - 1] === undefined}
            >
              {currentPanel === questions.length ? 'Finalizar' : 'Próximo'}
            </Button>
            <Button
              variant="text"
              className={classes.mainColor}
              onClick={() => setCurrentPanel(currentPanel - 1)}
            >
              Anterior
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
