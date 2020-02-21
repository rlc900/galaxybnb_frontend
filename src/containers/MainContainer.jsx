import React, { Component } from 'react';
import Form from '../components/Form'
import NavBar from '../components/NavBar'
import {Route} from 'react-router'
import {withRouter} from 'react-router-dom'


class MainContainer extends Component {

  state = {
    user: {},
    token: '',
    error_message: '',

  }

  handleSubmit = (userInfo, route, method) => {
    fetch(`http://localhost:4000${route}`, {
      method: `${method}`,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(
        userInfo
      )
    })
    .then(r => r.json())
    .then(userData => {
      this.setState({
        user: userData
      })
    })
  }

renderForm = (routerProps) => {
  let {pathname} = routerProps.location.pathname
    // console.log(routerProps)
    if (pathname === '/signup') {
      return <Form formName='Signup' submit={this.handleSubmit} error={this.state.error_message}/>
    } else if (pathname === '/login') {
      return <Form formName='Login' submit={this.handleSubmit} error={this.state.error_message}/>
    }
  }

  render() {
    return (

      <div>
      <NavBar />
      <Route path='/signup' render={this.renderForm}/>
      <Route path='/login' render={this.renderForm}/>

      </div>
    );
  }

}

export default withRouter(MainContainer);
