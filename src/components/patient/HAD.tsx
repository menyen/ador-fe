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
  withStyles,
} from '@material-ui/core/styles';
import { green, grey, orange, red, yellow } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import clsx from 'clsx';

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
    alternativeGreen: {
      color: green[700],
    },
    alternativeYellow: {
      color: yellow[700],
    },
    alternativeOrange: {
      color: orange[700],
    },
    alternativeRed: {
      color: red[700],
    },
  })
);

const GreenRadio = withStyles({
  root: {
    color: green[600],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

const YellowRadio = withStyles({
  root: {
    color: yellow[600],
    '&$checked': {
      color: yellow[600],
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

const OrangeRadio = withStyles({
  root: {
    color: orange[600],
    '&$checked': {
      color: orange[600],
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

const RedRadio = withStyles({
  root: {
    color: red[600],
    '&$checked': {
      color: red[600],
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

const getRadioColorByValue = (value: number) => {
  switch (value) {
    case 0:
      return GreenRadio;
    case 1:
      return YellowRadio;
    case 2:
      return OrangeRadio;
    case 3:
      return RedRadio;
    default:
      return Radio;
  }
};

const questions = [
  {
    title: 'Eu me sinto tenso ou contraído',
    alternatives: [
      { label: 'A maior parte do tempo', value: 3 },
      { label: 'Boa parte do tempo', value: 2 },
      { label: 'De vez em quando', value: 1 },
      { label: 'Nunca', value: 0 },
    ],
  },
  {
    title:
      'Eu ainda sinto gosto (satisfação) pelas mesmas coisas de que costumava gostar',
    alternatives: [
      { label: 'Sim, do mesmo jeito que antes', value: 0 },
      { label: 'Não tanto quanto antes', value: 1 },
      { label: 'Só um pouco', value: 2 },
      { label: 'Já não sinto mais prazer em nada', value: 3 },
    ],
  },
  {
    title:
      'Eu sinto um espécie de medo, como se alguma coisa ruim fosse acontecer',
    alternatives: [
      { label: 'Sim, de um jeito muito forte', value: 3 },
      { label: 'Sim, mas não tão forte', value: 2 },
      { label: 'Um pouco, mas isso não me preocupa', value: 1 },
      { label: 'Não sinto nada disso', value: 0 },
    ],
  },
  {
    title: 'Dou risada e me divirto quando vejo coisas engraçadas',
    alternatives: [
      { label: 'Sim, do mesmo jeito que antes', value: 0 },
      { label: 'Atualmente u pouco menos', value: 1 },
      { label: 'Atualmente bem menos', value: 2 },
      { label: 'Não consigo mais', value: 3 },
    ],
  },
  {
    title: 'Estou com a cabeça cheia de preocupações',
    alternatives: [
      { label: 'A maior parte do tempo', value: 3 },
      { label: 'Boa parte do tempo', value: 2 },
      { label: 'De vez em quando', value: 1 },
      { label: 'Raramente', value: 0 },
    ],
  },
  {
    title: 'Eu me sinto alegre',
    alternatives: [
      { label: 'A maior parte do tempo', value: 0 },
      { label: 'Muitas vezes', value: 1 },
      { label: 'Poucas vezes', value: 2 },
      { label: 'Nunca', value: 3 },
    ],
  },
  {
    title: 'Consigo ficar sentado á vontade e me sentir relaxado',
    alternatives: [
      { label: 'Nunca', value: 3 },
      { label: 'Poucas vezes', value: 2 },
      { label: 'Muitas vezes', value: 1 },
      { label: 'Sim, quase sempre', value: 0 },
    ],
  },
  {
    title: 'Estou lento (lerdo) para pensar e fazer as coisas',
    alternatives: [
      { label: 'Nunca', value: 0 },
      { label: 'De vez em quando', value: 1 },
      { label: 'Muitas vezes', value: 2 },
      { label: 'Quase sempre', value: 3 },
    ],
  },
  {
    title:
      'Tenho uma sensação ruim de medo (como um frio na espinha ou um aperto no estômago)',
    alternatives: [
      { label: 'Quase sempre', value: 3 },
      { label: 'Muitas vezes', value: 2 },
      { label: 'De vez em quando', value: 1 },
      { label: 'Nunca', value: 0 },
    ],
  },
  {
    title: 'Eu perdi o interesse em cuidar da minha aparência',
    alternatives: [
      { label: 'Cuido-me do mesmo jeito que antes', value: 0 },
      { label: 'Talvez não tanto quanto antes', value: 1 },
      { label: 'Não estou mais me cuidando como eu deveria', value: 2 },
      { label: 'Completamente', value: 3 },
    ],
  },
  {
    title:
      'Eu me sinto inquieto, como se eu não pudesse ficar parado em nenhum lugar',
    alternatives: [
      { label: 'Sim, demais', value: 3 },
      { label: 'Bastante', value: 2 },
      { label: 'Um pouco', value: 1 },
      { label: 'Não me sinto assim', value: 0 },
    ],
  },
  {
    title: 'Fico esperando animado as coisas boas que estão por vir',
    alternatives: [
      { label: 'Do mesmo jeito que antes', value: 0 },
      { label: 'Um pouco menos que antes', value: 1 },
      { label: 'Bem menos do que antes', value: 2 },
      { label: 'Quase nunca', value: 3 },
    ],
  },
  {
    title: 'De repente, tenho a sensação de entrar em pânico',
    alternatives: [
      { label: 'A quase todo tempo', value: 3 },
      { label: 'Várias vezes', value: 2 },
      { label: 'De vez em quando', value: 1 },
      { label: 'Não sinto isso', value: 0 },
    ],
  },
  {
    title:
      'Consigo sentir prazer ao assistir a um bom programa de TV, de rádio ou quando leio alguma coisa',
    alternatives: [
      { label: 'Quase sempre', value: 0 },
      { label: 'Várias vezes', value: 1 },
      { label: 'Poucas vezes', value: 2 },
      { label: 'Quase nunca', value: 3 },
    ],
  },
];

async function postHADAnswers(
  auth: UserAuth,
  answers: number[],
  goToQuestionaire: () => void
) {
  api
    .post('api/v1/forms/patient/fill/had', JSON.stringify({ answers }), {
      headers: {
        Authorization: `Bearer ${auth.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => goToQuestionaire());
}

export default function HAD(props: PatientFormProps) {
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
          <Typography variant="subtitle1">Questionário HAD</Typography>
        </Toolbar>
      </AppBar>
      {currentPanel === 0 && (
        <>
          <div className={classes.title}>
            <Typography variant="h6">Questionário</Typography>
            <Typography variant="h6">Ansiedade e Depressão (HAD)</Typography>
          </div>
          <div className={classes.bodyContent}>
            <Typography variant="body1">
              É comum em decorrência da dor, sentir desamino, tristeza, falta de
              motivação ou qualquer outra alteração de humor.
            </Typography>
            <Typography variant="body1">
              {' '}
              Essa avaliação poderá colaborar para identificar algum desses
              sinais que são frequentes na dor crônica.
            </Typography>
            <Button
              variant="contained"
              className={classes.appBar}
              onClick={() => setCurrentPanel(1)}
            >
              Começar
            </Button>
            <Typography variant="body2" className={classes.referenceInfo}>
              Botega NJ, Bio MR, Zomignani MA et al - Transtornos de humor em
              enfermarias de clínica médica e validação de escala de medida
              (HAD) de ansiedade e depressão. Rev Saúde Pública,1995;29:355-363
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
          <div>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="body1">
                  Leia as frases a seguir e selecione a resposta que melhor
                  corresponde como você tem se sentido na última semana.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" className={classes.referenceInfo}>
                  (Não é preciso ficar pensando muito em cada questão. Vale mais
                  a sua resposta espontânea.)
                </Typography>
              </Grid>
            </Grid>
          </div>
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
                          const CustomRadio = getRadioColorByValue(
                            alternative.value
                          );
                          return (
                            <FormControlLabel
                              value={alternative.value}
                              key={alternative.value}
                              control={<CustomRadio />}
                              label={alternative.label}
                              checked={answers[qIndex] === alternative.value}
                              classes={{
                                label: clsx(classes.formLabel, {
                                  [classes.alternativeGreen]:
                                    alternative.value === 0,
                                  [classes.alternativeYellow]:
                                    alternative.value === 1,
                                  [classes.alternativeOrange]:
                                    alternative.value === 2,
                                  [classes.alternativeRed]:
                                    alternative.value === 3,
                                }),
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
                  ? postHADAnswers(props.patientAuth, answers, () =>
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
