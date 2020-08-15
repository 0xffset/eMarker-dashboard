import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { customerlist } from './customer-api'
import auth from './../auth/auth-helper.js'
import {
    TableBody,
    TableCell,
    TableRow
} from '@material-ui/core'

export default function CustomersLists(props) {
   const [customers, setCustomers] = useState([]);
   const jwt = auth.isAuthenticated()
   useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        customerlist({t: jwt.token}, signal)
            .then((res) => {
                setCustomers(res)
            })
    }, []);
    return (
        <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer._id}>
          <TableCell>{customer.name}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell><Moment format="LLL">{customer.created}</Moment></TableCell>
          </TableRow>
        ))}
      </TableBody>
    )
}