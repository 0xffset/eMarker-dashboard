import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  titleBold: {
    fontWeight: 600,
  },
  iconsBar: {
    marginBottom: 4,
    borderBottom: "1px solid",
    borderBottomColor: theme.palette.text.hint + "80",
  },
  tab: {
    color: theme.palette.primary.light + "CC",
  },
  materailIcon: {
    display: "flex",
    paddingLeft: `${4}px !important`,
    paddingRight: `${4}px !important`,
    color: theme.palette.text.secondary,
    fontSize: 24,
    overflowX: "hidden",
  },
  materialIconText: {
    marginLeft: 2,
    fontSize: 14,
  },
  iconsContainer: {
    boxShadow: theme.customShadows.widget,
    overflow: "hidden",
    paddingBottom: 2,
  },
}));
