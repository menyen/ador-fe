import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slider from '@material-ui/core/Slider';
import IconButton from '@material-ui/core/IconButton';
import { ArrowBack } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

import { PatientFormProps, PatientPanel } from '../../interfaces';
import { UserAuth } from '../../models/UserAuth';
import api from '../../utils/api';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainColor: {
      color: '#3f51b5',
    },
    IADAppBar: {
      backgroundColor: '#3f51b5',
      color: 'white',
    },
    IADTitle: {
      color: '#3f51b5',
      margin: theme.spacing(5, 2, 2),
    },
    IADBodyContent: {
      '& > *': {
        textAlign: 'left',
        margin: theme.spacing(2),
      },
    },
    IADSlider: {
      textAlign: 'center',
      color: '#3f51b5v',
      width: '85%',
      marginLeft: '1rem',
    },
    IADForm: {
      margin: theme.spacing(2),
      textAlign: 'left',
    },
    IADFormItem: {
      margin: theme.spacing(3, 0, 6),
    },
    sliderSubLabel: {
      whiteSpace: 'break-spaces',
      width: '50px',
      fontSize: '0.75rem',
      lineHeight: 1,
    },
    IADFooter: {
      textAlign: 'center',
      '& button': {
        display: 'block',
        margin: '1rem auto',
      },
    },
    IADReferenceInfo: {
      fontSize: '0.75rem',
      color: grey[500],
    },
  })
);

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

async function postIADAnswers(
  auth: UserAuth,
  answers: number[],
  goToQuestionaire: () => void
) {
  api
    .post('api/v1/forms/patient/fill/iad', JSON.stringify({ answers }), {
      headers: {
        Authorization: `Bearer ${auth.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => goToQuestionaire());
}

export default function IAD(props: PatientFormProps) {
  enum IADFormPanel {
    DESCRIPTION,
    FORM,
  }
  const classes = useStyles();
  const [currentIADPanel, setCurrentIADPanel] = React.useState(
    IADFormPanel.DESCRIPTION
  );
  const [answers, setAnswers] = React.useState(
    new Array(questions.length).fill(0)
  );

  const marks = [
    {
      value: 0,
      label: (
        <>
          <Typography>0</Typography>
          <Typography className={classes.sliderSubLabel}>
            Totalmente falso
          </Typography>
        </>
      ),
    },
    {
      value: 1,
      label: (
        <>
          <Typography>1</Typography>
          <Typography className={classes.sliderSubLabel}>
            Quase falso
          </Typography>
        </>
      ),
    },
    {
      value: 2,
      label: (
        <>
          <Typography>2</Typography>
          <Typography className={classes.sliderSubLabel}>
            Nem verdadeiro nem falso
          </Typography>
        </>
      ),
    },
    {
      value: 3,
      label: (
        <>
          <Typography>3</Typography>
          <Typography className={classes.sliderSubLabel}>
            Quase verdadeiro
          </Typography>
        </>
      ),
    },
    {
      value: 4,
      label: (
        <>
          <Typography>4</Typography>
          <Typography className={classes.sliderSubLabel}>
            Totalmente verdadeiro
          </Typography>
        </>
      ),
    },
  ];
  return (
    <>
      <AppBar position="static" classes={{ colorPrimary: classes.IADAppBar }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => props.setCurrentPanel(PatientPanel.INITIAL)}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="subtitle1">
            Inventário de atitude frente à dor
          </Typography>
        </Toolbar>
      </AppBar>
      {currentIADPanel === IADFormPanel.DESCRIPTION && (
        <>
          <div className={classes.IADTitle}>
            <Typography variant="h6">Questionário</Typography>
            <Typography variant="h6">
              Inventário de atitude frente à dor
            </Typography>
          </div>
          <div className={classes.IADBodyContent}>
            <Typography variant="body1">
              O Inventário de Atitude Frente à Dor (IAD) (Jensen et al., 1987)
              foi proposto como instrumento para avaliar as atitudes frente à
              dor de doentes com dor crônica não-oncológica (Pimenta, 1999) e
              contém 30 itens correspondentes a sete domínios ou escalas (cura
              médica, controle, solicitude, incapacidade, medicação, emoção e
              dano físico). Cada domínio constitui-se de um conjunto de
              assertivas que são submetidas ao entrevistado solicitando que
              avalie seu grau de concordância com cada uma, utilizando-se uma
              escala do tipo Likert de cinco pontos, que varia de 0-4
              (0=totalmente falso, 1= quase falso, 2=nem verdadeiro nem falso,
              3=quase verdadeiro, 4=totalmente verdadeiro).
            </Typography>
            <Button
              variant="contained"
              className={classes.IADAppBar}
              onClick={() => setCurrentIADPanel(IADFormPanel.FORM)}
            >
              Começar
            </Button>
            <Typography variant="body2" className={classes.IADReferenceInfo}>
              {
                'Jensen et al., 1987; Jensen & Karoly, 1992; Jensen et al., 1994'
              }
            </Typography>
          </div>
        </>
      )}
      {currentIADPanel === IADFormPanel.FORM && (
        <div className={classes.IADForm}>
          <Typography variant="subtitle1">
            Marque na escala com que frequência você tem estes pensamentos
            quando sua dor esta forte.
          </Typography>

          {questions.map((question, index) => (
            <div className={classes.IADFormItem} key={`question_${index}`}>
              <Typography id={`question_${index}`} gutterBottom>
                {question}
              </Typography>
              <Slider
                aria-labelledby={`question_${index}`}
                defaultValue={0}
                className={classes.IADSlider}
                step={1}
                valueLabelDisplay="auto"
                marks={marks}
                min={0}
                max={4}
                onChange={(e, v) => {
                  const newAnswers = [...answers];
                  newAnswers[index] = v as number;
                  setAnswers(newAnswers);
                }}
              />
            </div>
          ))}

          <div className={classes.IADFooter}>
            <Button
              variant="contained"
              className={classes.IADAppBar}
              onClick={() =>
                postIADAnswers(props.patientAuth, answers, () =>
                  props.setCurrentPanel(PatientPanel.INITIAL)
                )
              }
            >
              Finalizar
            </Button>
            <Button
              variant="text"
              className={classes.mainColor}
              onClick={() => setCurrentIADPanel(IADFormPanel.DESCRIPTION)}
            >
              Anterior
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
