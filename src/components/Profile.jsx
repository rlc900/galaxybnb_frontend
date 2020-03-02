import React, { Component } from 'react';
// import { Button } from 'semantic-ui-react'

class Profile extends Component {
// when a user clicks 'Book Location', a card with the users booking info is added to their profile page.
      // 'Book Location' needs onClick={this.handleClick}?
      // In handleClick, we create a on the profile page

// When the modal afterwards pops up after the 'Book Location' button is clicked, the user clicks the 'Profile' button and will be taken to their profile page.

  handleClick = () => {
    // console.log('yo');
    this.props.handleDelete(this.props.stateFromMain.user.id)
  }

  render() {
    // console.log(this.props.user);
    let {user} = this.props.stateFromMain
    return (
      <div>
      <h2>{user.username}&apos;s Profile</h2>
      <button className='ui button' onClick={this.handleClick}>Delete Profile :/</button>
      </div>
    );
  }

}

export default Profile;
