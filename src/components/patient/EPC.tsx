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

import { EPCProps, PatientPanel } from '../../interfaces';
import { baseUrl } from '../../utils/loggedUser';
import { UserAuth } from '../../models/UserAuth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    greenColor: {
      color: '#329D9C',
    },
    EPCAppBar: {
      backgroundColor: '#329D63',
      color: 'white',
    },
    EPCTitle: {
      color: '#329D63',
      margin: theme.spacing(5, 2, 2),
    },
    EPCBodyContent: {
      '& > *': {
        textAlign: 'left',
        margin: theme.spacing(2),
      },
    },
    EPCSlider: {
      textAlign: 'center',
      color: '#329D63',
      width: '90%',
      marginLeft: '1rem',
    },
    EPCForm: {
      margin: theme.spacing(2),
      textAlign: 'left',
    },
    EPCFormItem: {
      margin: theme.spacing(3, 0, 6),
    },
    sliderSubLabel: {
      whiteSpace: 'break-spaces',
      width: '50px',
      fontSize: '0.75rem',
      lineHeight: 1,
    },
    EPCFooter: {
      textAlign: 'center',
      '& button': {
        display: 'block',
        margin: '1rem auto',
      },
    },
    EPCReferenceInfo: {
      fontSize: '0.75rem',
      color: grey[500],
    },
  })
);

const questions = [
  'Não posso mais suportar esta dor.',
  'Não importa o que fizer minhas dores não mudarão.',
  'Preciso tomar remédios para dor.',
  'Isso nunca vai acabar.',
  'Sou um caso sem esperança.',
  'Quando ficarei pior novamente?',
  'Essa dor esta me matando.',
  'Eu não consigo mais continuar.',
  'Essa dor esta me deixando maluco.',
];

function postEPCAnswers(auth: UserAuth, answers: number[]) {
  return fetch(`${baseUrl}/api/v1/forms/patient/fill/epc`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${auth.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ answers }),
  });
}

export default function EPC(props: EPCProps) {
  enum EPCFormPanel {
    DESCRIPTION,
    FORM,
  }
  const classes = useStyles();
  const [currentEPCPanel, setCurrentEPCPanel] = React.useState(
    EPCFormPanel.DESCRIPTION
  );
  const [answers, setAnswers] = React.useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const marks = [
    {
      value: 0,
      label: (
        <>
          <Typography>0</Typography>
          <Typography className={classes.sliderSubLabel}>
            Quase nunca
          </Typography>
        </>
      ),
    },
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    {
      value: 5,
      label: (
        <>
          <Typography>5</Typography>
          <Typography className={classes.sliderSubLabel}>
            Quase sempre
          </Typography>
        </>
      ),
    },
  ];
  return (
    <>
      <AppBar position="static" classes={{ colorPrimary: classes.EPCAppBar }}>
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
            Escala de pensamento Catastrófico
          </Typography>
        </Toolbar>
      </AppBar>
      {currentEPCPanel === EPCFormPanel.DESCRIPTION && (
        <>
          <div className={classes.EPCTitle}>
            <Typography variant="h6">Questionário</Typography>
            <Typography variant="h6">
              Escala de pensamento Catastrófico
            </Typography>
          </div>
          <div className={classes.EPCBodyContent}>
            <Typography variant="body1">
              Na maior parte do tempo, nós dizemos coisas. Por exemplo: nos
              encorajamos a fazer coisas, nos culpamos quando cometemos um erro
              ou nos recompensamos por algo que fizemos com sucesso.
            </Typography>
            <Typography variant="body1">
              {' '}
              Quando estamos com dor, frequentemente também nos dizemos coisas
              que são diferentes das coisas que nós dizemos quando estamos nos
              sentindo bem.
            </Typography>
            <Typography variant="body1">
              A seguir existe uma lista de pensamentos típicos de pessoas que
              estão com dor.
            </Typography>
            <Button
              variant="contained"
              className={classes.EPCAppBar}
              onClick={() => setCurrentEPCPanel(EPCFormPanel.FORM)}
            >
              Começar
            </Button>
            <Typography variant="body2" className={classes.EPCReferenceInfo}>
              Junior JS, Nicholas MK, Pereira IA, Pimenta CAM, Asghari A, Cruz
              RM. Validação da Escala de Pensamentos Catastróficos sobre Dor.
              ACTA FISIATR 2008; 15(1): 31 - 36
            </Typography>
          </div>
        </>
      )}
      {currentEPCPanel === EPCFormPanel.FORM && (
        <div className={classes.EPCForm}>
          <Typography variant="subtitle1">
            Marque na escala com que frequência você tem estes pensamentos
            quando sua dor esta forte.
          </Typography>

          {questions.map((question, index) => (
            <div className={classes.EPCFormItem}>
              <Typography id={`question_${index}`} gutterBottom>
                {question}
              </Typography>
              <Slider
                aria-labelledby={`question_${index}`}
                defaultValue={0}
                className={classes.EPCSlider}
                step={1}
                valueLabelDisplay="auto"
                marks={marks}
                min={0}
                max={5}
                onChange={(e, v) => {
                  const newAnswers = [...answers];
                  newAnswers[index] = v as number;
                  setAnswers(newAnswers);
                }}
              />
            </div>
          ))}

          <div className={classes.EPCFooter}>
            <Button
              variant="contained"
              className={classes.EPCAppBar}
              onClick={() => postEPCAnswers(props.patientAuth, answers)}
            >
              Finalizar
            </Button>
            <Button
              variant="text"
              className={classes.greenColor}
              onClick={() => props.setCurrentPanel(PatientPanel.INITIAL)}
            >
              Anterior
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
