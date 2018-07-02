import React, { Component } from 'react'
import logo from './logo.svg'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import './App.css'
import ChatPage from './pages/chatPage'
import LoginPage from './pages/loginPage'
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Switch>
          <Route exact path="/" component={ChatPage} />
          <Route exact apth="/login" component={LoginPage} />
        </Switch>
      </div>
    )
  }
}

export default App
