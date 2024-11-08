import { useMemo } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { PatientIADResult } from '../../../models/PatientForm';
import { InnerReportProps } from '../../../interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
    IADFormItem: {
      margin: theme.spacing(3, 0, 6),
    },
    IADSlider: {
      textAlign: 'center',
      color: '#329D63',
      width: '80%',
      marginLeft: '1rem',
    },
    sliderSubLabel: {
      whiteSpace: 'break-spaces',
      width: '50px',
      fontSize: '0.75rem',
      lineHeight: 1,
    },
  })
);

function IADInnerReport({ selectedForm }: InnerReportProps) {
  const classes = useStyles();

  const { answers, updated_at } = useMemo(() => {
    const { updated_at, results } = selectedForm;
    const { text } = results as PatientIADResult;

    return { answers: text, updated_at };
  }, [selectedForm]);

  const questions = [
    'Muitas vezes eu consigo influenciar a intensidade da dor que sinto.', //1
    'Provavelmente eu sempre terei que tomar medicamento para dor.', //2
    'Sempre que eu sinto dor eu quero que a minha família me trate melhor.', //3
    'Eu não espero cura médica para a minha dor.', //4
    'O maior alívio da dor que eu tive foi com o uso de medicamentos', //5
    'A ansiedade aumenta a minha dor.', //6
    'Sempre que eu sinto dor as pessoas devem me tratar com cuidado e preocupação', //7
    'Eu desisti de buscar a completa eliminação da minha dor através do trabalho da medicina.', //8
    'É responsabilidade daqueles que me amam ajudarem-me quando eu sentir dor.', //9
    'O estresse da minha vida aumenta a minha dor.', //10
    'Exercício e movimento são bons para o meu problema da dor.', //11
    'Concentrando-me ou relaxando-me consigo diminuir a minha dor.', //12
    'Remédio é um dos melhores tratamentos para dor crônica.', //13
    'A minha família precisa aprender a cuidar melhor de mim quando eu estiver com dor.', //14
    'A depressão aumenta a dor que sinto.', //15
    'Se eu me exercitasse poderia piorar ainda mais o meu problema de dor.', //16
    'Eu acredito poder controlar a dor que sinto mudando meus pensamentos.', //17
    'Muitas vezes quando eu estou com dor eu preciso de mais carinho do que estou recebendo agora.', //18
    'Alguma coisa está errada com o meu corpo que impede muito movimento ou exercício.', //19
    'Eu aprendi a controlar a minha dor.', //20
    'Eu confio que a medicina poder curar a minha dor.', //21
    'Eu sei com certeza que posso aprender a lidar com a dor.', //22
    'A minha dor não me impede de levar uma vida fisicamente ativa.', //23
    'A minha dor física não será curada.', //24
    'Há uma forte ligação entre as minhas emoções e a intensidade da minha dor.', //25
    'Eu posso fazer quase tudo tão bem quanto eu podia antes de ter o problema da dor.', //26
    'Se eu não fizer exercícios regularmente o problema da minha dor continuará a piorar.', //27
    'O exercício pode diminuir a intensidade da dor que eu sinto.', //28
    'Estou convencido de que não há procedimento médico que ajude a minha dor.', //29
    'A dor que sinto impediria qualquer pessoa de levar uma vida ativa.', //30
  ];

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Paper classes={{ root: classes.paper }}>
          <Typography variant="h6">
            Inventário de atitude frente à dor
          </Typography>
          <Typography variant="caption" display="block">
            {`Preenchido em: ${new Date(updated_at).toLocaleDateString(
              'pt-BR'
            )}`}
          </Typography>
          <Grid container spacing={1}>
            {questions.map((question, index) => (
              <Grid item xs={12} sm={6} key={`question-${index}`}>
                <div className={classes.IADFormItem} key={`question_${index}`}>
                  <Typography
                    id={`question_${index}`}
                    gutterBottom
                    variant="subtitle1"
                    align="left"
                  >
                    {`${index + 1}. ${question}`}
                  </Typography>
                  <Typography variant="body1" align="left">
                    {answers[index]}
                  </Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default IADInnerReport;
