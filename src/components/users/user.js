import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { userlist } from './user-api'
import {
    TableBody,
    TableCell,
    TableRow,
    Chip,
    

} from '@material-ui/core'
import RemoveUser from '../../components/users/RemoveUser'
import UpdateUser from '../../components/users/UpdateUser'

export default function UserLists(props) {
   
    const [users, setUsers] = useState([]);
    
  useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        userlist({},signal)
            .then((res) => {
                setUsers(res)
            })
    });
    return (
        <TableBody>
        {users.map((user) => (
          <TableRow key={user._id}>
          <TableCell>
          <RemoveUser id={user._id} name={user.name}/>
          <UpdateUser id={user._id} name={user.name} email={user.email} typeUser={user.type_user} status={user.status}/>
          </TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell><Moment format="LLL">{user.created}</Moment></TableCell>
            <TableCell>{user.type_user}</TableCell>
           <TableCell> {user.status === "Enable" ? <Chip color="primary"  label={user.status}/>  : <Chip color="secondary"  label={user.status}/> } 
     
    </TableCell>
          </TableRow>
        ))}
      </TableBody>
    )
}