import { makeStyles } from "@material-ui/styles";

const drawerWidth = 240;

export default makeStyles(theme => ({
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: 7 + 40,
    [theme.breakpoints.down("sm")]: {
      width: drawerWidth,
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  content: {
    flexGrow: 1,
    padding: 3,
  },
  /* sidebarList: {
    marginTop: theme.spacing(6),
  }, */
  mobileBackButton: {
    marginTop: 0.5,
    marginLeft: 3,
    [theme.breakpoints.only("sm")]: {
      marginTop: 0.625,
    },
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));
