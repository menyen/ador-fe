import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slider from '@material-ui/core/Slider';
import IconButton from '@material-ui/core/IconButton';
import { ArrowBack } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

import { PatientFormProps, PatientPanel } from '../../interfaces';
import { baseUrl } from '../../utils/loggedUser';
import { UserAuth } from '../../models/UserAuth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    greenColor: {
      color: '#329D9C',
    },
    PSEQAppBar: {
      backgroundColor: '#329D63',
      color: 'white',
    },
    PSEQTitle: {
      color: '#329D63',
      margin: theme.spacing(5, 2, 2),
    },
    PSEQBodyContent: {
      '& > *': {
        textAlign: 'left',
        margin: theme.spacing(2),
      },
    },
    PSEQSlider: {
      textAlign: 'center',
      color: '#329D63',
      width: '80%',
      marginLeft: '1.75rem',
    },
    PSEQForm: {
      margin: theme.spacing(2),
      textAlign: 'left',
    },
    PSEQFormItem: {
      margin: theme.spacing(3, 0, 6),
    },
    sliderSubLabel: {
      whiteSpace: 'break-spaces',
      width: '50px',
      fontSize: '0.625rem',
      lineHeight: 1,
    },
    PSEQFooter: {
      textAlign: 'center',
      '& button': {
        display: 'block',
        margin: '1rem auto',
      },
    },
    PSEQReferenceInfo: {
      fontSize: '0.75rem',
      color: grey[500],
    },
  })
);

const questions = [
  'Eu posso aproveitar as coisas, apesar da dor.', //1
  'Eu posso fazer a maioria das tarefas domésticas (por exemplo, arrumar, lavar louça, etc), apesar da dor.', //2
  'Eu posso socializar com meus amigos ou familiares como eu costumava fazer, apesar da dor.', //3
  'Eu posso lidar com a minha dor na maioria das situações.', //4
  'Eu posso fazer alguma forma de trabalho, apesar da dor. (“Trabalho” inclui tarefas domésticas, trabalho remunerado e não remunerado).', //5
  'Eu ainda posso fazer muitas das coisas que eu gosto de fazer, como hobbies ou atividades de lazer, apesar da dor.', //6
  'Eu posso lidar com a dor sem medicação', //7
  'Eu ainda posso realizar a maioria dos meus objetivos na vida, apesar da dor.', //8
  'Eu posso viver um estilo de vida normal, apesar da dor.', //9
  'Eu posso gradualmente me tornar mais ativo, apesar da dor.', //10
];

async function postPSEQAnswers(
  auth: UserAuth,
  answers: number[],
  goToQuestionaire: () => void
) {
  const response = await fetch(`${baseUrl}/api/v1/forms/patient/fill/pseq`, {
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

export default function PSEQ(props: PatientFormProps) {
  enum PSEQFormPanel {
    DESCRIPTION,
    FORM,
  }
  const classes = useStyles();
  const [currentPSEQPanel, setCurrentPSEQPanel] = React.useState(
    PSEQFormPanel.DESCRIPTION
  );
  const [answers, setAnswers] = React.useState(
    new Array(questions.length).fill(0)
  );

  const marks = [
    {
      value: 0,
      label: (
        <>
          <Typography>0</Typography>
          <Typography className={classes.sliderSubLabel}>
            Completamente confiante
          </Typography>
        </>
      ),
    },
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    {
      value: 6,
      label: (
        <>
          <Typography>6</Typography>
          <Typography className={classes.sliderSubLabel}>
            Não completamente confiante
          </Typography>
        </>
      ),
    },
  ];
  return (
    <>
      <AppBar position="static" classes={{ colorPrimary: classes.PSEQAppBar }}>
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
            Autoeficácia da dor (PSEQ)
          </Typography>
        </Toolbar>
      </AppBar>
      {currentPSEQPanel === PSEQFormPanel.DESCRIPTION && (
        <>
          <div className={classes.PSEQTitle}>
            <Typography variant="h6">Questionário</Typography>
            <Typography variant="h6">Autoeficácia da dor (PSEQ)</Typography>
          </div>
          <div className={classes.PSEQBodyContent}>
            <Typography variant="body1">
              Por favor, avalie como você está <b>confiante</b> de que você pode
              fazer as seguintes coisas no momento, <b>apesar da dor</b>. Para
              indicar sua resposta escolha um dos números na escala abaixo de
              cada item, onde 6 = nada confiante e 1 = completamente confiante
            </Typography>
            <Button
              variant="contained"
              className={classes.PSEQAppBar}
              onClick={() => setCurrentPSEQPanel(PSEQFormPanel.FORM)}
            >
              Começar
            </Button>
            <Typography variant="body2" className={classes.PSEQReferenceInfo}>
              Nicholas M.K. Self-efficacy and chronic pain. Paper presented at
              the annual conference of the British Psychological Society. St.
              Andrews, 1989.
            </Typography>
          </div>
        </>
      )}
      {currentPSEQPanel === PSEQFormPanel.FORM && (
        <div className={classes.PSEQForm}>
          <Typography variant="subtitle1">
            Lembre-se, este questionário <b>não</b> está perguntando se você não
            tem feito essas coisas, mas sim{' '}
            <b>
              como você está confiante de que você pode fazê-las no momento,
              apesar da dor
            </b>
            .
          </Typography>

          {questions.map((question, index) => (
            <div className={classes.PSEQFormItem} key={`question_${index}`}>
              <Typography id={`question_${index}`} gutterBottom>
                {question}
              </Typography>
              <Slider
                aria-labelledby={`question_${index}`}
                defaultValue={0}
                className={classes.PSEQSlider}
                step={1}
                valueLabelDisplay="auto"
                marks={marks}
                min={0}
                max={6}
                onChange={(e, v) => {
                  const newAnswers = [...answers];
                  newAnswers[index] = v as number;
                  setAnswers(newAnswers);
                }}
              />
            </div>
          ))}

          <div className={classes.PSEQFooter}>
            <Button
              variant="contained"
              className={classes.PSEQAppBar}
              onClick={() =>
                postPSEQAnswers(props.patientAuth, answers, () =>
                  props.setCurrentPanel(PatientPanel.INITIAL)
                )
              }
            >
              Finalizar
            </Button>
            <Button
              variant="text"
              className={classes.greenColor}
              onClick={() => setCurrentPSEQPanel(PSEQFormPanel.DESCRIPTION)}
            >
              Anterior
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
