import React, { Component } from 'react';

class Form extends Component {

  state = {
    username: '',
    password: ''
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
  let path = window.location.pathname
  let userInfo = this.state

  if (path === '/signup') {
    this.props.submit(userInfo, path, 'POST')
  } else if (path === '/login') {
    this.props.submit(userInfo, path, 'POST')
  }
}

  handleOnChange = (evt) => {

  }

  render() {
    let {username, password} = this.state
    let {formName} = this.props
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>{formName}</h1>

        <label htmlFor='username'>Username:</label>
        <input type='text' autoComplete='off'onChange={this.handleOnChange} value={username} name='username'/>
        <label htmlFor='password'>Password:</label>
        <input type='password' autoComplete='off' onChange={this.handleOnChange} value={password} name='password'/>
        <input type='submit' value='Submit'/>

      </form>
    );
  }

}

export default Form;
