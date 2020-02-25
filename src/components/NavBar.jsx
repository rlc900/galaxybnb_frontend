import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Menu, Segment } from 'semantic-ui-react'

class NavBar extends Component {

  handleEntrance = () => {
    if (localStorage.token) {
      return (
        <div>
        <Segment inverted>
          <Menu inverted pointing secondary>
           <Menu.Item>
            <Link to ='/home'>Home</Link>
           </Menu.Item>
           <Menu.Item>
            <Link to ='/profile'>Profile</Link>
           </Menu.Item>
           <Menu.Item>
            <Link to ='/update'>Update Username</Link>
           </Menu.Item>
           <Menu.Item>
            <Link to ='/logout'>Logout</Link>
           </Menu.Item>
         </Menu>
         </Segment>
       </div>
      )
    } else {
      return (
        <Segment inverted>
          <Menu inverted pointing secondary>
           <Menu.Item>
            <Link to ='/home'>Home</Link>
           </Menu.Item>
           <Menu.Item>
            <Link to ='/signup'>Signup</Link>
           </Menu.Item>
           <Menu.Item>
            <Link to ='/login'>Login</Link>
           </Menu.Item>
         </Menu>
         </Segment>
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
