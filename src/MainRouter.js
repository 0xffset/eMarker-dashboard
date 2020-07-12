import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard'

const MainRouter = () => {
    return (<div>
        
        <Switch>
          <Route exact path="/" component={Dashboard}/>
        </Switch>
      </div>)
  }

export default MainRouter