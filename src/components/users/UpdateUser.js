import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles'
import { useSnackbar } from 'notistack';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import {TextField,  IconButton} from '@material-ui/core'
import {update} from './user-api.js'

const useStyles = makeStyles((theme) => ({
	margin: {
        margin: theme.spacing(1),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200
    },
   
}));
 const UpdateUser = (props) => {
	const [open, setOpen] = useState(false)


	
	const handleCloseDialog = () => {
		setOpen(false)
	}
	const handleOpenDialog = () => {
		setOpen(true)
	}
   const array = [props.typeUser, "admin", "seller", "manager"]
   const options = [...new Set(array)]
  const [valueType, setValueType] = useState(options[0])
       
  const arrStatus = [props.status, "Enable", "Disable"]
  const optionsStatus = [...new Set(arrStatus)]
  const [status, setStatus] = useState(optionsStatus[0])
  // Values to save it. 
  const [values, setValues] = useState({
    name: '',
    email: '',
    type_user: '',
    status: '',
    redirect: false,
    error: ''
  })
 const [inputValue, setInputValue] = useState('')
 const [inputValueStatus, setInputValueStatus] = useState('')

 const { enqueueSnackbar } = useSnackbar();


  // function to handler event changes to save it. 
  const handleChange = name => event => {
     setValues({...values, [name]: event.target.value})
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
   

	const clickUpdate = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      type_user: values.type_user || undefined,
      status: values.status || undefined
    }
    update(props.id, user)
      .then((data) => {
        if(data.error)
        {
          Message(data.error, "error")
        } else {
          setOpen(false)
          Message(data.message, "success")
        }
      })
	
	}
const classes = useStyles();

	return (
		
   	<>
      <IconButton onClick={() => handleOpenDialog()}  arial-label="delete" className={classes.margin}>
              <EditOutlinedIcon/>
       </IconButton>
       <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`${props.name} updating...`}</DialogTitle>
        <DialogContent>
         <Grid
  container
  direction="row"
  justify="left"
  alignItems="center"
>
            <TextField onChange={handleChange('name')} defaultValue={props.name}  id="name"  type="text" label="Name"  className={classes.textField} variant="outlined"  margin="normal" styles={{width: '300px'}} required/> 
            <TextField onChange={handleChange('email')} id="email" value={props.email} type="text" label="Email"  className={classes.textField} variant="outlined"  margin="normal" required/> 
           </Grid>
           <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
           >
           <Autocomplete
          value={valueType}
          onChange={(event, newValue) => {
           setValueType(newValue);
        
         }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          setValues({...values, ['type_user']: newInputValue})  

        }}
        id="controllable-states-demo"
        options={options}
        className={classes.textField}
        style={{ width: 200 }}
        renderInput={(params) => <TextField {...params} label="Type user" variant="outlined" />}
      />
      <Autocomplete
           value={props.status}
           onChange={(event, newValueStatus) => {
           setStatus(newValueStatus);
           setValues({...values, ['status']: newValueStatus})  

        
         }}
           inputValue={inputValueStatus}
           onInputChange={(event, newInputValueStatus) => {
           setInputValueStatus(newInputValueStatus);

        }}
           id="controllable-states-demo"
           options={optionsStatus}
           className={classes.textField}
           style={{ width: 200 }}
           renderInput={(params) => <TextField {...params} label="Status" variant="outlined" />}
      />
      </Grid>

   
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
          <Button onClick={clickUpdate} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
  
   	 </>
	);
};

export default UpdateUser