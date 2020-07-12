import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  dashedBorder: {
    border: "1px dashed",
    borderColor: theme.palette.primary.main,
    padding: 2,
    paddingTop: 4,
    paddingBottom:4,
    marginTop:1,
  },
  text: {
    marginBottom: 2,
  },
}));
