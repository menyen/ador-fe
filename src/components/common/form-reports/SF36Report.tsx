import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ReportPageProps } from '../../../interfaces';
import SF36InnerReport from '../inner-report/SF36InnerReport';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '32px',
    },
  })
);

function SF36Report(props: ReportPageProps) {
  const classes = useStyles();

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    props.goToSummary();
  }

  return (
    <>
      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/" onClick={handleClick}>
              Resultados
            </Link>
            <Typography color="textPrimary">
              Qualidade de vida (SF-36)
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <SF36InnerReport data={props.data} />
    </>
  );
}

export default SF36Report;
