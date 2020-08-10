import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { customerlist } from './customer-api'
import {
    TableBody,
    TableCell,
    TableRow,
    Chip,
    

} from '@material-ui/core'


export default function CustomersLists(props) {
   const [customers, setCustomers] = useState([]);
   useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        customerlist({},signal)
            .then((res) => {
                setCustomers(res)
            })
    });
    return (
        <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer._id}>
          <TableCell>{customer.name}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell><Moment format="yyyy/MM/DD">{customer.created}</Moment></TableCell>
          </TableRow>
        ))}
      </TableBody>
    )
}