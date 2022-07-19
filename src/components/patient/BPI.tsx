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

import { PatientFormProps, PatientPanel } from '../../interfaces';
import { UserAuth } from '../../models/UserAuth';
import BodyMapBPI from './BodyMapBPI';
import _ from 'lodash';
import api from '../../utils/api';

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
    slider: {
      textAlign: 'center',
      color: '#329D9C',
      width: '90%',
      marginLeft: '1rem',
    },
    sliderMakrLabel: {
      fontSize: '0.625rem',
      whiteSpace: 'break-spaces',
    },
    radioLabel: {
      width: '75px',
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
    treatmentItem: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    divider: {
      marginTop: theme.spacing(3),
    },
  })
);

type QuestionType =
  | 'booleans'
  | 'body_pain'
  | 'grades'
  | 'treatments'
  | 'slider'
  | 'percentages';
interface QuestionObject {
  title: string;
  type: QuestionType;
  alternatives: { label: string; value: number }[];
  sections: string[];
}

const questions: QuestionObject[] = [
  {
    title:
      'Durante a vida, a maioria das pessoas apresenta dor de vez em quando (dor de cabeça, dor de dente, etc.).',
    type: 'booleans',
    sections: ['Você teve hoje, dor diferente dessas?'],
    alternatives: [
      { label: 'Sim', value: 1 },
      { label: 'Não', value: 0 },
    ],
  },
  {
    title:
      'Selecione a cor que corresponde a sua dor E depois toque sobre o diagrama nas áreas onde você sente esta intensidade de dor.',
    type: 'body_pain',
    sections: ['(Pode-se marcar quantas áreas do corpo desejar)'],
    alternatives: [],
  },
  {
    title: 'Selecione na escala de 0 a 10 a resposta da pergunta abaixo:',
    type: 'grades',
    sections: [
      'O número que melhor descreve a pior dor  que você sentiu nas últimas 24 horas:',
    ],
    alternatives: [
      { label: 'Sem dor', value: 0 },
      { label: '', value: 1 },
      { label: '', value: 2 },
      { label: '', value: 3 },
      { label: '', value: 4 },
      { label: '', value: 5 },
      { label: '', value: 6 },
      { label: '', value: 7 },
      { label: '', value: 8 },
      { label: '', value: 9 },
      { label: 'Pior dor', value: 10 },
    ],
  },
  {
    title: 'Selecione na escala de 0 a 10 a resposta da pergunta abaixo:',
    type: 'grades',
    sections: [
      'O número que melhor descreve a dor mais fraca que você sentiu nas últimas 24 horas:',
    ],
    alternatives: [
      { label: 'Sem dor', value: 0 },
      { label: '', value: 1 },
      { label: '', value: 2 },
      { label: '', value: 3 },
      { label: '', value: 4 },
      { label: '', value: 5 },
      { label: '', value: 6 },
      { label: '', value: 7 },
      { label: '', value: 8 },
      { label: '', value: 9 },
      { label: 'Pior dor', value: 10 },
    ],
  },
  {
    title: 'Selecione na escala de 0 a 10 a resposta da pergunta abaixo:',
    type: 'grades',
    sections: ['O número que melhor descreve a média da sua dor.'],
    alternatives: [
      { label: 'Sem dor', value: 0 },
      { label: '', value: 1 },
      { label: '', value: 2 },
      { label: '', value: 3 },
      { label: '', value: 4 },
      { label: '', value: 5 },
      { label: '', value: 6 },
      { label: '', value: 7 },
      { label: '', value: 8 },
      { label: '', value: 9 },
      { label: 'Pior dor', value: 10 },
    ],
  },
  {
    title: 'Selecione na escala de 0 a 10 a resposta da pergunta abaixo:',
    type: 'grades',
    sections: [
      'O número que mostra quanta dor você está sentindo agora (neste momento).',
    ],
    alternatives: [
      { label: 'Sem dor', value: 0 },
      { label: '', value: 1 },
      { label: '', value: 2 },
      { label: '', value: 3 },
      { label: '', value: 4 },
      { label: '', value: 5 },
      { label: '', value: 6 },
      { label: '', value: 7 },
      { label: '', value: 8 },
      { label: '', value: 9 },
      { label: 'Pior dor', value: 10 },
    ],
  },
  {
    title: 'Quais tratamentos ou medicações você está recebendo para dor?',
    type: 'treatments',
    sections: [
      'Você deve relatar todos os remédios em uso e outros tratamentos como: fisioterapia, acupuntura e etc… que está realizando atualmente.',
    ],
    alternatives: [],
  },
  {
    title:
      'Marque na escala a porcentagem que demonstra qual a intensidade da melhora proporcionada pelos tratamentos ou medicações que você está usando nas últimas 24 horas?',
    type: 'slider',
    sections: [''],
    alternatives: [
      { label: 'Sem alívio', value: 0 },
      { label: '', value: 50 },
      { label: 'Alívio total', value: 100 },
    ],
  },
  {
    title:
      'Marque na escala de 0 a 10 o número que melhor descreve como, nas últimas 24 horas, a dor interferiu na sua:',
    type: 'percentages',
    sections: [
      'Atividade geral',
      'Humor',
      'Habilidade de caminhar',
      'Trabalho',
      'Relacionamento com outras pessoas',
      'Habilidade para apreciar a vida',
    ],
    alternatives: [
      { label: 'Não interferiu', value: 0 },
      { label: '', value: 1 },
      { label: '', value: 2 },
      { label: '', value: 3 },
      { label: '', value: 4 },
      { label: '', value: 5 },
      { label: '', value: 6 },
      { label: '', value: 7 },
      { label: '', value: 8 },
      { label: '', value: 9 },
      { label: 'Interferiu completamente', value: 10 },
    ],
  },
];

interface Answers {
  booleans: any[];
  body_pain: any[];
  grades: any[];
  treatments: any[];
  slider: any[];
  percentages: any[];
}

async function postBPIAnswers(
  auth: UserAuth,
  answers: Answers,
  goToQuestionaire: () => void
) {
  api
    .post('api/v1/forms/patient/fill/bpi', JSON.stringify({ answers }), {
      headers: {
        Authorization: `Bearer ${auth.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => goToQuestionaire());
}

export default function BPI(props: PatientFormProps) {
  const classes = useStyles();
  const [currentPanel, setCurrentPanel] = React.useState(0);
  const [answers, setAnswers] = React.useState<Answers>({
    booleans: [],
    body_pain: [],
    grades: [0, 0, 0, 0],
    treatments: [{ name: '', started_at: '', frequency: '' }],
    slider: [0],
    percentages: [0, 0, 0, 0, 0, 0],
  });

  const handleChange = (
    value: any,
    type:
      | 'booleans'
      | 'body_pain'
      | 'grades'
      | 'treatments'
      | 'slider'
      | 'percentages',
    index: number
  ): void => {
    setAnswers((s) => {
      const newAnswers = _.cloneDeep(s);
      if (type === 'body_pain') {
        newAnswers[type] = value;
      } else if (newAnswers[type].length > index) {
        newAnswers[type][index] = value;
      } else {
        newAnswers[type].push(value);
      }

      if (_.isEqual(newAnswers, s)) {
        return s;
      }
      return newAnswers;
    });
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
          <Typography variant="subtitle1">Breve Inventário de Dor</Typography>
        </Toolbar>
      </AppBar>
      {currentPanel === 0 && (
        <>
          <div className={classes.title}>
            <Typography variant="h6">Questionário</Typography>
            <Typography variant="h6">Breve Inventário de Dor</Typography>
          </div>
          <div className={classes.bodyContent}>
            <Typography variant="body1">
              O Breve Inventário de Dor auxilia a identificar os locais,
              características e intensidade da dor, além dos tratamentos em uso
              e o impacto da dor em alguns aspectos da sua vida.
            </Typography>
            <Button
              variant="contained"
              className={classes.appBar}
              onClick={() => setCurrentPanel(1)}
            >
              Começar
            </Button>
            <Typography variant="body2" className={classes.referenceInfo}>
              Ferreira KA, Teixeira MJ, Mendonza TR, Cleeland CS. Validation of
              Brief Pain Inventory to Brazilian patients with pain. Support Care
              Cancer. 2010 Mar 10. [Epud ahead of print].
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
                          {question.type === 'booleans' && (
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
                                  control={<Radio />}
                                  classes={{
                                    labelPlacementBottom: classes.radioLabel,
                                    label: classes.radioSpanLabel,
                                  }}
                                  label={alternative.label}
                                  labelPlacement="bottom"
                                  checked={
                                    answers[question.type][sIndex] ===
                                    alternative.value
                                  }
                                />
                              ))}
                            </RadioGroup>
                          )}
                          {question.type === 'body_pain' && (
                            <BodyMapBPI
                              disabledBodyMapClick={false}
                              markBodyPartsForBPI={(values) =>
                                handleChange(
                                  values.reduce(
                                    (
                                      acc: {
                                        area: number;
                                        pain_level: number;
                                      }[],
                                      value,
                                      arrayIndex
                                    ) =>
                                      value
                                        ? [
                                            ...acc,
                                            {
                                              area: arrayIndex + 1,
                                              pain_level: value,
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
                                new Array(53).fill(0)
                              )}
                            />
                          )}
                          {question.type === 'grades' && (
                            <Slider
                              defaultValue={0}
                              classes={{
                                root: classes.slider,
                                markLabel: classes.sliderMakrLabel,
                              }}
                              step={1}
                              valueLabelDisplay="auto"
                              marks={question.alternatives}
                              min={0}
                              max={10}
                              onChange={(e, v) => {
                                handleChange(v, question.type, qIndex - 2);
                              }}
                            />
                          )}
                          {question.type === 'treatments' && (
                            <>
                              {answers.treatments.map(
                                (treatment, treatIndex) => (
                                  <>
                                    <div className={classes.treatmentItem}>
                                      <TextField
                                        id={`name_${treatIndex}`}
                                        label="Nome do tratamento"
                                        value={treatment?.name}
                                        onChange={(e) =>
                                          handleChange(
                                            {
                                              ...treatment,
                                              name: e.target.value,
                                            },
                                            question.type,
                                            treatIndex
                                          )
                                        }
                                        fullWidth
                                      />
                                    </div>
                                    <div>
                                      <TextField
                                        id={`started_at_${treatIndex}`}
                                        label="Quando iniciou?"
                                        value={treatment?.started_at}
                                        onChange={(e) =>
                                          handleChange(
                                            {
                                              ...treatment,
                                              started_at: e.target.value,
                                            },
                                            question.type,
                                            treatIndex
                                          )
                                        }
                                        fullWidth
                                      />
                                    </div>
                                    <div>
                                      <TextField
                                        id={`frequency_${treatIndex}`}
                                        label="Qual a dose/frequência do tratamento?"
                                        value={treatment?.frequency}
                                        onChange={(e) =>
                                          handleChange(
                                            {
                                              ...treatment,
                                              frequency: e.target.value,
                                            },
                                            question.type,
                                            treatIndex
                                          )
                                        }
                                        fullWidth
                                      />
                                    </div>
                                    <Divider
                                      className={classes.divider}
                                      variant="middle"
                                    />
                                  </>
                                )
                              )}

                              <Button
                                variant="text"
                                className={classes.mainColor}
                                onClick={() =>
                                  setAnswers((s) => ({
                                    ...s,
                                    treatments: [
                                      ...s.treatments,
                                      {
                                        name: '',
                                        started_at: '',
                                        frequency: '',
                                      },
                                    ],
                                  }))
                                }
                              >
                                Adicionar mais tratamentos
                              </Button>
                            </>
                          )}
                          {question.type === 'slider' && (
                            <Slider
                              defaultValue={0}
                              classes={{
                                root: classes.slider,
                                markLabel: classes.sliderMakrLabel,
                              }}
                              step={1}
                              valueLabelDisplay="auto"
                              marks={question.alternatives}
                              min={0}
                              max={100}
                              onChange={(e, v) => {
                                handleChange(v, question.type, sIndex);
                              }}
                            />
                          )}
                          {question.type === 'percentages' && (
                            <Slider
                              defaultValue={0}
                              classes={{
                                root: classes.slider,
                                markLabel: classes.sliderMakrLabel,
                              }}
                              step={1}
                              valueLabelDisplay="auto"
                              marks={question.alternatives}
                              min={0}
                              max={10}
                              onChange={(e, v) => {
                                handleChange(v, question.type, sIndex);
                              }}
                            />
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
                  ? postBPIAnswers(props.patientAuth, answers, () =>
                      props.setCurrentPanel(PatientPanel.INITIAL)
                    )
                  : setCurrentPanel(currentPanel + 1)
              }
              disabled={questions[currentPanel - 1].sections.some(
                (s, sIndex) => {
                  if (questions[currentPanel - 1].type === 'grades') {
                    return false;
                  }
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
