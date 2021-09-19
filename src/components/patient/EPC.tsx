import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slider from '@material-ui/core/Slider';
import IconButton from '@material-ui/core/IconButton';
import { ArrowBack } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { PatientCommonPanelProps, PatientPanel } from '../../interfaces';

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
      margin: theme.spacing(5, 3, 2),
    },
    EPCBodyContent: {
      '& > *': {
        textAlign: 'left',
        margin: theme.spacing(3),
      },
    },
    EPCSlider: {
      textAlign: 'center',
      color: '#329D63',
      width: '90%',
      marginLeft: '1rem',
    },
    EPCForm: {
      margin: theme.spacing(3),
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
        margin: '0 auto',
      },
    },
  })
);

export default function EPC(props: PatientCommonPanelProps) {
  enum EPCFormPanel {
    DESCRIPTION,
    FORM,
  }
  const classes = useStyles();
  const [currentEPCPanel, setCurrentEPCPanel] = React.useState(
    EPCFormPanel.DESCRIPTION
  );

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
          </div>
        </>
      )}
      {currentEPCPanel === EPCFormPanel.FORM && (
        <div className={classes.EPCForm}>
          <Typography variant="subtitle1">
            Marque na escala com que frequência você tem estes pensamentos
            quando sua dor esta forte.
          </Typography>
          <div className={classes.EPCFormItem}>
            <Typography id="question1" gutterBottom>
              Não posso mais suportar esta dor.
            </Typography>
            <Slider
              defaultValue={0}
              className={classes.EPCSlider}
              aria-labelledby="question1"
              step={1}
              valueLabelDisplay="auto"
              marks={marks}
              min={0}
              max={5}
            />
          </div>
          <div className={classes.EPCFormItem}>
            <Typography id="question2" gutterBottom>
              Não importa o que fizer minhas dores não mudarão.
            </Typography>
            <Slider
              defaultValue={0}
              className={classes.EPCSlider}
              aria-labelledby="question2"
              step={1}
              valueLabelDisplay="auto"
              marks={marks}
              min={0}
              max={5}
            />
          </div>
          <div className={classes.EPCFormItem}>
            <Typography id="question3" gutterBottom>
              Preciso tomar remédios para dor.
            </Typography>
            <Slider
              defaultValue={0}
              className={classes.EPCSlider}
              aria-labelledby="question3"
              step={1}
              valueLabelDisplay="auto"
              marks={marks}
              min={0}
              max={5}
            />
          </div>
          <div className={classes.EPCFormItem}>
            <Typography id="question4" gutterBottom>
              Isso nunca vai acabar.
            </Typography>
            <Slider
              defaultValue={0}
              className={classes.EPCSlider}
              aria-labelledby="question4"
              step={1}
              valueLabelDisplay="auto"
              marks={marks}
              min={0}
              max={5}
            />
          </div>
          <div className={classes.EPCFormItem}>
            <Typography id="question5" gutterBottom>
              Sou um caso sem esperança.
            </Typography>
            <Slider
              defaultValue={0}
              className={classes.EPCSlider}
              aria-labelledby="question5"
              step={1}
              valueLabelDisplay="auto"
              marks={marks}
              min={0}
              max={5}
            />
          </div>
          <div className={classes.EPCFormItem}>
            <Typography id="question6" gutterBottom>
              Quando ficarei pior novamente?
            </Typography>
            <Slider
              defaultValue={0}
              className={classes.EPCSlider}
              aria-labelledby="question6"
              step={1}
              valueLabelDisplay="auto"
              marks={marks}
              min={0}
              max={5}
            />
          </div>
          <div className={classes.EPCFormItem}>
            <Typography id="question7" gutterBottom>
              Essa dor esta me matando.
            </Typography>
            <Slider
              defaultValue={0}
              className={classes.EPCSlider}
              aria-labelledby="question7"
              step={1}
              valueLabelDisplay="auto"
              marks={marks}
              min={0}
              max={5}
            />
          </div>
          <div className={classes.EPCFormItem}>
            <Typography id="question8" gutterBottom>
              Eu não consigo mais continuar.
            </Typography>
            <Slider
              defaultValue={0}
              className={classes.EPCSlider}
              aria-labelledby="question8"
              step={1}
              valueLabelDisplay="auto"
              marks={marks}
              min={0}
              max={5}
            />
          </div>
          <div className={classes.EPCFormItem}>
            <Typography id="question9" gutterBottom>
              Essa dor esta me deixando maluco.
            </Typography>
            <Slider
              defaultValue={0}
              className={classes.EPCSlider}
              aria-labelledby="question9"
              step={1}
              valueLabelDisplay="auto"
              marks={marks}
              min={0}
              max={5}
            />
          </div>
          <div className={classes.EPCFooter}>
            <Button variant="contained" className={classes.EPCAppBar}>
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
