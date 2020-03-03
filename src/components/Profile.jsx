import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

class Profile extends Component {

  handleClick = () => {
    // console.log('yo');
    this.props.handleDelete(this.props.stateFromMain.user.id)
  }

  renderBookedLocations = () => {
    // let {datesRange, numOfTravelers} = this.props.stateFromMain

    if (this.props.stateFromMain.user.locationsBooked) {
      return this.props.stateFromMain.user.locationsBooked.map((booked_location) => {
        return (<Card>
    <Image src={booked_location.image} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{booked_location.name}</Card.Header>
      <Card.Meta>
        <span className='date'>{booked_location.datesRange}</span>
      </Card.Meta>
      <Card.Description>
        Card Descriptions might go here if i have time to come up with them??
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
        <Icon name='user' />
        {booked_location.numOfTravelers}
    </Card.Content>
  </Card>)
      })
    } else {
      return 'Not happenin'
    }

  }

  render() {
    console.log(this.props.stateFromMain.datesRange);
    let {user} = this.props.stateFromMain
    return (
      <div>
      <h2>{user.username}&apos;s Profile</h2>
      {this.renderBookedLocations()}
      <button className='ui button' onClick={this.handleClick}>Delete Profile :/</button>
      </div>
    );
  }

}

export default Profile;
