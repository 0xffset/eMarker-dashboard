import React, {useState, useEffect} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import {totalsales} from '../components/orders/orders-api.js'
import Moment from 'react-moment'
function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const [total, setTotal] = useState()
  useEffect(() => {
    totalsales()
      .then((res) => {
        setTotal(res)
      })
  })
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Sales Today</Title>
      <Typography component="p" variant="h4">
        ${total}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        <Moment format="LLL">{Date.now()}</Moment>
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}