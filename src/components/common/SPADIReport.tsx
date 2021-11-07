import { useEffect, useMemo, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Slider from '@material-ui/core/Slider';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

import GenericTable from '../GenericTable';
import { PatientForm, PatientSPADIResult } from '../../models/PatientForm';
import { setDateIntoSPADITable, simpleColumns } from '../../utils/reportTable';
import { SPADIReportTableData } from '../../interfaces';

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
    slider: {
      textAlign: 'center',
      color: '#7A3FE1',
      width: '90%',
      marginLeft: '1rem',
    },
    sliderMakrLabel: {
      fontSize: '1rem',
    },
    sliderSubLabel: {
      whiteSpace: 'break-spaces',
      width: '50px',
      fontSize: '0.75rem',
      lineHeight: 1,
    },
    sectionElement: {
      height: '130px',
    },
  })
);

interface SPADIReportProps {
  data: PatientForm[];
  goToSummary: () => void;
}

function SPADIReport(props: SPADIReportProps) {
  const classes = useStyles();

  const [selectedForm, setSelectedForm] = useState<PatientForm>(
    props.data[props.data.length - 1]
  );
  const [rows, setRows] = useState<SPADIReportTableData[]>([]);

  const { answers, updated_at, disability, pain, total } = useMemo(() => {
    const { answers, results, updated_at } = selectedForm;
    const { disability, pain, total } = results as PatientSPADIResult;
    return {
      answers,
      updated_at,
      disability: disability.percentage,
      pain: pain.percentage,
      total: total.percentage,
    };
  }, [selectedForm]);

  useEffect(() => {
    setRows(setDateIntoSPADITable(props.data, setSelectedForm));
  }, [props.data, setSelectedForm]);

  const questions = [
    {
      title: 'Escala de incapacidade',
      subtitle:
        'Os números ao lado de cada item representam o grau de dificuldade que você teve ao fazer aquela atividade. O número zero representa "Sem dificuldade" e o número dez representa "Não consegui fazer". Por favor, indique o número que melhor descreve quanta dificuldade você teve para fazer cada uma das atividades na semana passada. Se você não teve a oportunidade de fazer uma das atividades na semana passada, por favor, tente estimar qual número você daria para sua dificuldade.',
      sections: [
        'Lavar seu cabelo com o braço afetado?',
        'Lavar suas costas como braço afetado?',
        'Vestir uma camiseta ou blusa pela cabeça',
        'Vestir uma camisa que abotoa na frente?',
        'Vestir suas calças?',
        'Colocar algo em uma prateleira alta com o braço afetado?',
        'Carregar um objeto pesado de 5kg (saco grande de arroz) com o braço afetado?',
        'Retirar algo do bolso de trás com o braço afetado?',
      ],
      alternatives: [
        { label: 'N/A', value: -1 },
        {
          label: (
            <>
              <Typography>0</Typography>
              <Typography className={classes.sliderSubLabel}>
                Sem dificuldade
              </Typography>
            </>
          ),
          value: 0,
        },
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 },
        { label: '6', value: 6 },
        { label: '7', value: 7 },
        { label: '8', value: 8 },
        { label: '9', value: 9 },
        {
          label: (
            <>
              <Typography>10</Typography>
              <Typography className={classes.sliderSubLabel}>
                Não consegui fazer
              </Typography>
            </>
          ),
          value: 10,
        },
      ],
    },
    {
      title: 'Escala de dor',
      subtitle:
        'Os números ao lado de cada item representam quanta dor você sente em cada situação. O número zero representa "Sem dor" e o número dez representa "A pior dor". Por favor, indique o número que melhor descreve quanta dor você sentiu durante a semana passada em cada uma das seguintes situações. Se você não teve a oportunidade de fazer uma das atividades na semana passada, por favor, tente estimar qual número você daria para sua dor.',
      sections: [
        'Qual foi a intensidade da sua dor quando foi a pior na semana passada?', //1
        'Quando se deitou em cima do braço afetado?', //2
        'Quando tentou pegfar algo em uma prateleira alta com o braço afetado?', //3
        'Quando tentou tocar a parte de trás do pescoço com o braço afetado?', //4
        'Quando tentou empurrar algo com o braço afetado?', //5
      ],
      alternatives: [
        { label: 'N/A', value: -1 },
        {
          label: (
            <>
              <Typography>0</Typography>
              <Typography className={classes.sliderSubLabel}>
                Sem dor
              </Typography>
            </>
          ),
          value: 0,
        },
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 },
        { label: '6', value: 6 },
        { label: '7', value: 7 },
        { label: '8', value: 8 },
        { label: '9', value: 9 },
        {
          label: (
            <>
              <Typography>10</Typography>
              <Typography className={classes.sliderSubLabel}>
                Pior dor
              </Typography>
            </>
          ),
          value: 10,
        },
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
            Índice de dor e incapacidade no ombro (SPADI)
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
            Índice de dor e incapacidade no ombro (SPADI)
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
                      className={classes.sectionElement}
                    >
                      <FormControl component="fieldset" fullWidth>
                        <FormLabel
                          component="legend"
                          className={classes.formLabel}
                        >
                          {section}
                        </FormLabel>
                        <Slider
                          defaultValue={answers[getRealIndex(qIndex, sIndex)]}
                          classes={{
                            root: classes.slider,
                            markLabel: classes.sliderMakrLabel,
                          }}
                          step={1}
                          valueLabelDisplay="auto"
                          marks={question.alternatives}
                          min={-1}
                          max={10}
                          disabled
                        />
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
                {`Escala de Incapacidade: ${disability}`}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="left">
                {`Escala de Dor: ${pain}`}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="left">
                {`Escala total: ${total}`}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default SPADIReport;
