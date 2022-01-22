import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { ArrowBack } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

import { PatientFormProps, PatientPanel } from '../../interfaces';
import { UserAuth } from '../../models/UserAuth';
import api from '../../utils/api';

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
    radioSpanLabel: {
      fontSize: '0.75rem',
    },
    radioLabel: {
      marginLeft: '8px',
      marginRight: '8px',
    },
  })
);

const questions = [
  {
    title: 'Qual a intensidade da sua dor para as seguintes atividades?',
    sections: [
      'Caminhando em lugar plano.',
      'Subindo ou descendo escadas.',
      'A noite deitado na cama.',
      'Sentando-se ou deitando-se.',
      'Ficando em pé.',
    ],
  },
  {
    title: '',
    sections: [
      'Qual a intensidade de sua rigidez logo após acordar de manhã?',
      'Qual a intensidade de sua rigidez após de sentar, se deitar ou repousar no decorrer do dia?',
    ],
  },
  {
    title:
      'Qual o grau de dificuldade que você tem ao realizar as seguintes atividades?',
    sections: [
      'Descer escadas.', //1
      'Subir escadas.', //2
      'Levantar-se estando sentada.', //3
      'Ficar em pé.', //4
      'Abaixar-se para pegar algo.', //5
      'Andar no plano.', //6
      'Entrar e sair do carro.', //7
      'Ir fazer compras.', //8
      'Colocar meias.', //9
      'Levantar-se da cama.', //10
      'Tirar as meias.', //11
      'Ficar deitado na cama.', //12
      'Entrar e sair do banho.', //13
      'Se sentar.', //14
      'Sentar e levantar do vaso sanitário.', //15
      'Fazer tarefas domésticas pesadas.', //16
      'Fazer tarefas domésticas leves.', //17
    ],
  },
];

async function postWOMACAnswers(
  auth: UserAuth,
  answers: number[],
  goToQuestionaire: () => void
) {
  api
    .post('api/v1/forms/patient/fill/womac', JSON.stringify({ answers }), {
      headers: {
        Authorization: `Bearer ${auth.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => goToQuestionaire());
}

const getRealIndex = (questionIndex: number, sectionIndex: number) => {
  return questions.reduce((acc, q, i) => {
    if (i < questionIndex) {
      return acc + q.sections.length;
    } else if (i === questionIndex) {
      return acc + sectionIndex;
    }
    return acc;
  }, 0);
};

export default function WOMAC(props: PatientFormProps) {
  const classes = useStyles();
  const [currentPanel, setCurrentPanel] = React.useState(0);
  const [answers, setAnswers] = React.useState(
    new Array(questions.reduce((acc, q) => acc + q.sections.length, 0))
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string,
    questionIndex: number,
    sectionIndex: number
  ): void => {
    const newAnswers = [...answers];
    const questionRealIndex = getRealIndex(questionIndex, sectionIndex);
    newAnswers[questionRealIndex] = Number(value);
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
          <Typography variant="subtitle1">
            Qualidade de vida específico para osteoartrose WOMAC (Western
            Ontario McMaster Universities)
          </Typography>
        </Toolbar>
      </AppBar>
      {currentPanel === 0 && (
        <>
          <div className={classes.title}>
            <Typography variant="h6">Questionário</Typography>
            <Typography variant="h6">
              Qualidade de vida específico para osteoartrose WOMAC (Western
              Ontario McMaster Universities)
            </Typography>
          </div>
          <div className={classes.bodyContent}>
            <Typography variant="body1">
              O WOMAC é um questionário de qualidade de vida tridimensional
              (dor, rigidez articular e atividade física), específico para a
              avaliação de pacientes com osteoartrose. A sua versão para a
              língua portuguesa foi realizada pelo método tradicional e por um
              método simplificado, testado anteriormente com outros instrumentos
              de avaliação de qualidade de vida
            </Typography>
            <Button
              variant="contained"
              className={classes.appBar}
              onClick={() => setCurrentPanel(1)}
            >
              Começar
            </Button>
            <Typography variant="body2" className={classes.referenceInfo}>
              American College of Rheumatology. Western Ontario and McMaster
              Universities Osteoarthritis Index (WOMAC).
              http://www.rheumatology.org/practice/clinical/clinicianresearchers/outcomes-instrumentation/WOMAC.asp.
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
                      <Typography variant="subtitle1">
                        {question.title}
                      </Typography>
                    </Grid>
                    {question.sections.map((section, sIndex) => (
                      <Grid
                        item
                        xs={12}
                        key={`question${qIndex}-section${sIndex}`}
                      >
                        <FormControl component="fieldset">
                          <FormLabel component="legend">{section}</FormLabel>
                          <RadioGroup
                            row
                            aria-label={section}
                            name={`question${qIndex}-section${sIndex}`}
                            onChange={(e, v) =>
                              handleChange(e, v, qIndex, sIndex)
                            }
                          >
                            <FormControlLabel
                              value="0"
                              control={<Radio />}
                              label="Nenhum"
                              checked={
                                answers[getRealIndex(qIndex, sIndex)] === 0
                              }
                              classes={{
                                labelPlacementBottom: classes.radioLabel,
                                label: classes.radioSpanLabel,
                              }}
                              labelPlacement="bottom"
                            />
                            <FormControlLabel
                              value="1"
                              control={<Radio />}
                              label="Pouca"
                              checked={
                                answers[getRealIndex(qIndex, sIndex)] === 1
                              }
                              classes={{
                                labelPlacementBottom: classes.radioLabel,
                                label: classes.radioSpanLabel,
                              }}
                              labelPlacement="bottom"
                            />
                            <FormControlLabel
                              value="2"
                              control={<Radio />}
                              label="Moderada"
                              checked={
                                answers[getRealIndex(qIndex, sIndex)] === 2
                              }
                              classes={{
                                labelPlacementBottom: classes.radioLabel,
                                label: classes.radioSpanLabel,
                              }}
                              labelPlacement="bottom"
                            />
                            <FormControlLabel
                              value="3"
                              control={<Radio />}
                              label="Intensa"
                              checked={
                                answers[getRealIndex(qIndex, sIndex)] === 3
                              }
                              classes={{
                                labelPlacementBottom: classes.radioLabel,
                                label: classes.radioSpanLabel,
                              }}
                              labelPlacement="bottom"
                            />
                            <FormControlLabel
                              value="4"
                              control={<Radio />}
                              label="Muito intensa"
                              checked={
                                answers[getRealIndex(qIndex, sIndex)] === 4
                              }
                              classes={{
                                labelPlacementBottom: classes.radioLabel,
                                label: classes.radioSpanLabel,
                              }}
                              labelPlacement="bottom"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                    ))}
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
                  ? postWOMACAnswers(props.patientAuth, answers, () =>
                      props.setCurrentPanel(PatientPanel.INITIAL)
                    )
                  : setCurrentPanel(currentPanel + 1)
              }
              disabled={questions[currentPanel - 1].sections.some(
                (s, sIndex) =>
                  answers[getRealIndex(currentPanel - 1, sIndex)] === undefined
              )}
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
