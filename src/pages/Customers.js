import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import PanelLeft from './Drawer';
import Title from './Title';
import CustomersLists from '../components/customers/customer'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
     textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200
    },
     input: {
    display: 'none'
  },
  filename:{
    marginLeft:'10px'
  },

  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  root: {
    display: 'flex',
  },
}));



export default function Customer() {



  const classes = useStyles();

  return (

    <div className={classes.root}>

    <PanelLeft name="Users"/>
    <main className={classes.content}>
    <div className={classes.appBarSpacer} />
    <Container maxWidth="lg" className={classes.container}>

    <Grid item xs={12}>
      <Paper className={classes.paper}>
    <Title>List of customers</Title>
      <Table>
        <TableHead >
          <TableRow >
            <TableCell  style={{ fontWeight: 'bold'}}>Name</TableCell>
            <TableCell  style={{ fontWeight: 'bold'}}>Email</TableCell>
            <TableCell  style={{ fontWeight: 'bold'}}>Date Created</TableCell>
          </TableRow>
        </TableHead>
          <CustomersLists/>
        </Table>
      </Paper>
    </Grid>
      </Container>
    </main>

    </div>

    );
}
