import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class NavBar extends Component {

  handleEntrance = () => {
    if (localStorage.token) {
      return (
        <ul>
      <Link to ='/home'>Home</Link>
      <Link to ='/profile'>Profile</Link>
      <Link to ='/logout'>Logout</Link>
      <Link to ='/update'>Update Username</Link>
      </ul>
      )
    } else {
      return (
        <ul>
        <Link to ='/home'>Home</Link>
        <Link to ='/signup'>Signup</Link>
        <Link to ='/login'>Login</Link>
        </ul>
      )
    }
  }

  render() {
    return (
      <div>
        {this.handleEntrance()}
      </div>
    );
  }

}

export default NavBar;
