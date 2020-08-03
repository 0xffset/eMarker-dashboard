import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { useSnackbar } from 'notistack';
import {remove} from './user-api.js'

import {
 
    IconButton

} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	margin: {
        margin: "-15px",
    },
   
}));
 const RemoveUser = (props) => {
	const [open, setOpen] = useState(false)

	const { enqueueSnackbar } = useSnackbar();

	
	const handleClose = () => {
		setOpen(false)
	}
	const handleOpenDialog = () => {
		setOpen(true)
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
   

	const clickDelete = () => {
		remove(props.id)
			.then((data) => {
				if (data.error)
				{
					Message(data.error, "error")
				} else {
					Message(data.message, "success")
					setOpen(false)
				}
			})
	}
const classes = useStyles();

	return (
		
   	<>
      <IconButton onClick={() => handleOpenDialog()}  arial-label="delete" className={classes.margin}>
              <DeleteOutlinedIcon/>
       </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Deleting..."}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure want to delete <Typography>{props.name}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel 
          </Button>
          <Button onClick={clickDelete} color="primary" autoFocus>
            Accept 
          </Button>
        </DialogActions>
      </Dialog>
  
   	 </>
	);
};

export default RemoveUser