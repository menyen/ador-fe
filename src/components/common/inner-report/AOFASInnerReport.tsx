import { useMemo } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { PatientAOFASResult } from '../../../models/PatientForm';
import { InnerReportProps } from '../../../interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
    hadTextResult: {
      margin: theme.spacing(1),
    },
  })
);

function AOFASInnerReport({ selectedForm }: InnerReportProps) {
  const classes = useStyles();

  const { answers, updated_at, pain_score, function_score, alignment_score, percentage } = useMemo(() => {
    const { answers, results, updated_at } = selectedForm;
    const { pain_score, function_score, alignment_score, total: { percentage } } = results as PatientAOFASResult;
    return {
      answers,
      updated_at,
      pain_score,
      function_score,
      alignment_score,
      percentage,
    };
  }, [selectedForm]);

  const questions = [
    {
      title: 'Dor',
      alternatives: [
        { label: 'Nenhuma', value: 1 },
        { label: 'Leve, ocasional', value: 2 },
        { label: 'Moderada, diária', value: 3 },
        { label: 'Intensa, quase sempre presente', value: 4 },
      ],
    },
    {
      title:
        'Funcional: Limitação nas atividades, necessidade de suporte',
      alternatives: [
        { label: 'Sem limitação, sem suporte', value: 1 },
        { label: 'Sem limitação nas atividades diárias, limitação nas atividades recreacionais, sem suporte', value: 2 },
        { label: 'Limitação nas atividades diárias e recreacionais, bengala', value: 3 },
        { label: 'Limitação intensa nas atividades diárias e recreacionais, andador, muletas, cadeira-de-rodas, órtese (tornozeleira, imobilizador de tornozelo)', value: 4 },
      ],
    },
    {
      title:
        'Funcional: Distância máxima de caminhada, quarteirões',
      alternatives: [
        { label: 'Mais que 6', value: 1 },
        { label: 'De 4 a 6', value: 2 },
        { label: 'De 1 a 3', value: 3 },
        { label: 'Menos que 1', value: 4 },
      ],
    },
    {
      title: 'Funcional: Superfícies de caminhada',
      alternatives: [
        { label: 'Sem dificuldade em qualquer superfície', value: 1 },
        { label: 'Alguma dificuldade em terrenos irregulares, escadas, inclinações e ladeiras', value: 2 },
        { label: 'Dificuldade intensa em terrenos irregulares, escadas, inclinações e ladeiras', value: 3 },
      ],
    },
    {
      title: 'Funcional: Anormalidade na marcha',
      alternatives: [
        { label: 'Nenhuma, leve', value: 1 },
        { label: 'Evidente', value: 2 },
        { label: 'Acentuada', value: 3 },
      ],
    },
    {
      title: 'Funcional: Mobilidade sagital (flexão + extensão)',
      alternatives: [
        { label: 'Normal ou levemente restrito (30° ou mais)', value: 1 },
        { label: 'Restrição moderada (15° - 29°)', value: 2 },
        { label: 'Restrição intensa (menor que 15°)', value: 3 },
      ],
    },
    {
      title: 'Funcional: Mobilidade do Retro-Pé (inversão + eversão)',
      alternatives: [
        { label: 'Normal ou levemente restrito (75 - 100% do normal)', value: 1 },
        { label: 'Restrição moderada (25 - 74% do normal)', value: 2 },
        { label: 'Restrição intensa (menos que 25% dor normal)', value: 3 },
      ],
    },
    {
      title: 'Funcional: Estabilidade do tornozelo e retro-pé (anteroposterior, varo-valgo)',
      alternatives: [
        { label: 'Estável', value: 1 },
        { label: 'Instável', value: 2 },
      ],
    },
    {
      title:
        'Alinhamento',
      alternatives: [
        { label: 'Bom, pé plantígrado, ante-pé e retro-pé bem alinhado', value: 1 },
        { label: 'Regular, pé plantígrado, algum grau de desalinhamento do tornozelo e retro-pé, sem sintomas', value: 2 },
        { label: 'Ruim, pé não plantígrado, desalinhamento intenso e sintomático', value: 3 },
      ],
    },
  ];

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} lg={9}>
        <Paper classes={{ root: classes.paper }}>
          <Typography variant="h6">AOFAS</Typography>
          <Typography variant="caption" display="block">
            {`Preenchido em: ${new Date(updated_at).toLocaleDateString(
              'pt-BR'
            )}`}
          </Typography>
          <Grid container spacing={2}>
            {questions.map((question, qIndex) => (
              <Grid item xs={6} key={`question${qIndex}`}>
                <Typography variant="body1" align="left">
                  {`${qIndex + 1}. ${question.title}`}
                </Typography>
                <Typography variant="body1" align="left">
                  - {
                    question.alternatives.find(
                      (alt) => answers[qIndex] === alt.value
                    )?.label
                  }
                </Typography>
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
              <Typography variant="subtitle1" align="left">Escala de dor</Typography>
              <Typography variant="caption" paragraph align="left">{`Resultado: ${pain_score}`}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="left">Escala funcional</Typography>
              <Typography variant="caption" paragraph align="left">{`Resultado: ${function_score}`}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="left">Escala de alinhamento</Typography>
              <Typography variant="caption" paragraph align="left">{`Resultado: ${alignment_score}`}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="left">Total</Typography>
              <Typography variant="caption" paragraph align="left">{`Resultado: ${percentage}`}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default AOFASInnerReport;
