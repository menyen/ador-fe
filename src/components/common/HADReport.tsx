import { useEffect, useMemo, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import GenericTable from '../GenericTable';
import { PatientForm, PatientHADResult } from '../../models/PatientForm';
import { HADReportTableData } from '../../interfaces';
import { setDataIntoHADTable, simpleColumns } from '../../utils/reportTable';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '32px',
    },
    paper: {
      padding: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
    hadTextResult: {
      margin: theme.spacing(1),
    },
  })
);

interface HADReportProps {
  data: PatientForm[];
  goToSummary: () => void;
}

function HADReport(props: HADReportProps) {
  const classes = useStyles();

  const [selectedForm, setSelectedForm] = useState<PatientForm>(
    props.data[props.data.length - 1]
  );
  const [rows, setRows] = useState<HADReportTableData[]>([]);

  const { answers, updated_at, ansiedade, depressao } = useMemo(() => {
    const { answers, results, updated_at } = selectedForm;
    const { ansiedade, depressao } = results as PatientHADResult;
    return {
      answers,
      updated_at,
      ansiedade,
      depressao,
    };
  }, [selectedForm]);

  useEffect(() => {
    setRows(setDataIntoHADTable(props.data, setSelectedForm));
  }, [props.data, setSelectedForm]);

  const questions = [
    {
      title: 'A- Eu me sinto tenso ou contraído',
      alternatives: [
        { label: 'A maior parte do tempo', value: 3 },
        { label: 'Boa parte do tempo', value: 2 },
        { label: 'De vez em quando', value: 1 },
        { label: 'Nunca', value: 0 },
      ],
    },
    {
      title:
        'D- Eu ainda sinto gosto (satisfação) pelas mesmas coisas de que costumava gostar',
      alternatives: [
        { label: 'Sim, do mesmo jeito que antes', value: 0 },
        { label: 'Não tanto quanto antes', value: 1 },
        { label: 'Só um pouco', value: 2 },
        { label: 'Já não sinto mais prazer em nada', value: 3 },
      ],
    },
    {
      title:
        'A- Eu sinto um espécie de medo, como se alguma coisa ruim fosse acontecer',
      alternatives: [
        { label: 'Sim, de um jeito muito forte', value: 3 },
        { label: 'Sim, mas não tão forte', value: 2 },
        { label: 'Um pouco, mas isso não me preocupa', value: 1 },
        { label: 'Não sinto nada disso', value: 0 },
      ],
    },
    {
      title: 'D- Dou risada e me divirto quando vejo coisas engraçadas',
      alternatives: [
        { label: 'Sim, do mesmo jeito que antes', value: 0 },
        { label: 'Atualmente u pouco menos', value: 1 },
        { label: 'Atualmente bem menos', value: 2 },
        { label: 'Não consigo mais', value: 3 },
      ],
    },
    {
      title: 'A- Estou com a cabeça cheia de preocupações',
      alternatives: [
        { label: 'A maior parte do tempo', value: 3 },
        { label: 'Boa parte do tempo', value: 2 },
        { label: 'De vez em quando', value: 1 },
        { label: 'Raramente', value: 0 },
      ],
    },
    {
      title: 'D- Eu me sinto alegre',
      alternatives: [
        { label: 'A maior parte do tempo', value: 0 },
        { label: 'Muitas vezes', value: 1 },
        { label: 'Poucas vezes', value: 2 },
        { label: 'Nunca', value: 3 },
      ],
    },
    {
      title: 'A- Consigo ficar sentado á vontade e me sentir relaxado',
      alternatives: [
        { label: 'Nunca', value: 3 },
        { label: 'Poucas vezes', value: 2 },
        { label: 'Muitas vezes', value: 1 },
        { label: 'Sim, quase sempre', value: 0 },
      ],
    },
    {
      title: 'D- Estou lento (lerdo) para pensar e fazer as coisas',
      alternatives: [
        { label: 'Nunca', value: 0 },
        { label: 'De vez em quando', value: 1 },
        { label: 'Muitas vezes', value: 2 },
        { label: 'Quase sempre', value: 3 },
      ],
    },
    {
      title:
        'A- Tenho uma sensação ruim de medo (como um frio na espinha ou um aperto no estômago)',
      alternatives: [
        { label: 'Quase sempre', value: 3 },
        { label: 'Muitas vezes', value: 2 },
        { label: 'De vez em quando', value: 1 },
        { label: 'Nunca', value: 0 },
      ],
    },
    {
      title: 'D- Eu perdi o interesse em cuidar da minha aparência',
      alternatives: [
        { label: 'Cuido-me do mesmo jeito que antes', value: 0 },
        { label: 'Talvez não tanto quanto antes', value: 1 },
        { label: 'Não estou mais me cuidando como eu deveria', value: 2 },
        { label: 'Completamente', value: 3 },
      ],
    },
    {
      title:
        'A- Eu me sinto inquieto, como se eu não pudesse ficar parado em nenhum lugar',
      alternatives: [
        { label: 'Sim, demais', value: 3 },
        { label: 'Bastante', value: 2 },
        { label: 'Muitas vezes', value: 1 },
        { label: 'Quase sempre', value: 0 },
      ],
    },
    {
      title: 'D- Fico esperando animado as coisas boas que estão por vir',
      alternatives: [
        { label: 'Do mesmo jeito que antes', value: 0 },
        { label: 'Um pouco menos que antes', value: 1 },
        { label: 'Bem menos do que antes', value: 2 },
        { label: 'Quase nunca', value: 3 },
      ],
    },
    {
      title: 'A- De repente, tenho a sensação de entrar em pânico',
      alternatives: [
        { label: 'A quase todo tempo', value: 3 },
        { label: 'Várias vezes', value: 2 },
        { label: 'De vez em quando', value: 1 },
        { label: 'Não sinto isso', value: 0 },
      ],
    },
    {
      title:
        'D- Consigo sentir prazer ao assistir a um bom programa de TV, de rádio ou quando leio alguma coisa',
      alternatives: [
        { label: 'Quase sempre', value: 0 },
        { label: 'Várias vezes', value: 1 },
        { label: 'Poucas vezes', value: 2 },
        { label: 'Quase nunca', value: 3 },
      ],
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
          <Typography color="textPrimary">HAD</Typography>
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
          <Typography variant="h6">HAD</Typography>
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
                  {
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
      <Grid item xs={3}>
        <Paper classes={{ root: classes.paper }}>
          <Typography variant="h6">Resultado</Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Ansiedade</Typography>
              <Typography variant="caption">{`Resultado: ${ansiedade?.score}`}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" className={classes.hadTextResult}>
                {ansiedade?.text}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Depressão</Typography>
              <Typography variant="caption">{`Resultado: ${depressao?.score}`}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" className={classes.hadTextResult}>
                {depressao?.text}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <Paper classes={{ root: classes.paper }}>
          <Typography variant="h6">Referência Ansiedade</Typography>
          <Typography variant="body1" align="left">
            {'≥ 8 - POSITIVO'}
          </Typography>
        </Paper>
        <Paper classes={{ root: classes.paper }}>
          <Typography variant="h6">Referência Depressão</Typography>
          <Typography variant="body1" align="left">
            {'≥ 9 - POSITIVO'}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default HADReport;
