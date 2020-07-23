import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import PanelLeft from './Drawer';
import Title from './Title';


//Components 
import UserLists from '../components/users/user'
// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
];


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
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  root: {
    display: 'flex',
  },
}));

export default function UserList() {
  const classes = useStyles();
  return (
      <>
    <div className={classes.root}>
   
    <PanelLeft name="Users"/>
    <main className={classes.content}>
    <div className={classes.appBarSpacer} />
    <Container maxWidth="lg" className={classes.container}>
   <Grid item xs={6}  container
  direction="row"
  justify="flex-end"
  alignItems="flex-end">
     <Button  variant="contained" color="primary">Add new user</Button>
    </Grid>
    <Title>List of users</Title>
      <Table size="medium">
        <TableHead >
          <TableRow >
            <TableCell  style={{color: 'black', fontWeight: 'bold'}}>Name</TableCell>
            <TableCell  style={{color: 'black', fontWeight: 'bold'}}>Email</TableCell>
            <TableCell  style={{color: 'black', fontWeight: 'bold'}}>Date Created</TableCell>
            <TableCell  style={{color: 'black', fontWeight: 'bold'}}>Type user</TableCell>
            <TableCell  style={{color: 'black', fontWeight: 'bold'}} align="right">Status</TableCell>
          </TableRow>
        </TableHead>
       
        <UserLists/>
       
      </Table>
    
      </Container>
    </main>
    </div>
    </>
    
    
    
  );
}