import Button from '@material-ui/core/Button';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
  withStyles,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import React from 'react';
import { green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Grid from '@material-ui/core/Grid';

import logo from '../../image/logo.svg';
import logoWhite from '../../image/logo-white.svg';
import onBoardStep1 from '../../image/onboard-step-1.svg';
import onBoardStep2 from '../../image/onboard-step-2.svg';
import onBoardStep3 from '../../image/onboard-step-3.svg';

function getHasOnboardedLocalStorage(): boolean {
  const hasGoneOnboard = localStorage.getItem('onboard') || 'false';
  return JSON.parse(hasGoneOnboard);
}

function setHasOnboardedLocalStorage(isOnboard: boolean): void {
  localStorage.setItem('onboard', JSON.stringify(isOnboard));
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // marginTop: '64px',
      width: '100%',
      // padding: theme.spacing(4),
      height: '100vh',
    },
    onboard: { marginTop: '64px' },
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
    logoWhite: {
      textAlign: 'center',
      margin: '1rem',
    },
    img: {
      height: 255,
      maxWidth: 400,
      overflow: 'hidden',
      display: 'block',
      width: '100%',
    },
    profileMenu: {
      backgroundColor: '#CEEBEA',
      textAlign: 'left',
      '&:last-child, &:first-child': {
        borderRadius: '0 0 20px 20px',
      },
    },
    expandIcon: {
      position: 'absolute',
      left: 0,
      top: '30px',
      '&.Mui-expanded': {
        top: '42px',
      },
    },
    greenColor: {
      color: '#329D9C',
    },
  })
);

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

interface OnBoardProps {
  activeStep: number;
  maxSteps: number;
  handleNext: () => void;
  handleBack: () => void;
  setHasOnboarded: (onboarded: boolean) => void;
}

function OnBoard(props: OnBoardProps) {
  const classes = useStyles();

  const { activeStep, maxSteps, handleNext, handleBack, setHasOnboarded } =
    props;
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
          setHasOnboardedLocalStorage(true);
          setHasOnboarded(true);
        }}
      >
        Pular etapa
      </Button>
    </div>
  );
}

function BannerMenu() {
  const classes = useStyles();

  return (
    <Accordion
      classes={{
        root: classes.profileMenu,
      }}
      defaultExpanded
    >
      <AccordionSummary
        expandIcon={<MenuIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        classes={{
          expandIcon: classes.expandIcon,
        }}
      >
        <Grid container>
          <Grid item className={classes.logoWhite} xs={12}>
            <img
              src={logoWhite}
              alt="Logo da Ador em branco"
              className={classes.logoWhite}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              component="h1"
              className={classes.greenColor}
            >
              Olá, André!
            </Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body1">
          Abaixo estão os questionários que foram Solicitados para que você
          responda. Com os resultados destes questionários, o profissional Irá
          conhecer e analisar sua dor e assim, planejar seu tratamento.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export default function PatientPage() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [hasOnboarded, setHasOnboarded] = React.useState(
    getHasOnboardedLocalStorage()
  );
  const maxSteps = tourSteps.length;

  const handleNext = () => {
    if (activeStep + 1 === maxSteps) {
      setHasOnboardedLocalStorage(true);
      setHasOnboarded(true);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      {hasOnboarded ? (
        <>
          <BannerMenu />
        </>
      ) : (
        <OnBoard
          activeStep={activeStep}
          maxSteps={maxSteps}
          handleNext={handleNext}
          handleBack={handleBack}
          setHasOnboarded={setHasOnboarded}
        />
      )}
    </div>
  );
}
