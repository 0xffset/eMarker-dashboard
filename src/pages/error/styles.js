import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    position: "absolute",
    top: 0,
    left: 0,
  },
  logotype: {
    display: "flex",
    alignItems: "center",
    marginBottom: 12,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  logotypeText: {
    fontWeight: 500,
    color: "white",
    marginLeft:2,
  },
  logotypeIcon: {
    width: 70,
    marginRight: 2,
  },
  paperRoot: {
    boxShadow: theme.customShadows.widgetDark,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 6,
    paddingRight: 6,
    maxWidth: 404,
  },
  textRow: {
    marginBottom: 10,
    textAlign: "center",
  },
  errorCode: {
    fontSize: 148,
    fontWeight: 600,
  },
  safetyText: {
    fontWeight: 300,
    color: theme.palette.text.hint,
  },
  backButton: {
    boxShadow: theme.customShadows.widget,
    textTransform: "none",
    fontSize: 22,
  },
}));
