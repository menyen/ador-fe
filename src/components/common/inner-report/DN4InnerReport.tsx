import { useMemo } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/core/Slider';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

import { PatientBasicResult } from '../../../models/PatientForm';
import { InnerReportProps } from '../../../interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
    form: {
      margin: theme.spacing(2),
      textAlign: 'left',
    },
    formItem: {
      margin: theme.spacing(3, 0, 6),
    },
    referenceInfo: {
      fontSize: '0.75rem',
      color: grey[500],
    },
    dn4Slider: {
      width: '80%',
    },
    formLabel: {
      width: '100%',
      textAlign: 'left',
    },
  })
);

function DN4InnerReport({ selectedForm }: InnerReportProps) {
  const classes = useStyles();

  const { answers, updated_at, scoreDN4, textDN4 } = useMemo(() => {
    const { answers, results, updated_at } = selectedForm;
    const { score, text } = results as PatientBasicResult;
    return { answers, updated_at, scoreDN4: score || 0, textDN4: text };
  }, [selectedForm]);

  const questions = [
    {
      title: 'A sua dor tem uma ou mais das seguintes características:',
      sections: ['Queimação', 'Sensação de frio dolorosa', 'Choque elétrico'],
    },
    {
      title:
        'Há presença de um ou mais dos seguintes sintomas na mesma área da sua dor:',
      sections: [
        'Formigamento',
        'Alfinetada e agulhada',
        'Adormecimento',
        'Coceira',
      ],
    },
    {
      title:
        'A dor está localizada em uma área onde o exame físico pode revelar uma ou mais das seguintes características:',
      sections: [
        'Hipoestesia (diminuição da sensibilidade) ao toque',
        'Hipoestesia (diminuição da sensibilidade) à picada de agulha',
      ],
    },
    {
      title: 'Na área dolorosa, a dor pode ser causada ou aumentada por:',
      sections: ['Escovação'],
    },
  ];

  const getRealIndex = (questionIndex: number, sectionIndex: number) => {
    return questions.reduce((acc, q, i) => {
      if (i < questionIndex) {
        return acc + q.sections.length;
      } else if (i === questionIndex) {
        return acc + sectionIndex;
      }
      return acc;
    }, 0);
  };

  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: scoreDN4,
      label: scoreDN4.toString(),
    },
    {
      value: 10,
      label: '10',
    },
  ];

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} lg={9}>
        <Paper classes={{ root: classes.paper }}>
          <Typography variant="h6">Dor Neuropática (DN4)</Typography>
          <Typography variant="caption" display="block">
            {`Preenchido em: ${new Date(updated_at).toLocaleDateString(
              'pt-BR'
            )}`}
          </Typography>
          <Grid container spacing={1}>
            {questions.map((question, qIndex) => (
              <Grid item xs={12} sm={6} key={`question${qIndex}`}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" align="left">
                      {`${qIndex + 1}. ${question.title}`}
                    </Typography>
                  </Grid>
                  {question.sections.map((section, sIndex) => (
                    <Grid
                      item
                      xs={12}
                      key={`question${qIndex}-section${sIndex}`}
                    >
                      <FormControl component="fieldset" fullWidth>
                        <FormLabel
                          component="legend"
                          className={classes.formLabel}
                        >
                          {section}
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-label={section}
                          name={`question${qIndex}-section${sIndex}`}
                        >
                          <FormControlLabel
                            value="1"
                            control={<Radio />}
                            label="Sim"
                            checked={
                              answers[getRealIndex(qIndex, sIndex)] === 1
                            }
                          />
                          <FormControlLabel
                            value="0"
                            control={<Radio />}
                            label="Não"
                            checked={
                              answers[getRealIndex(qIndex, sIndex)] === 0
                            }
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} lg={3}>
        <Paper classes={{ root: classes.paper }}>
          <Typography variant="h6">Resultado</Typography>
          <Slider
            defaultValue={scoreDN4}
            aria-labelledby="discrete-slider-custom"
            step={1}
            valueLabelDisplay="off"
            marks={marks}
            disabled
            max={10}
            className={classes.dn4Slider}
          />
          <Typography variant="subtitle1">{textDN4}</Typography>
        </Paper>
        <Paper classes={{ root: classes.paper }}>
          <Typography variant="h6">Referência</Typography>
          <Typography variant="body1" align="left">
            {'0 < 4 - Dor nociceptiva'}
          </Typography>
          <Typography variant="body1" align="left">
            {'≥ 4 - Dor Neuropática'}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default DN4InnerReport;
