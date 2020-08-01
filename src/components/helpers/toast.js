
import React from 'react'
import { useSnackbar } from 'notistack';

export default function Toast(props){

const [enqueueSnackbar, closeSnackbar ] = useSnackbar();

     if (props.type === "error") {
       return enqueueSnackbar(props.message, {
          variant: 'error',
          anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
    },
  });
}

if (props.type === "success") {
      return enqueueSnackbar(props.message, {
          variant: 'success',
          anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
    },
});
}

}

