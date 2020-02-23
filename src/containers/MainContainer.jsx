import React, { Component } from 'react';
import Form from '../components/Form'
import NavBar from '../components/NavBar'
import Home from '../components/Home'
import Profile from '../components/Profile'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {withRouter} from 'react-router-dom'


class MainContainer extends Component {

  state = {
    user: {},
    token: '',
    error_message: ''

  }

  handleSubmit = (userInfo, route, method) => {
    // console.log(route)
    console.log('Form has been submitted')
    fetch(`http://localhost:4000${route}`, {
      method: method,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(
        userInfo
      )
    })
    .then(r => r.json())
    // .then(console.log)
    // .then(userData => {
      // console.log(userData.error)})
    .then(userData => {
      if (!userData.error) {
        this.setState({
          user: userData,
        }, () => {
           this.props.history.push('/home')
        })
      }
      this.setState({
        error_message: userData.error
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

  renderProfile = () => {
    return <Profile user={this.state.user}/>
  }

  render() {
    console.log('APP STATE', this.state)
    return (
      <Router >
      <div>
      <NavBar />
      <Switch>
        <Route path='/home' exact render={() => <Home /> } />
        <Route path='/signup' render={this.renderForm}/>
        <Route path='/login' render={this.renderForm}/>
        <Route path='/profile' render={this.renderProfile}/>
        
      </Switch>
      </div>
      </Router>
      );
    }

}

export default withRouter(MainContainer);
