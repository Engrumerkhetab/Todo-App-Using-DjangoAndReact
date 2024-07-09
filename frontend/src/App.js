import React from 'react'

import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import PrivateRoute from "./utils/PrivateRoute"
import { AuthProvider } from './context/AuthContext'

import Homepage from './views/Homepage'
import Registerpage from './views/Registerpage'
import Loginpage from './views/Loginpage'
import Dashboard from './views/Dashboard'
import Navbar from './views/Navbar'
import Todo from './views/Todo'
function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
              <Navbar/>
              <Switch>
                <PrivateRoute component={Dashboard} path="/dashboard" exact />
                <Route component={Registerpage} path="/register" exact />
                <Route component={Loginpage} path="/login" exact/>
                <Route component={Homepage} path="/" exact />
                <Route component={Todo} path="/todo" exact />
               
              </Switch>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
