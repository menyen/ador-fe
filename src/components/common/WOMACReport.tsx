import { useEffect, useMemo, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

import GenericTable from '../GenericTable';
import { PatientForm, PatientWOMACResult } from '../../models/PatientForm';
import { setDateIntoWOMACTable, simpleColumns } from '../../utils/reportTable';
import { SimpleReportTableData } from '../../interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '32px',
    },
    paper: {
      padding: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
    form: {
      margin: theme.spacing(2),
      textAlign: 'left',
    },
    referenceInfo: {
      fontSize: '0.75rem',
      color: grey[500],
    },
    formLabel: {
      width: '100%',
      textAlign: 'left',
    },
    radioSpanLabel: {
      fontSize: '0.75rem',
    },
  })
);

interface WOMACReportProps {
  data: PatientForm[];
  goToSummary: () => void;
}

function WOMACReport(props: WOMACReportProps) {
  const classes = useStyles();

  const [selectedForm, setSelectedForm] = useState<PatientForm>(
    props.data[props.data.length - 1]
  );
  const [rows, setRows] = useState<SimpleReportTableData[]>([]);

  const {
    answers,
    updated_at,
    function_index,
    pain_index,
    stiffness_index,
    total_index,
    total_percentage,
    total_ratio,
  } = useMemo(() => {
    const { answers, results, updated_at } = selectedForm;
    const {
      function_index,
      pain_index,
      stiffness_index,
      total_index,
      total_percentage,
      total_ratio,
    } = results as PatientWOMACResult;
    return {
      answers,
      updated_at,
      function_index,
      pain_index,
      stiffness_index,
      total_index,
      total_percentage,
      total_ratio,
    };
  }, [selectedForm]);

  useEffect(() => {
    setRows(setDateIntoWOMACTable(props.data, setSelectedForm));
  }, [props.data, setSelectedForm]);

  const questions = [
    {
      title: 'Qual a intensidade da sua dor para as seguintes atividades?',
      sections: [
        'Caminhando em lugar plano.',
        'Subindo ou descendo escadas.',
        'A noite deitado na cama.',
        'Sentando-se ou deitando-se.',
        'Ficando em pé.',
      ],
    },
    {
      title: '',
      sections: [
        'Qual a intensidade de sua rigidez logo após acordar de manhã?',
        'Qual a intensidade de sua rigidez após de sentar, se deitar ou repousar no decorrer do dia?',
      ],
    },
    {
      title:
        'Qual o grau de dificuldade que você tem ao realizar as seguintes atividades?',
      sections: [
        'Descer escadas.', //1
        'Subir escadas.', //2
        'Levantar-se estando sentada.', //3
        'Ficar em pé.', //4
        'Abaixar-se para pegar algo.', //5
        'Andar no plano.', //6
        'Entrar e sair do carro.', //7
        'Ir fazer compras.', //8
        'Colocar meias.', //9
        'Levantar-se da cama.', //10
        'Tirar as meias.', //11
        'Ficar deitado na cama.', //12
        'Entrar e sair do banho.', //13
        'Se sentar.', //14
        'Sentar e levantar do vaso sanitário.', //15
        'Fazer tarefas domésticas pesadas.', //16
        'Fazer tarefas domésticas leves.', //17
      ],
    },
  ];

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    props.goToSummary();
  }

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

  return (
    <Grid container spacing={1} className={classes.root}>
      <Grid item xs={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/" onClick={handleClick}>
            Resultados
          </Link>
          <Typography color="textPrimary">
            Qualidade de vida específico para osteoartrose WOMAC (Western
            Ontario McMaster Universities)
          </Typography>
        </Breadcrumbs>
      </Grid>
      <Grid item xs={12}>
        <GenericTable
          columns={simpleColumns}
          rows={rows}
          shouldHideCheckboxes
        />
      </Grid>
      <Grid item xs={9}>
        <Paper classes={{ root: classes.paper }}>
          <Typography variant="h6">
            Qualidade de vida específico para osteoartrose WOMAC (Western
            Ontario McMaster Universities)
          </Typography>
          <Typography variant="caption" display="block">
            {`Preenchido em: ${new Date(updated_at).toLocaleDateString(
              'pt-BR'
            )}`}
          </Typography>
          <Grid container spacing={1}>
            {questions.map((question, qIndex) => (
              <Grid item xs={6} key={`question${qIndex}`}>
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
                            value="0"
                            control={<Radio />}
                            label="Nenhum"
                            checked={
                              answers[getRealIndex(qIndex, sIndex)] === 0
                            }
                            classes={{
                              label: classes.radioSpanLabel,
                            }}
                            labelPlacement="bottom"
                          />
                          <FormControlLabel
                            value="1"
                            control={<Radio />}
                            label="Pouca"
                            checked={
                              answers[getRealIndex(qIndex, sIndex)] === 1
                            }
                            classes={{
                              label: classes.radioSpanLabel,
                            }}
                            labelPlacement="bottom"
                          />
                          <FormControlLabel
                            value="2"
                            control={<Radio />}
                            label="Moderada"
                            checked={
                              answers[getRealIndex(qIndex, sIndex)] === 2
                            }
                            classes={{
                              label: classes.radioSpanLabel,
                            }}
                            labelPlacement="bottom"
                          />
                          <FormControlLabel
                            value="3"
                            control={<Radio />}
                            label="Intensa"
                            checked={
                              answers[getRealIndex(qIndex, sIndex)] === 3
                            }
                            classes={{
                              label: classes.radioSpanLabel,
                            }}
                            labelPlacement="bottom"
                          />
                          <FormControlLabel
                            value="4"
                            control={<Radio />}
                            label="Muito intensa"
                            checked={
                              answers[getRealIndex(qIndex, sIndex)] === 4
                            }
                            classes={{
                              label: classes.radioSpanLabel,
                            }}
                            labelPlacement="bottom"
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
      <Grid item xs={3}>
        <Paper classes={{ root: classes.paper }}>
          <Typography variant="h6">Resultado</Typography>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="left">
                {`Índice funcional: ${function_index}`}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="left">
                {`Índice de dor: ${pain_index}`}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="left">
                {`Índice de rigidez: ${stiffness_index}`}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="left">
                {`Índice total: ${total_index}`}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="left">
                {`Porcentagem total: ${total_percentage}`}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="left">
                {`Coeficiente total: ${total_ratio}`}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default WOMACReport;
