import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  title: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 1,
  },
  bottomStatsContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin:1 * -2,
    marginTop: 1,
  },
  statCell: {
    padding:2,
  },
  totalValueContainer: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  totalValue: {
    display: "flex",
    alignItems: "baseline",
  },
  profitArrow: {
    transform: "rotate(-45deg)",
    fill: theme.palette.success.main,
  },
  profitArrowDanger: {
    transform: "rotate(45deg)",
    fill: theme.palette.secondary.main,
  },
  selectInput: {
    padding: 10,
    paddingRight: 25,
    "&:focus": {
      backgroundColor: "white",
    },
  },
}));