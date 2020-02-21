import React, { Component } from 'react';

class Form extends Component {

  state = {
    username: '',
    password: ''
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
  }

  handleOnChange = (evt) => {

  }

  render() {
    let {username, password} = this.state
    return (
      <form onSubmit{this.handleSubmit}>
      <label htmlFor='username'>Username:</label>
      <input onChange={this.handleOnChange} value={username} name='username'/>
      <label htmlFor='password'>Password:</label>
      <input onChange={this.handleOnChange} value={password} name='password'/>
      <input submit='Submit'/>

      </form>
    );
  }

}

export default Form;
