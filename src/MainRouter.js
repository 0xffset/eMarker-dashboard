import React from 'react'
import {Route, BrowserRouter, Redirect} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Signin from './pages/Signin'
import UserList from './pages/User'
import auth from './components/auth/auth-helper'
import ActionProducts from'./components/product/NewProduct.js'
import UpdateProduct from './components/product/UpdateProduct.js'
import Customers from './pages/Customers.js'
import Product from './pages/Product.js'
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
          <Route exact path="/product" component={Product}/>
          <Route exact path="/product/new" component={ActionProducts}/>
          <Route exact path="/product/update/:id" component={UpdateProduct}/>
          <Route exact path="/customers" component={Customers}/>


        </BrowserRouter>
        
      </div>)
  }

export default MainRouter