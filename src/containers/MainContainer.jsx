import React, { Component } from 'react';
import UserForm from '../components/Form'
import NavBar from '../components/NavBar'
import Home from '../components/Home'
import Profile from '../components/Profile'

import {Switch, Route} from 'react-router'
import {withRouter} from 'react-router-dom'


class MainContainer extends Component {

  state = {
    user: {
      username: ''
    },
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
            user: {...userData.user, username: userData.username},
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
          user: {...userData.user, username: userData.username},
          token: userData.token
        }, () => {
           this.props.history.push('/profile')
        })
      }
      this.setState({
        error_message: userData.error
      })
      // console.log(userData)
    })
  }


renderForm = (routerProps) => {
  let {pathname} = routerProps.location
  let {error_message, user} = this.state
    // console.log(routerProps)
    if (pathname === '/signup') {
      return <UserForm formName='Signup' handleSubmit={this.handleSubmit} error={error_message} user={user}/>
    } else if (pathname === '/login') {
      return <UserForm formName='Login' handleSubmit={this.handleSubmit} error={error_message} user={user}/>
    }  else if (routerProps.location.pathname === '/update') {
      return <UserForm formName='Update Username' handleSubmit={this.handleSubmit} error={error_message} user={user}/>
    }
  }

  renderProfile = () => {
    return <Profile handleDelete={this.handleDelete} token={this.state.token} user={this.state.user}/>
  }

  renderLogout = (routerProps) => {
    this.setState({
      user: {}
    })
    localStorage.clear()
    routerProps.history.push('/home')
  }



  handleDelete = (id) => {
    fetch(`http://localhost:4000/users/${id}`, {
      method: 'DELETE'
    })
    .then(r => r.json())
    .then(() => {
      localStorage.clear()
      window.location.href = "/home"
    })
  }

  render() {
    // console.log('APP STATE', this.state)
    return (
      <div className='main-container'>
      <NavBar />
      <Switch>
        <Route path='/home' exact render={() => <Home /> } />
        <Route path='/signup' render={this.renderForm}/>
        <Route path='/login' render={this.renderForm}/>
        <Route path='/profile' render={this.renderProfile}/>
        <Route path='/logout' render={this.renderLogout}/>
        <Route path='/update' render={this.renderForm}/>

      </Switch>
      </div>
      );
    }

}

export default withRouter(MainContainer);
