import { useEffect, useMemo, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import LinearProgress from '@material-ui/core/LinearProgress';
import {
  makeStyles,
  createStyles,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

import GenericTable from '../GenericTable';
import { PatientBasicResult, PatientForm } from '../../models/PatientForm';
import { setDataIntoSimpleTable, simpleColumns } from '../../utils/reportTable';
import { ReportPageProps, SimpleReportTableData } from '../../interfaces';

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: deepOrange[500],
    },
  })
)(LinearProgress);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '32px',
    },
    paper: {
      padding: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
    oswLinearProgress: {
      margin: theme.spacing(1),
    },
    oswPercentage: {
      color: deepOrange[500],
    },
  })
);

function OswestryReport(props: ReportPageProps) {
  const classes = useStyles();

  const [selectedForm, setSelectedForm] = useState<PatientForm>(
    props.data[props.data.length - 1]
  );
  const [rows, setRows] = useState<SimpleReportTableData[]>([]);

  const { answers, updated_at, scoreOswestry, textOswestry } = useMemo(() => {
    const { answers, results, updated_at } = selectedForm;
    const { score, text } = results as PatientBasicResult;
    return {
      answers,
      updated_at,
      scoreOswestry: score || 0,
      textOswestry: text,
    };
  }, [selectedForm]);

  useEffect(() => {
    setRows(setDataIntoSimpleTable(props.data, setSelectedForm));
  }, [props.data, setSelectedForm]);

  const questions = [
    {
      title: 'Seção 1 - Intensidade da dor',
      alternatives: [
        'Posso tolerar a dor que estou sentindo sem ter que  tomar analgésicos',
        'A dor é forte, mas suporto-a sem tomar analgésicos',
        'Os analgésicos aliviam completamente a dor',
        'Os analgésicos aliviam moderadamente a dor',
        'Os analgésicos aliviam muito pouco a dor',
        'Os analgésicos não afetam de forma alguma a dor e não os estou tomando',
      ],
    },
    {
      title: 'Seção 2 - Cuidados pessoais (lavar-se, vestir-se, etc)',
      alternatives: [
        'Posso me cuidar normalmente sem que isso cause mais dor',
        'Posso me cuidar normalmente, mas isso causa mais dor',
        'Dói para eu me cuidar e eu sou lento e cuidadoso',
        'Preciso de alguma ajuda, mas consigo realizar a maioria dos meus cuidados pessoais',
        'Preciso de ajuda todos os dias para a maioria dos meus cuidados pessoais',
        'Não consigo me vestir, me lavo com dificuldades e fico na cama',
      ],
    },
    {
      title: 'Seção 3 - Levantar pesos',
      alternatives: [
        'Posso levantar pesos consideráveis sem sentir mais dor',
        'Posso levantar pesos consideráveis, mas isso causa mais dor',
        'A dor me impede de levantar coisas pesadas, mas posso levantá-las se bem posicionadas. Ex: Em cima de uma mesa',
        'A dor me impede de levantar pesos consideráveis, mas posso levantar pesos leves a médios, se estiverem posicionados convenientemente',
        'Posso levantar somente pesos bem leves',
        'Não posso levantar ou carregar nada',
      ],
    },
    {
      title: 'Seção 4 - Caminhar',
      alternatives: [
        'A dor não me impede de andar qualquer distância',
        'A dor me impede de andar mais de 1,6 quilômetros',
        'A dor me impede de andar mais de 800 metros',
        'A dor me impede de andar mais de 400 metros',
        'Posso andar somente com uma bengala ou muletas',
        'Fico na cama a maior parte do tempo e tenho que me arrastar para ir ao banheiro',
      ],
    },
    {
      title: 'Seção 5 - Sentar',
      alternatives: [
        'Posso me sentar em qualquer cadeira, por quanto tempo quiser',
        'Só posso me sentar na minha cadeira favorita, por quanto tempo quiser',
        'A dor me impede de sentar por mais de 1 hora',
        'A dor me impede de sentar por mais de meia hora',
        'A dor me impede de sentar por mais de 10 minutos',
        'A dor me impede completamente de sentar',
      ],
    },
    {
      title: 'Seção 6 - Ficar em pé',
      alternatives: [
        'Posso ficar em pé o quanto tempo quiser, sem sentir mais dor',
        'Posso ficar em pé o quanto tempo quiser, mas isso me causa mais dor',
        'A dor me impede de ficar em pé por mais de 1 hora',
        'A dor me impede de ficar em pé por mais de 30 minutos',
        'A dor me impede de ficar em pé por mais de 10 minutos',
        'A dor me impede completamente de ficar em pé',
      ],
    },
    {
      title: 'Seção 7 - Dormir',
      alternatives: [
        'A dor não me impede de dormir bem',
        'Só posso dormir bem tomando comprimidos',
        'Mesmo quando tomo os comprimidos, só consigo dormir menos de seis horas',
        'Mesmo quando tomo os comprimidos, só consigo dormir menos de quatro horas',
        'Mesmo quando tomo os comprimidos, só consigo dormir menos de duas horas',
        'A dor me impede completamente de dormir',
      ],
    },
    {
      title: 'Seção 8 - Vida sexual',
      alternatives: [
        'Minha vida sexual é normal e não causa mais dor',
        'Minha vida sexual é normal, mas causa alguma dor adicional',
        'Minha vida sexual é quase normal, mas com muita dor',
        'Minha vida sexual é severamente restrita pela dor',
        'Minha vida sexual é quase inexistente devido à dor',
        'A dor me impede completamente de ter vida sexual',
      ],
    },
    {
      title: 'Seção 9 - Vida social',
      alternatives: [
        'Minha vida social é normal e não me causa mais dor',
        'Minha vida social é normal, mas aumenta o grau de dor',
        'A dor não tem efeito significativo na minha vida social, com exceção de limitar meus interesses energéticos, como por exemplo, dançar, etc.',
        'A dor restringiu minha vida social e não saio tanto como antes',
        'A dor restringiu minha vida social à minha casa',
        'Não tenho vida social por causa da dor',
      ],
    },
    {
      title: 'Seção 10 - Viajar',
      alternatives: [
        'Posso viajar para qualquer lugar sem me causar mais dor',
        'Posso viajar para qualquer lugar, mas isso causa mais dor',
        'A dor é forte, mas consigo fazer jornadas de mais de duas horas',
        'A dor me restringe a jornadas de menos de 1 hora',
        'A dor me restringe a jornadas curtas necessárias, de menos de 30 minutos',
        'A dor me impede de viajar, exceto ir ao médico ou ao hospital',
      ],
    },
  ];

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    props.goToSummary();
  }

  return (
    <Grid container spacing={1} className={classes.root}>
      {props.hideBreadcrumb ? (
        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/" onClick={handleClick}>
              Resultados
            </Link>
            <Typography color="textPrimary">
              Questionário de Oswestry
            </Typography>
          </Breadcrumbs>
        </Grid>
      ) : null}
      <Grid item xs={12}>
        <GenericTable
          columns={simpleColumns}
          rows={rows}
          shouldHideCheckboxes
        />
      </Grid>
      <Grid item xs={9}>
        <Paper classes={{ root: classes.paper }}>
          <Typography variant="h6">Questionário de Oswestry</Typography>
          <Typography variant="caption" display="block">
            {`Preenchido em: ${new Date(updated_at).toLocaleDateString(
              'pt-BR'
            )}`}
          </Typography>
          <Grid container spacing={2}>
            {questions.map((question, qIndex) => (
              <Grid item xs={6} key={`question${qIndex}`}>
                <Typography variant="body1" align="left">
                  {question.title}
                </Typography>
                <Typography variant="body1" align="left">
                  {question.alternatives.find(
                    (alt, altIndex) => answers[qIndex] === altIndex
                  )}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper classes={{ root: classes.paper }}>
          <Typography variant="h6">Resultado</Typography>
          <BorderLinearProgress
            variant="determinate"
            value={scoreOswestry}
            className={classes.oswLinearProgress}
          />
          <Typography
            variant="subtitle1"
            className={classes.oswPercentage}
          >{`${scoreOswestry}%`}</Typography>
          <Typography variant="subtitle1">{textOswestry}</Typography>
        </Paper>
        <Paper classes={{ root: classes.paper }}>
          <Typography variant="h6">Referência</Typography>
          <Typography variant="body1" align="left">
            {'0% a 20% - Incapacidade mínima'}
          </Typography>
          <Typography variant="body1" align="left">
            {'21% a 40% - Incapacidade moderada'}
          </Typography>
          <Typography variant="body1" align="left">
            {'41% a 60% - Incapacidade intensa'}
          </Typography>
          <Typography variant="body1" align="left">
            {'61% a 80% - Aleijado'}
          </Typography>
          <Typography variant="body1" align="left">
            {'81% a 100% - Inválido'}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default OswestryReport;
