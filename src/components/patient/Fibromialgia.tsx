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
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import BodyMapFibromialgia from './BodyMapFibromialgia';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';

import { PatientFormProps, PatientPanel } from '../../interfaces';
import { baseUrl } from '../../utils/loggedUser';
import { UserAuth } from '../../models/UserAuth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainColor: {
      color: '#329D9C',
    },
    appBar: {
      backgroundColor: '#329D9C',
      color: 'white',
    },
    title: {
      color: '#329D9C',
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
      backgroundColor: '#329D9C',
    },
    section: {
      margin: '12px 0',
    },
    radioLabel: {
      width: '50px',
      textAlign: 'center',
    },
    radioSpanLabel: {
      fontSize: '0.75rem',
    },
    radioGroup: {
      justifyContent: 'center',
    },
    formControl: {
      width: '100%',
    },
  })
);

type QuestionType = 'body_pain' | 'idg' | 'ess' | 'booleans';
interface QuestionObject {
  title: string;
  type: QuestionType;
  alternatives: { label: string; value: number }[];
  sections: string[];
}

const questions: QuestionObject[] = [
  {
    title: '',
    type: 'body_pain',
    sections: [
      'Selecione a região que você teve dor ou sensibilidade nos últimos 7 dias nas áreas mostradas abaixo.',
    ],
    alternatives: [],
  },
  {
    title: '',
    type: 'idg',
    sections: ['Marque abaixo cada área onde você teve dor ou sensibilidade.'],
    alternatives: [
      { label: 'Cinta de ombro esquerda', value: 0 },
      { label: 'Cinta de ombro direita', value: 1 },
      { label: 'Braço superior esquerdo', value: 2 },
      { label: 'Braço direito', value: 3 },
      { label: 'Braço inferior esquerdo', value: 4 },
      { label: 'Braço inferior direito', value: 5 },
      { label: 'Quadril (nádega), esquerda', value: 6 },
      { label: 'Quadril (nádega), direita', value: 7 },
      { label: 'Perna superior esquerda', value: 8 },
      { label: 'Perna superior, direita', value: 9 },
      { label: 'Perna inferior, esquerda', value: 10 },
      { label: 'Perna inferior, direita', value: 11 },
      { label: 'Mandíbula, esquerda', value: 12 },
      { label: 'Mandíbula, direita', value: 13 },
      { label: 'Peito', value: 14 },
      { label: 'Abdômen', value: 15 },
      { label: 'Pescoço', value: 16 },
      { label: 'Parte superior das costas', value: 17 },
      { label: 'Parte inferior das costas', value: 18 },
      { label: 'Nenhuma dessas áreas', value: 19 },
    ],
  },
  {
    title:
      'Para cada sintoma listado, use a escala para indicar a gravidade do sintoma por 7 dias.',
    type: 'ess',
    sections: [
      'Fadiga',
      'Pensando ou lembrando do problema',
      'Levantar-se cansado (não satisfeito)',
    ],
    alternatives: [
      { label: 'Sem problemas', value: 1 },
      { label: 'Problema leve', value: 2 },
      { label: 'Problema moderado', value: 3 },
      { label: 'Problema sério', value: 4 },
    ],
  },
  {
    title:
      'Durante os últimos 6 meses, você teve algum dos seguintes sintomas?',
    type: 'booleans',
    sections: ['Fadiga', 'Depressão', 'Dor de cabeça'],
    alternatives: [
      { label: 'Sim', value: 1 },
      { label: 'Não', value: 0 },
    ],
  },
  {
    title: '',
    type: 'booleans',
    sections: [
      'Os sintomas são as questões 2 e 3 e a dor generalizada está presente em um nível semelhante por pelo menos 3 meses?',
    ],
    alternatives: [
      { label: 'Sim', value: 1 },
      { label: 'Não', value: 0 },
    ],
  },
  {
    title: '',
    type: 'booleans',
    sections: ['Você tem um distúrbio que, de outra forma, explicaria a dor?'],
    alternatives: [
      { label: 'Sim', value: 1 },
      { label: 'Não', value: 0 },
    ],
  },
];

interface Answers {
  body_pain: any[];
  idg: any[];
  ess: any[];
  booleans: any[];
}

async function postFibromialgiaAnswers(
  auth: UserAuth,
  answers: Answers,
  goToQuestionaire: () => void
) {
  const response = await fetch(
    `${baseUrl}/api/v1/forms/patient/fill/fibromialgia`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${auth.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answers }),
    }
  );

  if (response.ok) {
    goToQuestionaire();
  }
}

const getBooleansRealIndex = (questionIndex: number, sectionIndex: number) => {
  const booleansQuestions = questions.filter((q) => q.type === 'booleans');
  return booleansQuestions.reduce((acc, q, i) => {
    if (i < questionIndex - 3) {
      return acc + q.sections.length;
    } else if (i === questionIndex - 3) {
      return acc + sectionIndex;
    }
    return acc;
  }, 0);
};

export default function Fibromialgia(props: PatientFormProps) {
  const classes = useStyles();
  const [currentPanel, setCurrentPanel] = React.useState(0);
  const [answers, setAnswers] = React.useState<Answers>({
    body_pain: [],
    idg: new Array(20).fill(0),
    ess: new Array(3),
    booleans: new Array(5),
  });

  const handleChange = (
    value: any,
    type: QuestionType,
    index: number
  ): void => {
    const newAnswers = { ...answers };
    if (type === 'body_pain') {
      newAnswers[type] = value;
    } else if (newAnswers[type].length > index) {
      newAnswers[type][index] = value;
    } else {
      newAnswers[type].push(value);
    }
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
            Índice de Dor da Fibromialgia
          </Typography>
        </Toolbar>
      </AppBar>
      {currentPanel === 0 && (
        <>
          <div className={classes.title}>
            <Typography variant="h6">Questionário</Typography>
            <Typography variant="h6">Índice de Dor da Fibromialgia</Typography>
          </div>
          <div className={classes.bodyContent}>
            <Typography variant="body1">
              O Índice de Dor Generalizada é usado para que possa colaborar com
              o diagnóstico clinico de algumas patologias.
            </Typography>
            <Button
              variant="contained"
              className={classes.appBar}
              onClick={() => setCurrentPanel(1)}
            >
              Começar
            </Button>
            <Typography variant="body2" className={classes.referenceInfo}>
              Wolfe F, Clauw DJ, Fitzcharles MA, Goldenberg DL, Katz RS, Mease
              P, et al. The American College of Rheumatology preliminary
              diagnostic criteria for fibromyalgia and measurement of symptom
              severity. Arthritis Care Res(Hoboken). 2010;62:600-10.
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
                        className={classes.section}
                      >
                        <FormControl
                          component="fieldset"
                          className={classes.formControl}
                        >
                          <FormLabel component="legend">{section}</FormLabel>

                          {question.type === 'body_pain' && (
                            <BodyMapFibromialgia
                              disabledBodyMapClick={false}
                              markBodyParts={(values) =>
                                handleChange(
                                  values.reduce(
                                    (
                                      acc: {
                                        area: number;
                                        pain_flag: number;
                                      }[],
                                      value,
                                      arrayIndex
                                    ) =>
                                      value
                                        ? [
                                            ...acc,
                                            {
                                              area: arrayIndex + 1,
                                              pain_flag: value,
                                            },
                                          ]
                                        : acc,
                                    []
                                  ),
                                  question.type,
                                  sIndex
                                )
                              }
                              preSelectedValues={answers.body_pain.reduce(
                                (acc, body) => {
                                  acc[body.area - 1] = body.pain_level;
                                  return acc;
                                },
                                new Array(19).fill(0)
                              )}
                            />
                          )}
                          {question.type === 'idg' && (
                            <FormControl component="fieldset">
                              <FormGroup>
                                {question.alternatives.map(
                                  (alternative, aIndex) => (
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={!!answers.idg[aIndex]}
                                          onChange={(event) =>
                                            handleChange(
                                              Number(event.target.checked),
                                              question.type,
                                              aIndex
                                            )
                                          }
                                        />
                                      }
                                      label={alternative.label}
                                    />
                                  )
                                )}
                              </FormGroup>
                            </FormControl>
                          )}
                          {question.type === 'ess' && (
                            <RadioGroup
                              row
                              aria-label={section}
                              name={`question${qIndex}-section${sIndex}`}
                              onChange={(e, v) =>
                                handleChange(Number(v), question.type, sIndex)
                              }
                              classes={{ row: classes.radioGroup }}
                            >
                              {question.alternatives.map((alternative) => (
                                <FormControlLabel
                                  value={alternative.value}
                                  key={alternative.value}
                                  control={<Radio />}
                                  classes={{
                                    labelPlacementBottom: classes.radioLabel,
                                  }}
                                  label={
                                    <>
                                      <Typography
                                        paragraph
                                        className={classes.radioSpanLabel}
                                      >
                                        {alternative.value}
                                      </Typography>
                                      <Typography
                                        paragraph
                                        className={classes.radioSpanLabel}
                                      >
                                        {alternative.label}
                                      </Typography>
                                    </>
                                  }
                                  labelPlacement="bottom"
                                  checked={
                                    answers[question.type][sIndex] ===
                                    alternative.value
                                  }
                                />
                              ))}
                            </RadioGroup>
                          )}
                          {question.type === 'booleans' && (
                            <RadioGroup
                              row
                              aria-label={section}
                              name={`question${qIndex}-section${sIndex}`}
                              onChange={(e, v) =>
                                handleChange(
                                  Number(v),
                                  question.type,
                                  getBooleansRealIndex(qIndex, sIndex)
                                )
                              }
                              classes={{ row: classes.radioGroup }}
                            >
                              {question.alternatives.map((alternative) => (
                                <FormControlLabel
                                  value={alternative.value}
                                  key={alternative.value}
                                  control={<Radio />}
                                  classes={{
                                    labelPlacementBottom: classes.radioLabel,
                                  }}
                                  label={alternative.label}
                                  labelPlacement="bottom"
                                  checked={
                                    answers[question.type][
                                      getBooleansRealIndex(qIndex, sIndex)
                                    ] === alternative.value
                                  }
                                />
                              ))}
                            </RadioGroup>
                          )}
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
                  ? postFibromialgiaAnswers(props.patientAuth, answers, () =>
                      props.setCurrentPanel(PatientPanel.INITIAL)
                    )
                  : setCurrentPanel(currentPanel + 1)
              }
              disabled={questions[currentPanel - 1].sections.some(
                (s, sIndex) => {
                  return (
                    answers[questions[currentPanel - 1].type].length <=
                      sIndex ||
                    [undefined, null].includes(
                      answers[questions[currentPanel - 1].type][sIndex]
                    )
                  );
                }
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
