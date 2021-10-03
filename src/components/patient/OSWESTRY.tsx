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
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { Grid, LinearProgress } from '@material-ui/core';

import { PatientFormProps, PatientPanel } from '../../interfaces';
import { baseUrl } from '../../utils/loggedUser';
import { UserAuth } from '../../models/UserAuth';

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
      backgroundColor: '#7A3FE1',
    },
  })
);

const questions = [
  {
    title: 'Seção 1 - Intensidade da dor',
    alternatives: [
      'Posso tolerar a dor que estou sentindo sem ter que  tomar analgésicos',
      'A dor é forte, mas suporto-a sem tomar analgésicos',
      'Os analgésicos aliviam completamente a dor',
      'Os analgésicos aliviam moderadamente a dor',
      'Os analgésicos aliviam muito pouco a dor',
      'Os analgésicos não afetam de forma alguma a dor e não os estou tomando',
    ],
  },
  {
    title: 'Seção 2 - Cuidados pessoais (lavar-se, vestir-se, etc)',
    alternatives: [
      'Posso me cuidar normalmente sem que isso cause mais dor',
      'Posso me cuidar normalmente, mas isso causa mais dor',
      'Dói para eu me cuidar e eu sou lento e cuidadoso',
      'Preciso de alguma ajuda, mas consigo realizar a maioria dos meus cuidados pessoais',
      'Preciso de ajuda todos os dias para a maioria dos meus cuidados pessoais',
      'Não consigo me vestir, me lavo com dificuldades e fico na cama',
    ],
  },
  {
    title: 'Seção 3 - Levantar pesos',
    alternatives: [
      'Posso levantar pesos consideráveis sem sentir mais dor',
      'Posso levantar pesos consideráveis, mas isso causa mais dor',
      'A dor me impede de levantar coisas pesadas, mas posso levantá-las se bem posicionadas. Ex: Em cima de uma mesa',
      'A dor me impede de levantar pesos consideráveis, mas posso levantar pesos leves a médios, se estiverem posicionados convenientemente',
      'Posso levantar somente pesos bem leves',
      'Não posso levantar ou carregar nada',
    ],
  },
  {
    title: 'Seção 4 - Caminhar',
    alternatives: [
      'A dor não me impede de andar qualquer distância',
      'A dor me impede de andar mais de 1,6 quilômetros',
      'A dor me impede de andar mais de 800 metros',
      'A dor me impede de andar mais de 400 metros',
      'Posso andar somente com uma bengala ou muletas',
      'Fico na cama a maior parte do tempo e tenho que me arrastar para ir ao banheiro',
    ],
  },
  {
    title: 'Seção 5 - Sentar',
    alternatives: [
      'Posso me sentar em qualquer cadeira, por quanto tempo quiser',
      'Só posso me sentar na minha cadeira favorita, por quanto tempo quiser',
      'A dor me impede de sentar por mais de 1 hora',
      'A dor me impede de sentar por mais de meia hora',
      'A dor me impede de sentar por mais de 10 minutos',
      'A dor me impede completamente de sentar',
    ],
  },
  {
    title: 'Seção 6 - Ficar em pé',
    alternatives: [
      'Posso ficar em pé o quanto tempo quiser, sem sentir mais dor',
      'Posso ficar em pé o quanto tempo quiser, mas isso me causa mais dor',
      'A dor me impede de ficar em pé por mais de 1 hora',
      'A dor me impede de ficar em pé por mais de 30 minutos',
      'A dor me impede de ficar em pé por mais de 10 minutos',
      'A dor me impede completamente de ficar em pé',
    ],
  },
  {
    title: 'Seção 7 - Dormir',
    alternatives: [
      'A dor não me impede de dormir bem',
      'Só posso dormir bem tomando comprimidos',
      'Mesmo quando tomo os comprimidos, só consigo dormir menos de seis horas',
      'Mesmo quando tomo os comprimidos, só consigo dormir menos de quatro horas',
      'Mesmo quando tomo os comprimidos, só consigo dormir menos de duas horas',
      'A dor me impede completamente de dormir',
    ],
  },
  {
    title: 'Seção 8 - Vida sexual',
    alternatives: [
      'Minha vida sexual é normal e não causa mais dor',
      'Minha vida sexual é normal, mas causa alguma dor adicional',
      'Minha vida sexual é quase normal, mas com muita dor',
      'Minha vida sexual é severamente restrita pela dor',
      'Minha vida sexual é quase inexistente devido à dor',
      'A dor me impede completamente de ter vida sexual',
    ],
  },
  {
    title: 'Seção 9 - Vida social',
    alternatives: [
      'Minha vida social é normal e não me causa mais dor',
      'Minha vida social é normal, mas aumenta o grau de dor',
      'A dor não tem efeito significativo na minha vida social, com exceção de limitar meus interesses energéticos, como por exemplo, dançar, etc.',
      'A dor restringiu minha vida social e não saio tanto como antes',
      'A dor restringiu minha vida social à minha casa',
      'Não tenho vida social por causa da dor',
    ],
  },
  {
    title: 'Seção 10 - Viajar',
    alternatives: [
      'Posso viajar para qualquer lugar sem me causar mais dor',
      'Posso viajar para qualquer lugar, mas isso causa mais dor',
      'A dor é forte, mas consigo fazer jornadas de mais de duas horas',
      'A dor me restringe a jornadas de menos de 1 hora',
      'A dor me restringe a jornadas curtas necessárias, de menos de 30 minutos',
      'A dor me impede de viajar, exceto ir ao médico ou ao hospital',
    ],
  },
];

async function postOSWAnswers(
  auth: UserAuth,
  answers: number[],
  goToQuestionaire: () => void
) {
  const response = await fetch(
    `${baseUrl}/api/v1/forms/patient/fill/OSWESTRY`,
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

export default function OSWESTRY(props: PatientFormProps) {
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
          <Typography variant="subtitle1">
            Questionário Oswestry de Lombalgia
          </Typography>
        </Toolbar>
      </AppBar>
      {currentPanel === 0 && (
        <>
          <div className={classes.title}>
            <Typography variant="h6">Questionário</Typography>
            <Typography variant="h6">Oswestry de Lombalgia</Typography>
          </div>
          <div className={classes.bodyContent}>
            <Typography variant="body1">
              Esse questionário avalia o impacto da dor nas costas em suas
              atividades diárias.
            </Typography>
            <Button
              variant="contained"
              className={classes.appBar}
              onClick={() => setCurrentPanel(1)}
            >
              Começar
            </Button>
            <Typography variant="body2" className={classes.referenceInfo}>
              Vigatto R, Alexandre NMC, Correa HR Filho. Development of a
              Brazilian Portuguese Version of the Oswestry DisabilitY. Index:
              Cross-Cultural Adaptation, Reability and Validity. Spine.
              2007;32(4):481-6.
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
          {currentPanel === 1 && (
            <div>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    Selecione em cada seção, somente uma alternativa, a que se
                    aplica ao seu caso.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" className={classes.referenceInfo}>
                    (Nós entendemos que talvez você ache que duas das afirmações
                    de uma seção podem estar relacionadas com seu caso, mas
                    marque apenas a alternativa que melhor descreve o seu
                    problema.)
                  </Typography>
                </Grid>
              </Grid>
            </div>
          )}
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
                        {question.alternatives.map((alternative, aIndex) => (
                          <FormControlLabel
                            value={aIndex}
                            control={<Radio />}
                            label={alternative}
                            checked={answers[qIndex] === aIndex}
                            classes={{ label: classes.formLabel }}
                          />
                        ))}
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
                  ? postOSWAnswers(props.patientAuth, answers, () =>
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
