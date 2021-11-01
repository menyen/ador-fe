import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { ArrowBack } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

import { PatientFormProps, PatientPanel } from '../../interfaces';
import { baseUrl } from '../../utils/loggedUser';
import { UserAuth } from '../../models/UserAuth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainColor: {
      color: '#3f51b5',
    },
    SBSTAppBar: {
      backgroundColor: '#3f51b5',
      color: 'white',
    },
    SBSTTitle: {
      color: '#3f51b5',
      margin: theme.spacing(5, 2, 2),
    },
    SBSTBodyContent: {
      '& > *': {
        textAlign: 'left',
        margin: theme.spacing(2),
      },
    },
    SBSTForm: {
      margin: theme.spacing(2),
      textAlign: 'left',
    },
    SBSTReferenceInfo: {
      fontSize: '0.75rem',
      color: grey[500],
    },
    radioGroup: {
      justifyContent: 'center',
    },
  })
);

const questions = [
  'A minha dor nas costas se espalhou pelas pernas nas duas últimas semanas.', //1
  'Eu tive dor no ombro e/ou na nuca pelo menos uma vez nas últimas duas semanas.', //2
  'Eu evito andar longas distâncias por causa da minha dor nas costas.', //3
  'Nas duas últimas semanas, tenho me vestido mais devagar por causa da minha dor nas costas.', //4
  'A atividade física não é realmente segura para uma pessoa com um problema como o meu.', //5
  'Tenho ficado preocupado por muito tempo por causa da minha dor nas costas.', //6
  'Eu sinto que minha dor nas costas é terrível e que nunca vai melhorar.', //7
  'Em geral, eu não tenho gostado de todas as coisas como eu costumava gostar.', //8
  'Em geral, quanto a sua dor nas costas o incomodou nas duas últimas semanas. Nada ( 0 ) Pouco ( 0 ) Moderado ( 0 ) Muito ( 1 ) Extremamente ( 1 )', //9
];

async function postSBSTAnswers(
  auth: UserAuth,
  answers: number[],
  goToQuestionaire: () => void
) {
  const response = await fetch(`${baseUrl}/api/v1/forms/patient/fill/sbst`, {
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

export default function SBST(props: PatientFormProps) {
  enum SBSTFormPanel {
    DESCRIPTION,
    FORM,
  }
  const classes = useStyles();
  const [currentSBSTPanel, setCurrentSBSTPanel] = React.useState(
    SBSTFormPanel.DESCRIPTION
  );
  const [answers, setAnswers] = React.useState(new Array(questions.length));

  return (
    <>
      <AppBar position="static" classes={{ colorPrimary: classes.SBSTAppBar }}>
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
            Start Back Screening Tool (SBST)
          </Typography>
        </Toolbar>
      </AppBar>
      {currentSBSTPanel === SBSTFormPanel.DESCRIPTION && (
        <>
          <div className={classes.SBSTTitle}>
            <Typography variant="h6">Questionário</Typography>
            <Typography variant="h6">
              Start Back Screening Tool (SBST)
            </Typography>
          </div>
          <div className={classes.SBSTBodyContent}>
            <Typography variant="body1">
              Fatores psicossociais não são rotineiramente identificados na
              avaliação fisioterapêutica e podem influenciar no prognóstico de
              pacientes com dor lombar. O questionário STarT Back Screening Tool
              (SBST) foi criado para distinguir subgrupos dentre pacientes com
              dor lombar em relação ao prognóstico no tratamento considerando
              fatores físicos e psicossociais, classificando-os em baixo, médio
              e alto risco de mau prognóstico
            </Typography>
            <Button
              variant="contained"
              className={classes.SBSTAppBar}
              onClick={() => setCurrentSBSTPanel(SBSTFormPanel.FORM)}
            >
              Começar
            </Button>
            <Typography variant="body2" className={classes.SBSTReferenceInfo}>
              Versão Brasileira do STarT Back Screening Tool - tradução,
              adaptação transcultural, confiabilidade e validade de construto
            </Typography>
          </div>
        </>
      )}
      {currentSBSTPanel === SBSTFormPanel.FORM && (
        <Grid container spacing={1}>
          <Typography variant="subtitle1">
            Marque na escala com que frequência você tem estes pensamentos
            quando sua dor esta forte.
          </Typography>

          {questions.map((question, index) => (
            <Grid item xs={12} key={`question_${index}`}>
              <FormControl component="fieldset">
                <FormLabel component="legend">{question}</FormLabel>
                <RadioGroup
                  row
                  aria-label={question}
                  name={`question_${index}`}
                  classes={{ row: classes.radioGroup }}
                  onChange={(e, v) => {
                    const newAnswers = [...answers];
                    newAnswers[index] = Number(v);
                    setAnswers(newAnswers);
                  }}
                >
                  <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label="Discordo"
                    checked={answers[index] === 0}
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Concordo"
                    checked={answers[index] === 1}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          ))}

          <Grid item xs={12}>
            <Button
              variant="contained"
              className={classes.SBSTAppBar}
              onClick={() =>
                postSBSTAnswers(props.patientAuth, answers, () =>
                  props.setCurrentPanel(PatientPanel.INITIAL)
                )
              }
            >
              Finalizar
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="text"
              className={classes.mainColor}
              onClick={() => setCurrentSBSTPanel(SBSTFormPanel.DESCRIPTION)}
            >
              Anterior
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
}
