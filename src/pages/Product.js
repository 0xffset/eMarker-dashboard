import React from 'react';
import {Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import PanelLeft from './Drawer';
import Title from './Title';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

//Userlist
import ProductLists from '../components/product/product'
// Generate Order Data



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
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  root: {
    display: 'flex',
  },
}));



export default function Product() {

const classes = useStyles();

  return (

    <div className={classes.root}>

    <PanelLeft name="Products"/>
    <main className={classes.content}>
    <div className={classes.appBarSpacer} />
    <Container maxWidth="lg" className={classes.container}>
    <Grid item xs={6}  container
          direction="row"
         justify="flex-end"
        alignItems="flex-end">
     <Link to="/product/new" ><Button  variant="contained" color="primary">Add new product</Button></Link>
    </Grid>

    <Grid item xs={12}>
      <Paper className={classes.paper}>
      <Title>List of Products</Title>
       <Table>
        <TableHead >
          <TableRow >
            <TableCell  style={{fontWeight: 'bold'}}>Actions</TableCell>
            <TableCell  style={{fontWeight: 'bold'}}>  </TableCell>
            <TableCell  style={{fontWeight: 'bold'}}>Name</TableCell>
            <TableCell  style={{fontWeight: 'bold'}}>Category</TableCell>
            <TableCell  style={{fontWeight: 'bold'}}>Price</TableCell>
            <TableCell  style={{fontWeight: 'bold'}}>Quantity</TableCell>
            <TableCell  style={{fontWeight: 'bold'}} >Status</TableCell>
          </TableRow>
        </TableHead>
       <ProductLists/>
       </Table>
     </Paper>
    </Grid>
      </Container>
    </main>



    </div>

    );
}
