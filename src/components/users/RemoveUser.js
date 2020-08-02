import React, {useState, useEffect} from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import {
 
    IconButton

} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	margin: {
        margin: theme.spacing(1),
    },
   
}));
 const RemoveUser = (props) => {
	const [open, setOpen] = useState(false)
	
	const handleClose = () => {
		setOpen(false)
	}
	const handleOpenDialog = () => {
		setOpen(true)
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
          <Button onClick={handleClose} color="primary" autoFocus>
            Accept 
          </Button>
        </DialogActions>
      </Dialog>
  
   	 </>
	);
};

export default RemoveUser