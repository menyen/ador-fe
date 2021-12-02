import { useMemo } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { PatientBPIResult } from '../../../models/PatientForm';
import BodyMapBPI from '../../patient/BodyMapBPI';
import { InnerReportProps } from '../../../interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
    slider: {
      margin: '30px 0',
    },
    divider: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
    },
  })
);

function BPIInnerReport({ selectedForm }: InnerReportProps) {
  const classes = useStyles();

  const gradesLabels = [
    'Pior dor que sentiu nas últimas 24 horas:',
    'Dor mais fraca das últimas 24 horas:',
    'Média de dor do paciente:',
    'Dor do momento:',
  ];
  const percentagesLabels = [
    'Atividades em geral',
    'Humor',
    'Habilidade de caminhar',
    'Trabalho',
    'Relacionamento com outras pessoas',
    'Habilidade para apreciar a vida',
  ];

  const { updated_at, body_pain, grades, treatments, slider, percentages } =
    useMemo(() => {
      const { answers, results, updated_at } = selectedForm;
      const { booleans, body_pain, grades, treatments, slider, percentages } =
        results as PatientBPIResult;
      return {
        answers,
        updated_at,
        booleans,
        body_pain,
        grades,
        treatments,
        slider,
        percentages,
      };
    }, [selectedForm]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={9}>
        <Paper classes={{ root: classes.paper }}>
          <Typography variant="h6">Breve Inventário de Dor (BPI)</Typography>
          <Typography variant="caption">
            {`Preenchido em: ${new Date(updated_at).toLocaleDateString(
              'pt-BR'
            )}`}
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <BodyMapBPI
                disabledBodyMapClick={true}
                preSelectedValues={body_pain?.reduce((acc, body) => {
                  acc[body.area - 1] = body.pain_level;
                  return acc;
                }, new Array(53).fill(0))}
              />
            </Grid>
            <Grid item xs={5}>
              {grades?.map((grade, gradeIndex) => (
                <div key={`grade-${gradeIndex}`}>
                  <Typography variant="subtitle1">
                    {gradesLabels[gradeIndex]}
                  </Typography>
                  <Slider
                    defaultValue={0}
                    classes={{
                      root: classes.slider,
                    }}
                    step={1}
                    valueLabelDisplay="on"
                    marks={[
                      { label: 'Sem dor', value: 0 },
                      { label: 'Pior dor', value: 10 },
                    ]}
                    min={0}
                    max={10}
                    disabled={true}
                    value={grade}
                  />
                </div>
              ))}
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              {treatments?.map((treatment, treatmentIndex) => (
                <div key={`treatment=${treatmentIndex}`}>
                  <Typography variant="subtitle1">{`Tratamento ${
                    treatmentIndex + 1
                  }`}</Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Nome do tratamento"
                        secondary={treatment?.name}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Quando iniciou?"
                        secondary={treatment?.started_at}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Qual a dose/frequência do tratamento?"
                        secondary={treatment?.frequency}
                      />
                    </ListItem>
                  </List>
                  <Divider className={classes.divider} variant="middle" />
                </div>
              ))}
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">
                Como a dor interferiu nas últimas 24 horas em:
              </Typography>
              <List>
                {percentages?.map((percentage, percentageIndex) => (
                  <ListItem key={`percentage-${percentageIndex}`}>
                    <ListItemText
                      primary={percentagesLabels[percentageIndex]}
                      secondary={percentage}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="left" paragraph>
                {`Intensidade da melhora proporcionada pelos tratamentos ou medicações nas últimas 24 horas: ${slider}`}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default BPIInnerReport;
