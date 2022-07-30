import { useMemo } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { PatientSBSTResult } from '../../../models/PatientForm';
import { InnerReportProps } from '../../../interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
    radioGroup: {
      justifyContent: 'center',
    },
  })
);

function SBSTInnerReport({ selectedForm }: InnerReportProps) {
  const classes = useStyles();

  const { answers, updated_at, result, total_points, psychosocial_points } =
    useMemo(() => {
      const { answers, results, updated_at } = selectedForm;
      const { result, total_points, psychosocial_points } =
        results as PatientSBSTResult;
      return { answers, updated_at, result, total_points, psychosocial_points };
    }, [selectedForm]);

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

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} lg={9}>
        <Paper classes={{ root: classes.paper }}>
          <Typography variant="h6">Start Back Screening Tool (SBST)</Typography>
          <Typography variant="caption" display="block">
            {`Preenchido em: ${new Date(updated_at).toLocaleDateString(
              'pt-BR'
            )}`}
          </Typography>
          <Grid container spacing={1}>
            {questions.map((question, index) => (
              <Grid item xs={12} sm={6} key={`question-${index}`}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    {`${index + 1}. ${question}`}
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-label={question}
                    name={`question_${index}`}
                    classes={{ row: classes.radioGroup }}
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
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} lg={3}>
        <Paper classes={{ root: classes.paper }}>
          <Typography variant="h6">Resultado</Typography>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="left">
                {`Total de pontos: ${total_points}`}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="left">
                {`Subescala psicossocial: ${psychosocial_points}`}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="left">
                {`Resultado: ${result}`}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default SBSTInnerReport;
