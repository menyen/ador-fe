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
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

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
    slider: {
      textAlign: 'center',
      color: '#7A3FE1',
      width: '90%',
      marginLeft: '1rem',
    },
    sliderMakrLabel: {
      fontSize: '0.625rem',
    },
    sliderSubLabel: {
      whiteSpace: 'break-spaces',
      width: '50px',
      fontSize: '0.75rem',
      lineHeight: 1,
    },
    sectionElement: {
      height: '130px',
    },
  })
);

async function postSPADIAnswers(
  auth: UserAuth,
  answers: number[],
  goToQuestionaire: () => void
) {
  const response = await fetch(`${baseUrl}/api/v1/forms/patient/fill/spadi`, {
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

export default function SPADI(props: PatientFormProps) {
  const classes = useStyles();
  const questions = [
    {
      title: 'Escala de incapacidade',
      subtitle:
        'Os números ao lado de cada item representam o grau de dificuldade que você teve ao fazer aquela atividade. O número zero representa "Sem dificuldade" e o número dez representa "Não consegui fazer". Por favor, indique o número que melhor descreve quanta dificuldade você teve para fazer cada uma das atividades na semana passada. Se você não teve a oportunidade de fazer uma das atividades na semana passada, por favor, tente estimar qual número você daria para sua dificuldade.',
      sections: [
        'Lavar seu cabelo com o braço afetado?',
        'Lavar suas costas como braço afetado?',
        'Vestir uma camiseta ou blusa pela cabeça',
        'Vestir uma camisa que abotoa na frente?',
        'Vestir suas calças?',
        'Colocar algo em uma prateleira alta com o braço afetado?',
        'Carregar um objeto pesado de 5kg (saco grande de arroz) com o braço afetado?',
        'Retirar algo do bolso de trás com o braço afetado?',
      ],
      alternatives: [
        { label: 'N/A', value: -1 },
        {
          label: (
            <>
              <Typography>0</Typography>
              <Typography className={classes.sliderSubLabel}>
                Sem dificuldade
              </Typography>
            </>
          ),
          value: 0,
        },
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 },
        { label: '6', value: 6 },
        { label: '7', value: 7 },
        { label: '8', value: 8 },
        { label: '9', value: 9 },
        {
          label: (
            <>
              <Typography>10</Typography>
              <Typography className={classes.sliderSubLabel}>
                Não consegui fazer
              </Typography>
            </>
          ),
          value: 10,
        },
      ],
    },
    {
      title: 'Escala de dor',
      subtitle:
        'Os números ao lado de cada item representam quanta dor você sente em cada situação. O número zero representa "Sem dor" e o número dez representa "A pior dor". Por favor, indique o número que melhor descreve quanta dor você sentiu durante a semana passada em cada uma das seguintes situações. Se você não teve a oportunidade de fazer uma das atividades na semana passada, por favor, tente estimar qual número você daria para sua dor.',
      sections: [
        'Qual foi a intensidade da sua dor quando foi a pior na semana passada?', //1
        'Quando se deitou em cima do braço afetado?', //2
        'Quando tentou pegfar algo em uma prateleira alta com o braço afetado?', //3
        'Quando tentou tocar a parte de trás do pescoço com o braço afetado?', //4
        'Quando tentou empurrar algo com o braço afetado?', //5
      ],
      alternatives: [
        { label: 'N/A', value: -1 },
        {
          label: (
            <>
              <Typography>0</Typography>
              <Typography className={classes.sliderSubLabel}>
                Sem dor
              </Typography>
            </>
          ),
          value: 0,
        },
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 },
        { label: '6', value: 6 },
        { label: '7', value: 7 },
        { label: '8', value: 8 },
        { label: '9', value: 9 },
        {
          label: (
            <>
              <Typography>10</Typography>
              <Typography className={classes.sliderSubLabel}>
                Pior dor
              </Typography>
            </>
          ),
          value: 10,
        },
      ],
    },
  ];

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
  const [currentPanel, setCurrentPanel] = React.useState(0);
  const [answers, setAnswers] = React.useState(
    new Array(questions.reduce((acc, q) => acc + q.sections.length, 0)).fill(-1)
  );

  const handleChange = (
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
            Índice de dor e incapacidade no ombro (SPADI)
          </Typography>
        </Toolbar>
      </AppBar>
      {currentPanel === 0 && (
        <>
          <div className={classes.title}>
            <Typography variant="h6">Questionário</Typography>
            <Typography variant="h6">
              Índice de dor e incapacidade no ombro (SPADI)
            </Typography>
          </div>
          <div className={classes.bodyContent}>
            <Typography variant="body1">
              O Shoulder Pain and Disability Index (SPADI) é um questionário de
              qualidade de vida desenvolvido para avaliar a dor e a incapacidade
              associadas às disfunções de ombro
            </Typography>
            <Button
              variant="contained"
              className={classes.appBar}
              onClick={() => setCurrentPanel(1)}
            >
              Começar
            </Button>
            <Typography variant="body2" className={classes.referenceInfo}>
              Roach KE, Budiman-Mak E, Songsiridej N, Lertratanakul Y.
              Development of a shoulder pain and disability index. Arthritis
              Care Res. 1991;4(4):143-9.
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
                    <Grid item xs={12}>
                      <Typography
                        variant="body2"
                        className={classes.referenceInfo}
                      >
                        {question?.subtitle}
                      </Typography>
                    </Grid>
                    {question.sections.map((section, sIndex) => (
                      <Grid
                        item
                        xs={12}
                        key={`question${qIndex}-section${sIndex}`}
                        className={classes.sectionElement}
                      >
                        <FormControl component="fieldset" fullWidth>
                          <FormLabel component="legend">{section}</FormLabel>
                          <Slider
                            defaultValue={-1}
                            classes={{
                              root: classes.slider,
                              markLabel: classes.sliderMakrLabel,
                            }}
                            step={1}
                            valueLabelDisplay="auto"
                            marks={question.alternatives}
                            min={-1}
                            max={10}
                            onChange={(e, v) => {
                              handleChange(
                                (v as number).toString(),
                                qIndex,
                                sIndex
                              );
                            }}
                          />
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
                  ? postSPADIAnswers(props.patientAuth, answers, () =>
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
