import { useEffect, useReducer, useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import logoWhite from '../../image/logo-white.svg';
import {
  PatientPanel,
  QuestionaireListProps,
  QUESTIONAIRE_LIST,
} from '../../interfaces';
import { LoggedPatient } from '../../models/UserAuth';
import questionaireReducer from '../../reducers/questionaire';
import { getQuestionairesForPatient } from '../../actions/questionaire';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { ArrowBack } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logoWhite: {
      textAlign: 'center',
      margin: '1rem',
    },
    profileMenu: {
      backgroundColor: '#CEEBEA',
      textAlign: 'left',
      '&:last-child, &:first-child': {
        borderRadius: '0 0 20px 20px',
      },
      boxShadow: 'none',
    },
    profileButton: {
      backgroundColor: '#329D9C',
      color: 'white',
      margin: '1rem 0',
    },
    expandIcon: {
      position: 'absolute',
      left: 0,
      top: '30px',
      '&.Mui-expanded': {
        top: '42px',
      },
    },
    expandIconProfile: {
      position: 'absolute',
      top: '30px',
    },
    greenColor: {
      color: '#329D9C',
    },
    questionaireList: {
      '& > *': {
        margin: theme.spacing(1, 2, 1),
      },
      '& button': {
        backgroundColor: 'white',
        width: '90%',
      },
    },
    textField: {
      margin: '1rem 0',
      '& .MuiFormLabel-root': {
        color: '#329D9C',
      },
      '& .MuiInputBase-input': {
        color: 'rgba(0, 0, 0, 0.87)',
      },
      '& .MuiInput-underline:before': {
        content: 'none',
      },
    },
  })
);

interface BannerInfoProps {
  patientInfo: LoggedPatient;
}

enum BannerPanelType {
  Description,
  Profile,
}

function BannerMenu(props: BannerInfoProps) {
  const classes = useStyles();
  const [panel, setPanel] = useState(BannerPanelType.Description);

  return panel === BannerPanelType.Description ? (
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
              Olá, {props.patientInfo.name}!
            </Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="body1">
              Abaixo estão os questionários que foram Solicitados para que você
              responda. Com os resultados destes questionários, o profissional
              Irá conhecer e analisar sua dor e assim, planejar seu tratamento.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              className={classes.profileButton}
              onClick={() => setPanel(BannerPanelType.Profile)}
              size="small"
            >
              Ver meu perfil
            </Button>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  ) : (
    <Paper className={classes.profileMenu}>
      <AppBar
        position="static"
        classes={{ colorPrimary: classes.profileMenu }}
        style={{ paddingTop: 20 }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.expandIconProfile}
            onClick={() => setPanel(BannerPanelType.Description)}
          >
            <ArrowBack />
          </IconButton>
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
                Olá, {props.patientInfo.name}!
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                disabled
                id="standard-disabled"
                label="CPF"
                defaultValue={props.patientInfo.tax_id}
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                disabled
                id="standard-disabled"
                label="E-mail"
                defaultValue={props.patientInfo.email}
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                disabled
                id="standard-disabled"
                label="Data de Nascimento"
                defaultValue={props.patientInfo.birthdate}
                className={classes.textField}
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Paper>
  );
}

export default function QuestionaireList(props: QuestionaireListProps) {
  const classes = useStyles();

  const [questionaires, questionairesDispatch] = useReducer(
    questionaireReducer,
    []
  );

  useEffect(() => {
    getQuestionairesForPatient()(questionairesDispatch);
  }, []);

  return (
    <>
      <BannerMenu patientInfo={props.patientInfo} />
      <div className={classes.questionaireList}>
        <Typography variant="subtitle1">Questionários:</Typography>
        {QUESTIONAIRE_LIST.filter((item) =>
          questionaires.map((q) => q.type).includes(item.value)
        ).map((item) => (
          <Button
            variant="contained"
            onClick={() => {
              if (item.value in PatientPanel) {
                props.setCurrentPanel(
                  PatientPanel[item.value as keyof typeof PatientPanel]
                );
              }
            }}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </>
  );
}
