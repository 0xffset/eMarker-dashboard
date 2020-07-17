import React, { useState} from 'react'
import {
    Card,
    CardContent,
    CardActions,
    Button,
    TextField,
    Typography,
    Icon,
    makeStyles

} from '@material-ui/core'
import {Redirect} from 'react-router-dom'
import {signin} from '../components/auth/auth-api'
import auth from '../components/auth/auth-helper'

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2)
    },
    error: {
        verticalAlign: 'middle'
    },
    title: {
        marginTop: theme.spacing(2),
        color: theme.palette.openTitle
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
    }
}))

export default function Signin(props) {
    const classes = useStyles()
    const [values, setValues] = useState({
        name: '',
        password: '',
        error: '',
        redirect: false
    })



const clickSubmit = () => {
    const user = {
        name: values.name || undefined,
        password: values.password || undefined
    }
    signin(user)
    .then((data) => {
        if(data.error) {
            setValues({...values, error: data.error})
        } else (
            auth.authenticate(data, () => {
                setValues({...values, error: '', redirect: true})
            })
        )
    }) 
}



const handleChange = name => event => {
    setValues({...values, [name]: event.target.value})
}

const  {from} = props.location.state || {
    from: {
        pathname: '/dashboard'
    }
}

const {redirect} = values
if(redirect) {
    return (<Redirect to={from}/>)
}

return (
    <Card className={classes.card}>
        <CardContent>
            <Typography variant="h5" className={classes.title}>Sign in</Typography>
            <TextField id="name" type="text" label="Name" className={classes.textField} values={values.username} onChange={handleChange('name')} margin="normal"/><br/>
            <TextField id="passsword" type="password" label="Password" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal"/> 
            <br/> {
                values.error && (<Typography component="p" color="error">
                    <Icon color="error" className={classes.error}>error</Icon>
                    {values.error}
                    </Typography>)
            }
            </CardContent>
            <CardActions>
                <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Sign-in</Button>
            </CardActions>
            
    </Card>
)
}