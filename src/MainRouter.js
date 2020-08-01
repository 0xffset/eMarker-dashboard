import React from 'react'
import {Route, BrowserRouter, Redirect} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Signin from './pages/Signin'
import UserList from './pages/User'
import auth from './components/auth/auth-helper'

// Components to testing
const MainRouter = () => {
    return (
    <div>
        
        <BrowserRouter>
        <Route path='/' render={() => (
            auth.isAuthenticated() ? ( <Redirect to='/dashboard'/> ) :
             ( <Route path='/' exact component={Signin}/> )
             
          )} />
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route exact path="/users" component={UserList}/>
        </BrowserRouter>
        
      </div>)
  }

export default MainRouter