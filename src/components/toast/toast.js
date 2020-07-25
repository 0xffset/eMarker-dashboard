import React, {useState} from 'react'
import {SnackbarProvider} from 'notistack'


//Component to show toast notification


export default function Toast(props) {
    const message = props.Message
    const maxSnack = props.MaxSnack
    const position = props.Position
    const TypeAlert = prosps.TypeAlert
    const vertical = props.Vertical

    props.enqueueSnackbar(message, {
        variant: TypeAlert,
        horizontal: position,

    })
    
}


