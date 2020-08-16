import React, {useEffect, useState} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Moment from 'react-moment'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {recentorders} from '../components/orders/orders-api.js'
import auth from '../components/auth/auth-helper.js'

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const jwt = auth.isAuthenticated()
  const [orders, setOrders] = useState([])
  const abortController = new AbortController()
  const signal = abortController.signal
  useEffect(() => {
    recentorders({t: jwt.token}, signal)
      .then((res) => {
        setOrders(res)
      })
  })
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Payment Id</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell><Moment format="LLL">{order.created_at}</Moment></TableCell>
              <TableCell>{order.customer_name}</TableCell>
              <TableCell>{order.customer_email}</TableCell>
              <TableCell>{order.payment_id}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell align="right">${order.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
