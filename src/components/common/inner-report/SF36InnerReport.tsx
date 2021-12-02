import { useEffect, useMemo } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { AxisOptions, Chart } from 'react-charts';

import {
  PatientSF36Result,
  PatientBasicResult,
  PatientForm,
} from '../../../models/PatientForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
  })
);

type Series = {
  label: string;
  data: PatientBasicResult[];
};

function SF36InnerReport({ data }: { data: PatientForm[] }) {
  const classes = useStyles();

  const chartData: Series[] = useMemo(
    () =>
      data?.reduce((acc: Series[], sf36) => {
        if (sf36.status === 'PENDING') {
          return acc;
        }
        return [
          ...acc,
          {
            label: `Resultado do paciente em ${new Date(
              sf36?.updated_at
            ).toLocaleDateString('pt-BR')}`,
            data: (sf36?.results as PatientSF36Result)?.raw_scale?.filter(
              (result) => result.text !== 'Total'
            ),
          },
        ];
      }, []),
    [data]
  );
  const primaryAxis = useMemo(
    (): AxisOptions<PatientBasicResult> => ({
      getValue: (datum) => datum.text,
    }),
    []
  );
  const secondaryAxes = useMemo(
    (): AxisOptions<PatientBasicResult>[] => [
      {
        getValue: (datum) => datum.score,
        elementType: 'line',
      },
    ],
    []
  );

  useEffect(() => {
    setTimeout(() => {
      const tickLabelsY = document.querySelectorAll(
        'svg > .axes:first-child > g:nth-child(2) > .Axis-Group.inner:first-child .tickLabel'
      );
      const indexOfLabel50 = Array.from(tickLabelsY).reduce(
        (acc, el, index) => (el.textContent === '50' ? index : acc),
        0
      );
      if (indexOfLabel50) {
        const lineOfLabel50 = document.querySelectorAll(
          'svg > .axes:first-child > g:nth-child(2) > .Axis-Group.inner:first-child .Axis:first-child > .grid .tick line'
        )[indexOfLabel50];
        lineOfLabel50.setAttribute('stroke', 'yellow');
      }
    }, 1000);
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} lg={9}>
        <Paper classes={{ root: classes.paper }}>
          <Typography variant="h6">Qualidade de vida (SF-36)</Typography>
          <div style={{ height: '500px', paddingBottom: '10px' }}>
            <Chart
              options={{
                data: chartData,
                primaryAxis,
                secondaryAxes,
              }}
            />
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default SF36InnerReport;
