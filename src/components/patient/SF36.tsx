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
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import Looks3Icon from '@material-ui/icons/Looks3';
import Looks4Icon from '@material-ui/icons/Looks4';
import Looks5Icon from '@material-ui/icons/Looks5';
import Slider from '@material-ui/core/Slider';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

import { PatientFormProps, PatientPanel } from '../../interfaces';
import { UserAuth } from '../../models/UserAuth';
import api from '../../utils/api';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainColor: {
      color: '#7A3FE1',
    },
    appBar: {
      backgroundColor: '#7A3FE1',
      color: 'white',
    },
    title: {
      color: '#7A3FE1',
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
      backgroundColor: '#7A3FE1',
    },
    section: {
      margin: '12px 0',
    },
    numberButtonPrimary: {
      color: '#E6E6E6',
    },
    numberButtonSecondary: {
      color: '#7A3FE1',
    },
    numberSpacing: {
      margin: '0 auto',
      textAlign: 'center',
    },
    numberOptionLabel: {
      textAlign: 'center',
      fontSize: '0.625rem',
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
    slider: {
      textAlign: 'center',
      color: '#7A3FE1',
      width: '90%',
      marginLeft: '1rem',
    },
    sliderMakrLabel: {
      fontSize: '0.625rem',
    },
  })
);

const questions = [
  {
    title: null,
    type: 'number',
    sections: [
      'Selecione na escala abaixo como você em geral diria que sua saúde é:',
    ],
    alternatives: [
      { label: 'Excelente', value: 1 },
      { label: 'Muito boa', value: 2 },
      { label: 'Boa', value: 3 },
      { label: 'Ruim', value: 4 },
      { label: 'Muito ruim', value: 5 },
    ],
  },
  {
    title: null,
    sections: [
      'Comparada há um ano atrás, como você se classificaria sua saúde em geral, agora?',
    ],
    type: 'number',
    alternatives: [
      { label: 'Muito melhor', value: 1 },
      { label: 'Um pouco melhor', value: 2 },
      { label: 'Quase a mesma', value: 3 },
      { label: 'Um pouco pior', value: 4 },
      { label: 'Muito pior', value: 5 },
    ],
  },
  {
    title:
      'Os seguintes itens são sobre atividades que você poderia fazer atualmente durante um dia comum. Devido à sua saúde, você teria dificuldade para fazer estas atividades? Neste caso, quando:',
    type: 'radio',
    sections: [
      'Atividades Rigorosas, que exigem muito esforço, tais como correr, levantar objetos pesados, participar em esportes árduos.',
      'Atividades moderadas, tais como mover uma mesa, passar aspirador de pó, jogar bola, varrer a casa.',
      'Levantar ou carregar mantimentos',
      'Subir vários lances de escada',
      'Subir um lance de escada',
      'Curvar-se, ajoelhar-se ou dobrar-se',
      'Andar mais de 1 quilômetro',
      'Andar vários quarteirões',
      'Andar um quarteirão',
      'Tomar banho ou vestir-se',
    ],
    alternatives: [
      { label: 'Sim, dificulta muito', value: 1 },
      { label: 'Sim, dificulta um pouco', value: 2 },
      { label: 'Não dificulta de modo algum', value: 3 },
    ],
  },
  {
    title:
      'Durante as últimas 4 semanas, você teve algum dos seguintes problemas com seu trabalho ou com alguma atividade regular, como conseqüência de sua saúde física?',
    type: 'radio',
    sections: [
      'Você diminui a quantidade de tempo que se dedicava ao seu trabalho ou a outras atividades?',
      'Realizou menos tarefas do que você gostaria?',
      'Esteve limitado no seu tipo de trabalho ou a outras atividades?',
      'Teve dificuldade de fazer seu trabalho ou outras atividades (p. ex. necessitou de um esforço extra)?',
    ],
    alternatives: [
      { label: 'Sim', value: 1 },
      { label: 'Não', value: 0 },
    ],
  },
  {
    title:
      'Durante as últimas 4 semanas, você teve algum dos seguintes problemas com seu trabalho ou outra atividade regular diária, como conseqüência de algum problema emocional (como se sentir deprimido ou ansioso)?',
    type: 'radio',
    sections: [
      'Você diminui a quantidade de tempo que se dedicava ao seu trabalho ou a outras atividades?',
      'Realizou menos tarefas do que você gostaria?',
      'Não realizou ou fez qualquer das atividades com tanto cuidado como geralmente faz?',
    ],
    alternatives: [
      { label: 'Sim', value: 1 },
      { label: 'Não', value: 0 },
    ],
  },
  {
    title: null,
    sections: [
      'Durante as últimas 4 semanas, de que maneira sua saúde física ou problemas emocionais interferiram nas suas atividades sociais normais, em relação à família, amigos ou em grupo?',
    ],
    type: 'number',
    alternatives: [
      { label: 'De forma nenhuma', value: 1 },
      { label: 'Um pouco', value: 2 },
      { label: 'Moderado', value: 3 },
      { label: 'Bastante', value: 4 },
      { label: 'Extremamente', value: 5 },
    ],
  },
  {
    title: null,
    sections: ['Quanta dor no corpo você teve durante as últimas 4 semanas?'],
    type: 'slider',
    alternatives: [
      { label: 'Nenhuma', value: 1 },
      { label: 'Muito leve', value: 2 },
      { label: 'Leve', value: 3 },
      { label: 'Moderada', value: 4 },
      { label: 'Grave', value: 5 },
      { label: 'Muito grave', value: 6 },
    ],
  },
  {
    title: null,
    sections: [
      'Durante as últimas 4 semanas, quanto a dor interferiu com seu trabalho normal (incluindo o trabalho dentro de casa)?',
    ],
    type: 'number',
    alternatives: [
      { label: 'De forma nenhuma', value: 1 },
      { label: 'Um pouco', value: 2 },
      { label: 'Moderado', value: 3 },
      { label: 'Bastante', value: 4 },
      { label: 'Extremamente', value: 5 },
    ],
  },
  {
    title:
      'Estas questões são sobre como você se sente e como tudo tem acontecido com você durante as últimas 4 semanas. Para cada questão, marque o número que mais se aproxime de maneira como você se sente, em relação às últimas 4 semanas.',
    type: 'radio',
    sections: [
      'Quanto tempo você tem se sentindo cheio de vigor, de vontade, de força?',
      'Quanto tempo você tem se sentido uma pessoa muito nervosa?',
      'Quanto tempo você tem se sentido tão deprimido que nada pode anima-lo?',
      'Quanto tempo você tem se sentido calmo ou tranqüilo?',
      'Quanto tempo você tem se sentido com muita energia?',
      'Quanto tempo você tem se sentido desanimado ou abatido?',
      'Quanto tempo você tem se sentido esgotado?',
      'Quanto tempo você tem se sentido uma pessoa feliz?',
      'Quanto tempo você tem se sentido cansado?',
    ],
    alternatives: [
      { label: 'Todo tempo', value: 1 },
      { label: 'A maior parte do tempo', value: 2 },
      { label: 'Uma boa parte do tempo', value: 3 },
      { label: 'Alguma parte do tempo', value: 4 },
      { label: 'Uma pequena parte do tempo', value: 5 },
      { label: 'Nunca', value: 6 },
    ],
  },
  {
    title: null,
    sections: [
      'Durante as últimas 4 semanas, quanto de seu tempo a sua saúde física ou problemas emocionais interferiram com as suas atividades sociais (como visitar amigos, parentes, etc)?',
    ],
    type: 'number',
    alternatives: [
      { label: 'Todo tempo', value: 1 },
      { label: 'A maior parte do tempo', value: 2 },
      { label: 'Alguma parte do tempo', value: 3 },
      { label: 'Uma pequena parte do tempo', value: 4 },
      { label: 'Nunca', value: 5 },
    ],
  },
  {
    title: 'O quanto verdadeiro ou falso é cada uma das afirmações para você?',
    sections: [
      'Eu costumo obedecer um pouco mais facilmente que as outras pessoas',
      'Eu sou tão saudável quanto qualquer pessoa que eu conheço',
      'Eu acho que a minha saúde vai piorar',
      'Minha saúde é excelente',
    ],
    type: 'number',
    alternatives: [
      { label: 'Verdadeiro', value: 1 },
      { label: 'A maioria das vezes verdadeiro', value: 2 },
      { label: 'Não sei', value: 3 },
      { label: 'A maioria das vezes falso', value: 4 },
      { label: 'Falso', value: 5 },
    ],
  },
];

async function postSF36Answers(
  auth: UserAuth,
  answers: number[],
  goToQuestionaire: () => void
) {
  api
    .post('api/v1/forms/patient/fill/sf36', JSON.stringify({ answers }), {
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

export default function SF36(props: PatientFormProps) {
  const classes = useStyles();
  const [currentPanel, setCurrentPanel] = React.useState(0);
  const [answers, setAnswers] = React.useState(new Array(36));

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
          <Typography variant="subtitle1">Qualidade de Vida (SF36)</Typography>
        </Toolbar>
      </AppBar>
      {currentPanel === 0 && (
        <>
          <div className={classes.title}>
            <Typography variant="h6">Questionário</Typography>
            <Typography variant="h6">Qualidade de Vida (SF36)</Typography>
          </div>
          <div className={classes.bodyContent}>
            <Typography variant="body1">
              O questionário SF 36 avalia o impacto da dor em várias áreas da
              sua vida, dentre elas: capacidade física, impacto social,
              emocional, psicológico e a dor, entre outros.
            </Typography>
            <Button
              variant="contained"
              className={classes.appBar}
              onClick={() => setCurrentPanel(1)}
            >
              Começar
            </Button>
            <Typography variant="body2" className={classes.referenceInfo}>
              Ciconelli, Rozana Mesquita; Ferraz, Marcos Bosi; Santos, Wilton;
              Meinão, Ivone; Quaresma, Marina Rodrigues. Tradução para a língua
              portuguesa e validação do questionário genérico de avaliação de
              qualidade de vida SF-36 (Brasil SF-36) / Brazilian-Portuguese
              version of the SF-36. A reliable and valid quality of life outcome
              measure. Rev. bras. reumatol;39(3):143-50, maio-jun. 1999.
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
                        <FormControl component="fieldset">
                          <FormLabel component="legend">{section}</FormLabel>
                          {question.type === 'number' && (
                            <FormGroup row>
                              {question.alternatives.map((alternative) => {
                                return (
                                  <Grid
                                    item
                                    xs={2}
                                    className={classes.numberSpacing}
                                  >
                                    <IconButton
                                      color={
                                        answers[
                                          getRealIndex(qIndex, sIndex)
                                        ] === alternative.value
                                          ? 'secondary'
                                          : 'primary'
                                      }
                                      onClick={(e) =>
                                        handleChange(
                                          alternative.value.toString(),
                                          qIndex,
                                          sIndex
                                        )
                                      }
                                      classes={{
                                        colorPrimary:
                                          classes.numberButtonPrimary,
                                        colorSecondary:
                                          classes.numberButtonSecondary,
                                      }}
                                    >
                                      {alternative.value === 1 && (
                                        <LooksOneIcon />
                                      )}
                                      {alternative.value === 2 && (
                                        <LooksTwoIcon />
                                      )}
                                      {alternative.value === 3 && (
                                        <Looks3Icon />
                                      )}
                                      {alternative.value === 4 && (
                                        <Looks4Icon />
                                      )}
                                      {alternative.value === 5 && (
                                        <Looks5Icon />
                                      )}
                                    </IconButton>
                                    <Typography
                                      className={classes.numberOptionLabel}
                                    >
                                      {alternative.label}
                                    </Typography>
                                  </Grid>
                                );
                              })}
                            </FormGroup>
                          )}
                          {question.type === 'radio' && (
                            <RadioGroup
                              row
                              aria-label={section}
                              name={`question${qIndex}-section${sIndex}`}
                              onChange={(e, v) =>
                                handleChange(v, qIndex, sIndex)
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
                                    answers[getRealIndex(qIndex, sIndex)] ===
                                    alternative.value
                                  }
                                />
                              ))}
                            </RadioGroup>
                          )}
                          {question.type === 'slider' && (
                            <Slider
                              defaultValue={1}
                              classes={{
                                root: classes.slider,
                                markLabel: classes.sliderMakrLabel,
                              }}
                              step={1}
                              valueLabelDisplay="auto"
                              marks={question.alternatives}
                              min={1}
                              max={6}
                              onChange={(e, v) => {
                                handleChange(
                                  (v as number).toString(),
                                  qIndex,
                                  sIndex
                                );
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
                  ? postSF36Answers(props.patientAuth, answers, () =>
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
