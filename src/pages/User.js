import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useSnackbar } from 'notistack';
import {create} from '../components/users/user-api.js'
import {

  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import PanelLeft from './Drawer';
import Title from './Title';

//Userlist 
import UserLists from '../components/users/user'
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

  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  root: {
    display: 'flex',
  },
}));

 

export default function UserList() {
 //States to add new user dialog
  const [open, setOpen] = useState(false)
 // Types of user
  const options = ["admin", "seller", "manager"]
  // Values of Autocompleme
  const [value, setValue] = useState(options[0])
  // Values to save it. 
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    type_user: '',
    image: '',
    redirect: false,
    error: ''
  })
 const { enqueueSnackbar } = useSnackbar();


  // function to handler event changes to save it. 
  const handleChange = name => event => {
     const value = name === 'image' ? event.target.files[0] : event.target.value
     setValues({...values, [name]: value})
  }
  const clickSubmit = () => {

      const user = {
        name: values.name || undefined,
        password: values.password || undefined,
        email: values.email || undefined,
        type_user: values.type_user || undefined
}

const Message = (message, type) => {
     if (type === "error") {
        enqueueSnackbar(message, {
          variant: 'error',
          anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
    },
  });
}

if (type === "success") {
      enqueueSnackbar(message, {
          variant: 'success',
          anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
    },
});
}
}
   
    
    create(user)
      .then((data) => {
        if (data.error) {

          setValues({...values, error: data.error})
          setOpen(true)
          Message(data.error, "error")
        } else {
    
          Message(data.message, "success")
           setOpen(false)
           setValues({...values, error: '', redirect: true})
        }
      }) 

}
  
  const [inputValue, setInputValue] = useState('')
  // Open Add new user dialog
  const handleClickAddNewUser = () => {
    setOpen(true)
  }
 // Close Add new user dialog
  const handleCloseDialog = () => {
    setOpen(false)
  }

  const classes = useStyles();

  return (
    
    <div className={classes.root}>
   
    <PanelLeft name="Users"/>
    <main className={classes.content}>
    <div className={classes.appBarSpacer} />
    <Container maxWidth="lg" className={classes.container}>
   <Grid item xs={6}  container
  direction="row"
  justify="flex-end"
  alignItems="flex-end">
     <Button onClick={() => handleClickAddNewUser()}  variant="contained" color="primary">Add new user</Button>
    </Grid>
    <Title>List of users</Title>
      <Table>
        <TableHead >
          <TableRow >
            <TableCell  style={{color: 'black', fontWeight: 'bold'}}>Actions</TableCell>
            <TableCell  style={{color: 'black', fontWeight: 'bold'}}>Name</TableCell>
            <TableCell  style={{color: 'black', fontWeight: 'bold'}}>Email</TableCell>
            <TableCell  style={{color: 'black', fontWeight: 'bold'}}>Date Created</TableCell>
            <TableCell  style={{color: 'black', fontWeight: 'bold'}}>Type user</TableCell>
            <TableCell  style={{color: 'black', fontWeight: 'bold'}} >Status</TableCell>
          </TableRow>
        </TableHead>
       
        <UserLists/>
       
      </Table>
    
      </Container>
    </main>
 {/* Start - Dialog - Add new User*/}
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add new user"}</DialogTitle>
        <DialogContent>
         <Grid
  container
  direction="row"
  justify="left"
  alignItems="center"
>
            <TextField onChange={handleChange('name')}  id="name" type="text" label="Name"  className={classes.textField} variant="outlined"  margin="normal" styles={{width: '300px'}} required/> 
            <TextField onChange={handleChange('email')} id="email" type="text" label="Email"  className={classes.textField} variant="outlined"  margin="normal" required/> 
           </Grid>
           <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
           >
            <TextField onChange={handleChange('password')} id="password" type="password" label="Password"  className={classes.textField} variant="outlined"  margin="normal" required/> 
           <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          setValues({...values, ['type_user']: newInputValue})  

        }}
        id="controllable-states-demo"
        options={options}
        style={{ width: 200 }}
        renderInput={(params) => <TextField {...params} label="Type user" variant="outlined" />}
      />
      </Grid>

   
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
          <Button onClick={clickSubmit} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
 {/* End - Dialog - Add new User*/}

    </div>
    
    );
}