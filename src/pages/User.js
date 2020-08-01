import React, {useState} from 'react';
import {Redirect} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FIleUpload from '@material-ui/icons/AddPhotoAlternate'
import auth from '../components/auth/auth-helper.js'
import { useSnackbar } from 'notistack';
import {create} from '../components/users/user-api.js'
import {

  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import PanelLeft from './Drawer';
import Title from './Title';


//Userlist 
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
 const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const jwt = auth.isAuthenticated()

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
        type_user: 'seller'
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
        console.log(data)
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
  const {redirect} = values

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
      <Table stickyHeader size="medium">
        <TableHead >
          <TableRow >
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
          <label htmlFor="icon-button-file">
            <Button variant="contained" color="primary" component="span">
              Upload User Image
              <FIleUpload/>
            </Button>
              <input onChange={handleChange('image')}  accept="image/*" className={classes.input} id="icon-button-file" type="file" />

          </label> <span className={classes.filename}>{values.image ? values.image.name : ''}</span><br/>

            <TextField onChange={handleChange('name')}  id="name" type="text" label="Name"  className={classes.textField} variant="outlined"  margin="normal" required/> 
            <TextField onChange={handleChange('email')} id="email" type="text" label="Email"  className={classes.textField} variant="outlined"  margin="normal" required/> 
            <TextField onChange={handleChange('password')} id="password" type="password" label="Password"  className={classes.textField} variant="outlined"  margin="normal" required/> 
              <div>
 
      <br />
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          handleChange('type_user')
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Type user" variant="outlined" />}
      />
    </div>
   
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