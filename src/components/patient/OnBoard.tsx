import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import {
  makeStyles,
  Theme,
  withStyles,
  createStyles,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import React from 'react';

import logo from '../../image/logo.svg';
import onBoardStep1 from '../../image/onboard-step-1.svg';
import onBoardStep2 from '../../image/onboard-step-2.svg';
import onBoardStep3 from '../../image/onboard-step-3.svg';

interface OnBoardProps {
  setHasOnboardedToTrue: () => void;
}

const tourSteps = [
  {
    title: 'Seja bem-vindo!',
    label:
      'A dor causa muitos prejuízos na vida das pessoas, gerando na maioria das vezes impacto negativo na qualidade de vida.',
    imgPath: onBoardStep1,
  },
  {
    title: 'Seja bem-vindo!',
    label:
      'Para que possamos compreender melhor a complexidade da sua dor, solicitamos que preencha os questionários a seguir que será de grande valia para que o profissional que irá te atender possa conhecer e analisar SUA dor e assim, planejar seu tratamento.',
    imgPath: onBoardStep2,
  },
  {
    title: 'Seja bem-vindo!',
    label:
      'É possível que seja necessário respondê-los em outras oportunidades novamente para que seja feito um seguimento da evolução do seu  tratamento. Caso tenha alguma dúvida chame o profissional que poderá te ajudar!',
    imgPath: onBoardStep3,
  },
];

const LoginPatientButton = withStyles((theme: Theme) => ({
  root: {
    color: 'white',
    backgroundColor: '#329D9C',
    '&:hover:not(:disabled)': {
      backgroundColor: green[500],
    },
  },
}))(IconButton);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    onboard: { paddingTop: '64px' },
    tourTitle: {
      padding: '1rem',
    },
    tourLabel: {
      padding: '1rem',
      height: '150px',
    },
    logo: {
      marginBottom: '2rem',
    },
    img: {
      height: 255,
      maxWidth: 400,
      overflow: 'hidden',
      display: 'block',
      width: '100%',
    },
    greenColor: {
      color: '#329D9C',
    },
  })
);

export default function OnBoard(props: OnBoardProps) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tourSteps.length;

  const handleNext = () => {
    if (activeStep + 1 === maxSteps) {
      setHasOnboardedToTrue();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const { setHasOnboardedToTrue } = props;
  return (
    <div className={classes.onboard}>
      <img src={logo} className={classes.logo} />
      <img
        className={classes.img}
        src={tourSteps[activeStep].imgPath}
        alt={tourSteps[activeStep].label}
      />
      <Paper square elevation={0} className={classes.tourTitle}>
        <Typography variant="h6" component="h1">
          {tourSteps[activeStep].title}
        </Typography>
      </Paper>
      <Paper square elevation={0} className={classes.tourLabel}>
        <Typography variant="body1">{tourSteps[activeStep].label}</Typography>
      </Paper>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="dots"
        activeStep={activeStep}
        nextButton={
          <LoginPatientButton
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps}
          >
            <KeyboardArrowRight />
          </LoginPatientButton>
        }
        backButton={
          <LoginPatientButton
            size="small"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            <KeyboardArrowLeft />
          </LoginPatientButton>
        }
      />
      <Button
        size="small"
        onClick={() => {
          setHasOnboardedToTrue();
        }}
      >
        Pular etapa
      </Button>
    </div>
  );
}
