import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { ArrowBack } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

import { EPCProps as DN4Props, PatientPanel } from '../../interfaces';
import { baseUrl } from '../../utils/loggedUser';
import { UserAuth } from '../../models/UserAuth';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    greenColor: {
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
  })
);

const questions = [
  {
    title: 'A sua dor tem uma ou mais das seguintes características:',
    sections: ['Queimação', 'Sensação de frio dolorosa', 'Choque elétrico'],
  },
  {
    title:
      'Há presença de um ou mais dos seguintes sintomas na mesma área da sua dor:',
    sections: [
      'Formigamento',
      'Alfinetada e agulhada',
      'Adormecimento',
      'Coceira',
    ],
  },
  {
    step: 'A dor está localizada em uma área onde o exame físico pode revelar uma ou mais das seguintes características:',
    subtitle: '(Pergunta para profissional de saúde responder)',
    sections: [
      'Hipoestesia (diminuição da sensibilidade) ao toque',
      'Hipoestesia (diminuição da sensibilidade) à picada de agulha',
    ],
  },
  {
    step: 'Na área dolorosa, a dor pode ser causada ou aumentada por:',
    subtitle: '(Pergunta para profissional de saúde responder)',
    sections: ['Escovação'],
  },
];

async function postDN4Answers(
  auth: UserAuth,
  answers: number[],
  goToQuestionaire: () => void
) {
  const response = await fetch(`${baseUrl}/api/v1/forms/patient/fill/dn4`, {
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

export default function DN4(props: DN4Props) {
  const classes = useStyles();
  const [currentPanel, setCurrentPanel] = React.useState(0);
  const [answers, setAnswers] = React.useState(new Array(10));

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
            Questionário Dor Neuropática (DN4)
          </Typography>
        </Toolbar>
      </AppBar>
      {currentPanel === 0 && (
        <>
          <div className={classes.title}>
            <Typography variant="h6">Questionário</Typography>
            <Typography variant="h6">
              Questionário Dor Neuropática (DN4)
            </Typography>
          </div>
          <div className={classes.bodyContent}>
            <Typography variant="body1">
              O questionário DN4 avalia a possibilidade da sua dor ser de origem
              dos nervos especificamente, sendo necessário tratamento
              especifico.
            </Typography>
            <Button
              variant="contained"
              className={classes.appBar}
              onClick={() => setCurrentPanel(1)}
            >
              Começar
            </Button>
            <Typography variant="body2" className={classes.referenceInfo}>
              Versão portuguesa do Neuropathic Pain Questionnaire (DN4) do
              French Neuropathic Pain Group. Tradução, adaptação cultural e
              validação da responsabilidade da Faculdade De Medicina da
              Universidade do Porto, com a autorização do autor Didier
              Bouhassira, PhD.
            </Typography>
          </div>
        </>
      )}
      {currentPanel > 0 && (
        <div className={classes.form}>
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
                        {question.subtitle}
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
                              value="1"
                              control={<Radio />}
                              label="Sim"
                              checked={
                                answers[getRealIndex(qIndex, sIndex)] === 1
                              }
                            />
                            <FormControlLabel
                              value="0"
                              control={<Radio />}
                              label="Não"
                              checked={
                                answers[getRealIndex(qIndex, sIndex)] === 0
                              }
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
                currentPanel === 4
                  ? postDN4Answers(props.patientAuth, answers, () =>
                      props.setCurrentPanel(PatientPanel.INITIAL)
                    )
                  : setCurrentPanel(currentPanel + 1)
              }
              disabled={questions[currentPanel - 1].sections.some(
                (s, sIndex) =>
                  answers[getRealIndex(currentPanel - 1, sIndex)] === undefined
              )}
            >
              {currentPanel === 4 ? 'Finalizar' : 'Próximo'}
            </Button>
            <Button
              variant="text"
              className={classes.greenColor}
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
