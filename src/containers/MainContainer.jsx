import React, { Component } from 'react';
import Form from '../components/Form'
import NavBar from '../components/NavBar'
import Home from '../components/Home'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {withRouter} from 'react-router-dom'


class MainContainer extends Component {

  state = {
    user: {},
    token: '',
    error_message: '',

  }

  handleSubmit = (userInfo, route, method) => {
    // console.log(route)
    fetch(`http://localhost:4000/${route}`, {
      method: method,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(
        userInfo
      )
    })
    // .then(console.log)
    // .then(console.log)
    .then(userData => {
      this.setState({
        user: userData
      })
    })
  }

renderForm = (routerProps) => {
  let {pathname} = routerProps.location
    // console.log(routerProps)
    if (pathname === '/signup') {
      return <Form formName='Signup' handleSubmit={this.handleSubmit} error={this.state.error_message}/>
    } else if (pathname === '/login') {
      return <Form formName='Login' handleSubmit={this.handleSubmit} error={this.state.error_message}/>
    }
  }

  render() {
    return (
      <Router >
      <div>
      <NavBar />
      <Switch>
        <Route path='/home' component={Home}/>
        <Route path='/signup' render={this.renderForm}/>
        <Route path='/login' render={this.renderForm}/>
      </Switch>
      </div>
      </Router>
    );
  }

}

export default withRouter(MainContainer);
