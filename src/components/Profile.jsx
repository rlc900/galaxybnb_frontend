import React, { Component } from 'react';
// import { Button } from 'semantic-ui-react'

class Profile extends Component {


  handleClick = () => {
    // console.log('yo');
    this.props.handleDelete(this.props.user.id)
  }

  render() {
    console.log(this.props.user);
    let {user} = this.props
    return (
      <div>
      <h2>{user.username}&apos;s Profile</h2>
      <button className='ui button' onClick={this.handleClick}>Delete Profile :/</button>
      </div>
    );
  }

}

export default Profile;
