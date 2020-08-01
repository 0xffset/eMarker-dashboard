import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { makeStyles } from '@material-ui/core/styles'
import { userlist } from './user-api'
import {
    TableBody,
    TableCell,
    TableRow,
    Chip

} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({

    TableCellDisable: {
        background: "#aa2e25",
        borderRadius: "25px"
    },
    TableCellEnable: {
        background: "#357a38",
        borderRadius: "25px"
        
    },
    Button: {

    },
}));


export default function UserLists(props) {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        userlist({},signal)
            .then((res) => {
                setUsers(res)
            })
    }, []);
const classes = useStyles();
    return (
        <TableBody>
        {users.map((user) => (
          <TableRow key={user._id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell><Moment format="yyyy/MM/DD">{user.created}</Moment></TableCell>
            <TableCell>{user.type_user}</TableCell>
           <TableCell> {user.status == "Enable" ? <Chip color="primary"  label={user.status}/>  : <Chip color="secondary"  label={user.status}/> } 
     
    </TableCell>
          </TableRow>
        ))}
      </TableBody>
    )
}