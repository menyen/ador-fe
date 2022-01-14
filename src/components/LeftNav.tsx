import { useContext, useState } from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router';
import {
  alpha,
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PersonIcon from '@material-ui/icons/Person';
import Smartphone from '@material-ui/icons/Smartphone';
import PieChartIcon from '@material-ui/icons/PieChart';
import SearchIcon from '@material-ui/icons/Search';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import SettingsIcon from '@material-ui/icons/Settings';
import AirlineSeatFlatIcon from '@material-ui/icons/AirlineSeatFlat';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import logo from '../image/logo.svg';
import minilogo from '../image/mini-logo.svg';
import {
  AdminPanelType,
  AllPanelTypes,
  ManagerPanelType,
  PhysicianPanelType,
  RolesEnum,
} from '../interfaces';
import { AuthContext } from '../utils/loggedUser';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {},
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(8),
      },
    },
    collapsedToolbar: {
      paddingLeft: 12,
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    bottomButton: {
      marginTop: 'auto',
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
    },
  })
);

interface LeftNavProps {
  role: string;
  currentPanel: AllPanelTypes;
  openClinicsTablePage?: () => void;
  openTermsOfUsePage?: () => void;
  searchPatients?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setPanel: (panelType: AllPanelTypes) => void;
}

export default function LeftNav(props: LeftNavProps) {
  const [auth, setAuth] = useContext(AuthContext);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const history = useHistory();
  const { role, currentPanel, setPanel, searchPatients } = props;
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const signout = () => {
    setAuth();
    history.push('/login');
  };

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const gotoPatientPage = () => {
    handleCloseModal();
    signout();
    window.open(
      `/login/patient/${auth?.user?.clinic_slug}`,
      '_blank',
      'noopener'
    );
  };

  return (
    <div className={classes.root}>
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Ir para a área do paciente?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja ir para a área do paciente? Executar essa
            ação fará com que você seja deslogado dessa página.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary" autoFocus>
            Não
          </Button>
          <Button onClick={gotoPatientPage} color="primary">
            Sim
          </Button>
        </DialogActions>
      </Dialog>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        color="default"
      >
        <Toolbar className={classes.collapsedToolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <img src={minilogo} alt="logo" width="39" />
          </IconButton>
          {role !== RolesEnum.ADMIN && (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Pesquisar paciente (mín. 4 caracteres)..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={searchPatients}
              />
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <img src={logo} className="app-logo" alt="logo" />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        {role === RolesEnum.ADMIN && (
          <List>
            <ListItem
              button
              key="LocalHospitalIcon"
              selected={[
                AdminPanelType.ClinicsTable,
                AdminPanelType.ClinicForm,
              ].includes(currentPanel as AdminPanelType)}
              onClick={props.openClinicsTablePage}
            >
              <ListItemIcon>
                <LocalHospitalIcon />
              </ListItemIcon>
              <ListItemText primary="Clínicas" />
            </ListItem>
            <ListItem
              button
              key="SettingsIcon"
              selected={
                AdminPanelType.Settings === (currentPanel as AdminPanelType)
              }
              onClick={props.openTermsOfUsePage}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Configurações" />
            </ListItem>
          </List>
        )}
        {role === RolesEnum.MANAGER && (
          <List>
            <ListItem
              onClick={() => setPanel(ManagerPanelType.UsersTable)}
              button
              key="PersonIcon"
              selected={
                ManagerPanelType.UsersTable ===
                (currentPanel as ManagerPanelType)
              }
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Usuários" />
            </ListItem>
            <ListItem
              onClick={() => setPanel(ManagerPanelType.PatientsTable)}
              button
              key="AirlineSeatFlatIcon"
              selected={
                ManagerPanelType.PatientsTable ===
                (currentPanel as ManagerPanelType)
              }
            >
              <ListItemIcon>
                <AirlineSeatFlatIcon />
              </ListItemIcon>
              <ListItemText primary="Pacientes" />
            </ListItem>
            <ListItem
              onClick={() => setPanel(ManagerPanelType.ReportsTable)}
              button
              key="PieChartIcon"
              selected={
                ManagerPanelType.ReportsTable ===
                (currentPanel as ManagerPanelType)
              }
            >
              <ListItemIcon>
                <PieChartIcon />
              </ListItemIcon>
              <ListItemText primary="Relatórios" />
            </ListItem>
            <ListItem onClick={handleClickOpenModal} button key="Smartphone">
              <ListItemIcon>
                <Smartphone />
              </ListItemIcon>
              <ListItemText primary="Área do Paciente" />
            </ListItem>
          </List>
        )}
        {role === RolesEnum.PHYSICIAN && (
          <List>
            <ListItem
              onClick={() => setPanel(PhysicianPanelType.PatientsTable)}
              button
              key="PersonIcon"
              selected={
                PhysicianPanelType.PatientsTable ===
                (currentPanel as PhysicianPanelType)
              }
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Pacientes" />
            </ListItem>
            <ListItem
              onClick={() => setPanel(PhysicianPanelType.ReportsTable)}
              button
              key="PieChartIcon"
              selected={
                PhysicianPanelType.ReportsTable ===
                (currentPanel as PhysicianPanelType)
              }
            >
              <ListItemIcon>
                <PieChartIcon />
              </ListItemIcon>
              <ListItemText primary="Relatórios" />
            </ListItem>
          </List>
        )}
        {role === RolesEnum.RECEPTIONIST && (
          <List>
            <ListItem button key="PersonIcon" selected>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Pacientes" />
            </ListItem>
            <ListItem button key="PieChartIcon">
              <ListItemIcon>
                <PieChartIcon />
              </ListItemIcon>
              <ListItemText primary="Relatórios" />
            </ListItem>
          </List>
        )}
        <Button className={classes.bottomButton} onClick={signout}>
          SAIR
        </Button>
      </Drawer>
    </div>
  );
}
