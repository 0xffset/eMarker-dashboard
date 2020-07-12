import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  widgetWrapper: {
    display: "flex",
    minHeight: "100%",
  },
  widgetHeader: {
    padding:3,
    paddingBottom: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  widgetRoot: {
    boxShadow: theme.customShadows.widget,
  },
  widgetBody: {
    paddingBottom: 3,
    paddingRight: 3,
    paddingLeft:3,
  },
  noPadding: {
    padding: 0,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflow: "hidden",
  },
  moreButton: {
    margin: -1,
    padding: 0,
    width: 40,
    height: 40,
    color: theme.palette.text.hint,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "rgba(255, 255, 255, 0.35)",
    },
  },
}));
