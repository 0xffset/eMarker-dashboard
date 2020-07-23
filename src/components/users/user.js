import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { makeStyles } from '@material-ui/core/styles'
import { userlist } from './user-api'
import {
    TableBody,
    TableCell,
    TableRow,

} from '@material-ui/core'


export default function UserLists(props) {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        userlist()
            .then((res) => {
                setUsers(res)
            })
    }, []);

    return (
        <TableBody>
        {users.map((user) => (
          <TableRow key={user._id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell><Moment format="yyyy/MM/DD">{user.created}</Moment></TableCell>
          </TableRow>
        ))}
      </TableBody>
    )
}