import {createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import MainRouter from './MainRouter'
import {BrowserRouter} from 'react-router-dom'
import { hot } from 'react-hot-loader'
import {
  deepOrange,
  teal
} from "@material-ui/core/colors";
let getTheme = window.localStorage.getItem("theme")
let theme =  getTheme ? getTheme : "light"
let PrimaryPalette = getTheme === "light" ? teal[900] : "#232323"
let SecondaryPalette = getTheme === "light" ? deepOrange[500] : deepOrange[500]
let darkTheme = createMuiTheme({
  palette: {
    type: theme,
    primary: {
      main: PrimaryPalette
    },
    seconday: {
      main: SecondaryPalette
    }
  },

});

const App = () => {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  })
  return (
  <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <MainRouter/>
      </ThemeProvider>
  </BrowserRouter>
)}

export default hot(module)(App)
