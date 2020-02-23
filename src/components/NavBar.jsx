import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class NavBar extends Component {

  render() {
    return (
      <div>
        <Link to ='home'>Home</Link>
        <Link to ='/signup'>Signup</Link>
        <Link to ='/login'>Login</Link>
        <Link to ='/profile'>Profile</Link>
      </div>
    );
  }

}

export default NavBar;
