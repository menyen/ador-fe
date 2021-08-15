import { withStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { deepOrange } from '@material-ui/core/colors';

export const OutlinedButton = withStyles((theme: Theme) => ({
  root: {
    color: 'black',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white',
    },
    border: '1px solid rgba(0, 0, 0, 1)',
    // textTransform: 'capitalize',
    maxWidth: 185,
    margin: theme.spacing(1),
  },
}))(Button);

export const OrangeButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    '&:hover': {
      backgroundColor: deepOrange[700],
    },
    // marginLeft: 'auto',
    margin: theme.spacing(1),
  },
}))(Button);
