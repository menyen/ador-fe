import { useEffect, useMemo, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

import GenericTable from '../GenericTable';
import { PatientBasicResult, PatientForm } from '../../models/PatientForm';
import { SimpleReportTableData } from '../../interfaces';
import { setDataIntoSimpleTable, simpleColumns } from '../../utils/reportTable';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '32px',
    },
    paper: {
      padding: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
    PSEQFormItem: {
      margin: theme.spacing(3, 0, 6),
    },
    PSEQSlider: {
      textAlign: 'center',
      color: '#329D63',
      width: '65%',
      marginLeft: '1rem',
    },
    ECPSliderLabel: {
      fontSize: '0.75rem',
    },
    sliderSubLabel: {
      whiteSpace: 'break-spaces',
      width: '50px',
      fontSize: '0.625rem',
      lineHeight: 1,
    },
    circularProgress: {
      margin: theme.spacing(4),
      color: deepOrange[500],
      position: 'absolute',
      left: 0,
    },
    circle: {
      strokeLinecap: 'round',
    },
    bottom: {
      margin: theme.spacing(4),
      color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
  })
);

interface PSEQReportProps {
  data: PatientForm[];
  goToSummary: () => void;
}

function PSEQReport(props: PSEQReportProps) {
  const classes = useStyles();
  const [selectedForm, setSelectedForm] = useState<PatientForm>(
    props.data[props.data.length - 1]
  );
  const [rows, setRows] = useState<SimpleReportTableData[]>([]);

  const { answers, updated_at, scorePSEQ, textPSEQ } = useMemo(() => {
    const { answers, results, updated_at } = selectedForm;
    const { score, text } = results as PatientBasicResult;
    return { answers, updated_at, scorePSEQ: score || 0, textPSEQ: text };
  }, [selectedForm]);

  useEffect(() => {
    setRows(setDataIntoSimpleTable(props.data, setSelectedForm));
  }, [props.data, setSelectedForm]);

  const questions = [
    'Eu posso aproveitar as coisas, apesar da dor.', //1
    'Eu posso fazer a maioria das tarefas domésticas (por exemplo, arrumar, lavar louça, etc), apesar da dor.', //2
    'Eu posso socializar com meus amigos ou familiares como eu costumava fazer, apesar da dor.', //3
    'Eu posso lidar com a minha dor na maioria das situações.', //4
    'Eu posso fazer alguma forma de trabalho, apesar da dor. (“Trabalho” inclui tarefas domésticas, trabalho remunerado e não remunerado).', //5
    'Eu ainda posso fazer muitas das coisas que eu gosto de fazer, como hobbies ou atividades de lazer, apesar da dor.', //6
    'Eu posso lidar com a dor sem medicação', //7
    'Eu ainda posso realizar a maioria dos meus objetivos na vida, apesar da dor.', //8
    'Eu posso viver um estilo de vida normal, apesar da dor.', //9
    'Eu posso gradualmente me tornar mais ativo, apesar da dor.', //10
  ];
  const marks = [
    {
      value: 0,
      label: (
        <>
          <Typography>0</Typography>
          <Typography className={classes.sliderSubLabel}>
            Completamente confiante
          </Typography>
        </>
      ),
    },
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    {
      value: 6,
      label: (
        <>
          <Typography>6</Typography>
          <Typography className={classes.sliderSubLabel}>
            Não completamente confiante
          </Typography>
        </>
      ),
    },
  ];

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    props.goToSummary();
  }

  return (
    <Grid container spacing={1} className={classes.root}>
      <Grid item xs={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/" onClick={handleClick}>
            Resultados
          </Link>
          <Typography color="textPrimary">
            Escala de pensamento catastrófico
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
          <Typography variant="h6">Autoeficácia da dor (PSEQ)</Typography>
          <Typography variant="caption" display="block">
            {`Preenchido em: ${new Date(updated_at).toLocaleDateString(
              'pt-BR'
            )}`}
          </Typography>
          <Grid container spacing={1}>
            {questions.map((question, index) => (
              <Grid item xs={6} key={`question-${index}`}>
                <div className={classes.PSEQFormItem} key={`question_${index}`}>
                  <Typography
                    id={`question_${index}`}
                    className={classes.ECPSliderLabel}
                    gutterBottom
                  >
                    {`${index + 1}. ${question}`}
                  </Typography>
                  <Slider
                    aria-labelledby={`question_${index}`}
                    value={answers[index]}
                    className={classes.PSEQSlider}
                    step={1}
                    valueLabelDisplay="auto"
                    marks={marks}
                    min={0}
                    max={6}
                    disabled
                  />
                </div>
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
                {`Total de pontos: ${scorePSEQ}`}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="left">
                {`Resultado: ${textPSEQ}`}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default PSEQReport;
