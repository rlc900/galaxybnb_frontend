import React, { Component } from 'react';
import Form from '../components/Form'
import NavBar from '../components/NavBar'
import Home from '../components/Home'
import Profile from '../components/Profile'

import {Switch, Route} from 'react-router'
import {withRouter} from 'react-router-dom'


class MainContainer extends Component {

  state = {
    user: {},
    token: '',
    error_message: ''

  }

  componentDidMount() {
    // info persisted when page refreshes
    if(localStorage.getItem('token')) {
      let token = localStorage.getItem('token')
      fetch(`http://localhost:4000/persist`, {
        headers: {
        'Authorization': `bearer ${token}`
      }
      })
      .then(r => r.json())
      .then(userData => {
        if (userData.token) {
          localStorage.setItem('token', userData.token)
          this.setState({
            user: userData.user,
            token: userData.token
          }, () => {
             this.props.history.push('/home')
          })
        }
      })
    }
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
      // .then(console.log(this.props.history))
    .then(userData => {
      if (!userData.error) {
        localStorage.setItem('token', userData.token)
        this.setState({
          user: userData.user,
          token: userData.token
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
    return <Profile token={this.state.token} user={this.state.user}/>
  }

  renderLogout = (routerProps) => {
    this.setState({
      user: {}
    })
    localStorage.clear()
    routerProps.history.push('/home')
  }

  render() {
    console.log('APP STATE', this.state)
    return (
      <div className='main-container'>
      <NavBar />
      <Switch>
        <Route path='/home' exact render={() => <Home /> } />
        <Route path='/signup' render={this.renderForm}/>
        <Route path='/login' render={this.renderForm}/>
        <Route path='/profile' render={this.renderProfile}/>
        <Route path='/logout' render={this.renderLogout}/>

      </Switch>
      </div>
      );
    }

}

export default withRouter(MainContainer);
