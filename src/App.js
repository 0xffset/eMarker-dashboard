import {createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import MainRouter from './MainRouter'
import {BrowserRouter} from 'react-router-dom'
import { hot } from 'react-hot-loader'

let getTheme = window.localStorage.getItem("theme")
let theme =  getTheme ? getTheme : "light"
let darkTheme = createMuiTheme({
  palette: {
    type: theme
   }
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
