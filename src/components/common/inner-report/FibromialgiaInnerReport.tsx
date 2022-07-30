import { useMemo } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Box from '@material-ui/core/Box';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

import { PatientFibromialgiaResult } from '../../../models/PatientForm';
import BodyMapFibromialgia from '../../patient/BodyMapFibromialgia';
import { InnerReportProps } from '../../../interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
    fibromialgiaDiagnosis: {
      color: deepOrange[500],
      margin: theme.spacing(2),
    },
    radioSpanLabel: {
      fontSize: '0.75rem',
    },
    radioLabel: {
      width: '50px',
      textAlign: 'center',
    },
    radioGroup: {
      justifyContent: 'center',
    },
  })
);

function FibromialgiaInnerReport({ selectedForm }: InnerReportProps) {
  const classes = useStyles();
  const { updated_at, body_pain, booleans, diagnosis, ess, idg } =
    useMemo(() => {
      const { results, updated_at } = selectedForm;
      const { body_pain, booleans, diagnosis, ess, idg } =
        results as PatientFibromialgiaResult;
      return { updated_at, body_pain, booleans, diagnosis, ess, idg };
    }, [selectedForm]);

  const questions = [
    {
      title: '',
      type: 'body_pain',
      sections: [
        'Regiões onde o paciente teve dor ou sensibilidade nos últimos 7 dias:',
      ],
      alternatives: [],
    },
    {
      title: '',
      type: 'idg',
      sections: ['Áreas onde o paciente teve dor ou sensibilidade:'],
      alternatives: [
        { label: 'Cinta de ombro esquerda', value: 0 },
        { label: 'Cinta de ombro direita', value: 1 },
        { label: 'Braço superior esquerdo', value: 2 },
        { label: 'Braço direito', value: 3 },
        { label: 'Braço inferior esquerdo', value: 4 },
        { label: 'Braço inferior direito', value: 5 },
        { label: 'Quadril (nádega), esquerda', value: 6 },
        { label: 'Quadril (nádega), direita', value: 7 },
        { label: 'Perna superior esquerda', value: 8 },
        { label: 'Perna superior, direita', value: 9 },
        { label: 'Perna inferior, esquerda', value: 10 },
        { label: 'Perna inferior, direita', value: 11 },
        { label: 'Mandíbula, esquerda', value: 12 },
        { label: 'Mandíbula, direita', value: 13 },
        { label: 'Peito', value: 14 },
        { label: 'Abdômen', value: 15 },
        { label: 'Pescoço', value: 16 },
        { label: 'Parte superior das costas', value: 17 },
        { label: 'Parte inferior das costas', value: 18 },
        { label: 'Nenhuma dessas áreas', value: 19 },
      ],
    },
    {
      title: 'Escala da gravidade dos sintomas por 7 dias',
      type: 'ess',
      sections: [
        'Fadiga',
        'Pensando ou lembrando do problema',
        'Levantar-se cansado (não satisfeito)',
      ],
      alternatives: [
        { label: 'Sem problemas', value: 1 },
        { label: 'Problema leve', value: 2 },
        { label: 'Problema moderado', value: 3 },
        { label: 'Problema sério', value: 4 },
      ],
    },
    {
      title:
        'Durante os últimos 6 meses, você teve algum dos seguintes sintomas?',
      type: 'booleans',
      sections: ['Fadiga', 'Depressão', 'Dor de cabeça'],
      alternatives: [
        { label: 'Sim', value: 1 },
        { label: 'Não', value: 0 },
      ],
    },
    {
      title: '',
      type: 'booleans',
      sections: [
        'Os sintomas são as questões 2 e 3 e a dor generalizada está presente em um nível semelhante por pelo menos 3 meses?',
      ],
      alternatives: [
        { label: 'Sim', value: 1 },
        { label: 'Não', value: 0 },
      ],
    },
    {
      title: '',
      type: 'booleans',
      sections: [
        'Você tem um distúrbio que, de outra forma, explicaria a dor?',
      ],
      alternatives: [
        { label: 'Sim', value: 1 },
        { label: 'Não', value: 0 },
      ],
    },
  ];

  const getBooleansRealIndex = (
    questionIndex: number,
    sectionIndex: number
  ) => {
    const booleansQuestions = questions.filter((q) => q.type === 'booleans');
    return booleansQuestions.reduce((acc, q, i) => {
      if (i < questionIndex - 3) {
        return acc + q.sections.length;
      } else if (i === questionIndex - 3) {
        return acc + sectionIndex;
      }
      return acc;
    }, 0);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} lg={9}>
        <Paper classes={{ root: classes.paper }}>
          <Typography variant="h6">FIBROMIALGIA</Typography>
          <Typography variant="caption" display="block">
            {`Preenchido em: ${new Date(updated_at).toLocaleDateString(
              'pt-BR'
            )}`}
          </Typography>
          <Grid container spacing={2}>
            {questions.map((question, qIndex) => (
              <Grid item xs={12} sm={6} key={`question${qIndex}`}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      {question.title}
                    </Typography>
                  </Grid>
                  {question.sections.map((section, sIndex) => (
                    <Grid
                      item
                      xs={12}
                      key={`question${qIndex}-section${sIndex}`}
                    >
                      <FormControl component="fieldset" fullWidth>
                        <FormLabel component="legend">{section}</FormLabel>

                        {question.type === 'body_pain' && (
                          <Box position="relative">
                            <BodyMapFibromialgia
                              disabledBodyMapClick
                              preSelectedValues={body_pain
                                .map((bodyPain) => bodyPain.area)
                                .reduce((acc, area) => {
                                  acc[area - 1] = 1;
                                  return acc;
                                }, new Array(19).fill(0))}
                            />
                          </Box>
                        )}
                        {question.type === 'idg' && (
                          <List>
                            {question.alternatives.map((alternative, aIndex) =>
                              idg[aIndex] === 'SIM' ? (
                                <ListItem key={`idg-alternative-${aIndex}`}>
                                  <Typography variant="body1" paragraph>
                                    {alternative.label}
                                  </Typography>
                                </ListItem>
                              ) : null
                            )}
                          </List>
                        )}
                        {question.type === 'ess' && (
                          <RadioGroup
                            row
                            aria-label={section}
                            name={`question${qIndex}-section${sIndex}`}
                            classes={{ row: classes.radioGroup }}
                          >
                            {question.alternatives.map(
                              (alternative, aIndex) => (
                                <FormControlLabel
                                  value={alternative.value}
                                  key={alternative.value}
                                  control={<Radio />}
                                  classes={{
                                    labelPlacementBottom: classes.radioLabel,
                                  }}
                                  label={
                                    <>
                                      <Typography
                                        paragraph
                                        className={classes.radioSpanLabel}
                                      >
                                        {alternative.value}
                                      </Typography>
                                      <Typography
                                        paragraph
                                        className={classes.radioSpanLabel}
                                      >
                                        {alternative.label}
                                      </Typography>
                                    </>
                                  }
                                  labelPlacement="bottom"
                                  checked={ess[aIndex] === alternative.value}
                                />
                              )
                            )}
                          </RadioGroup>
                        )}
                        {question.type === 'booleans' && (
                          <RadioGroup
                            row
                            aria-label={section}
                            name={`question${qIndex}-section${sIndex}`}
                            classes={{ row: classes.radioGroup }}
                          >
                            {question.alternatives.map((alternative) => (
                              <FormControlLabel
                                value={alternative.value}
                                key={alternative.value}
                                control={<Radio />}
                                classes={{
                                  labelPlacementBottom: classes.radioLabel,
                                }}
                                label={alternative.label}
                                labelPlacement="bottom"
                                checked={
                                  booleans[
                                    getBooleansRealIndex(qIndex, sIndex)
                                  ] === alternative.label.toUpperCase()
                                }
                              />
                            ))}
                          </RadioGroup>
                        )}
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
          <Grid container>
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                className={classes.fibromialgiaDiagnosis}
              >
                {diagnosis?.criteria}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="left">
                Índice de Dor Generalizada
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="caption"
                align="left"
                paragraph
              >{`Resultado: ${diagnosis?.idg_score}`}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="left">
                Escala de Severidade dos Sintomas
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="caption"
                align="left"
                paragraph
              >{`Resultado: ${diagnosis?.ess_score}`}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="left">
                Tem sintomas há mais de 3 meses?
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="caption"
                align="left"
                paragraph
              >{`Resultado: ${
                booleans?.length > 3 && booleans[3]
              }`}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default FibromialgiaInnerReport;
