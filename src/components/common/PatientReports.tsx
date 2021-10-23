import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { PatientForm } from '../../models/PatientForm';
import PatientSummary from './PatientSummary';
import { PatientReportPanelType } from '../../interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '32px',
    },
    paper: {
      padding: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
    EPCFormItem: {
      margin: theme.spacing(3, 0, 6),
    },
    EPCSlider: {
      textAlign: 'center',
      color: '#329D63',
      width: '90%',
      marginLeft: '1rem',
    },
    sliderSubLabel: {
      whiteSpace: 'break-spaces',
      width: '50px',
      fontSize: '0.75rem',
      lineHeight: 1,
    },
  })
);

interface EPCReportProps {
  answers: number[];
}

function EPCReport(props: EPCReportProps) {
  const classes = useStyles();

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
    <Grid container spacing={1} className={classes.root}>
      <Grid item xs={9}>
        <Paper classes={{ root: classes.paper }}>
          {questions.map((question, index) => (
            <div className={classes.EPCFormItem} key={`question_${index}`}>
              <Typography id={`question_${index}`} gutterBottom>
                {question}
              </Typography>
              <Slider
                aria-labelledby={`question_${index}`}
                defaultValue={props.answers[index]}
                className={classes.EPCSlider}
                step={1}
                valueLabelDisplay="auto"
                marks={marks}
                min={0}
                max={5}
                disabled
              />
            </div>
          ))}
        </Paper>
      </Grid>
      <Grid item xs={3}></Grid>
    </Grid>
  );
}

interface PatientReportsProps {
  questionaires: PatientForm[];
}

function PatientReports(props: PatientReportsProps) {
  const { questionaires } = props;
  const [panel, setPanel] = useState<PatientReportPanelType>(
    PatientReportPanelType.Summary
  );

  const epcForms = questionaires?.filter(
    (q) => q.type === 'EPC' && q.status === 'DONE'
  );
  const epcLatestForm = epcForms && epcForms[epcForms.length - 1];

  return (
    <div>
      {panel === PatientReportPanelType.Summary && (
        <PatientSummary {...props} setReportPanel={setPanel} />
      )}
      {panel === PatientReportPanelType.EPC && (
        <EPCReport answers={epcLatestForm.answers} />
      )}
    </div>
  );
}

export default PatientReports;
