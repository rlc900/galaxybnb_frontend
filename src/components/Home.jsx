import React, { Component } from 'react';
import {Header} from 'semantic-ui-react'
import BookingForm from './BookingForm'

class Home extends Component {

  state = {
    userData: []
  }

  handleBookingFormSubmit = (userData) => {
    // take the state from BookingForm and send it up to MainContainer
    this.setState({
      userData: userData
    })
  }

  render() {

    return (
      <div className='home'>
      <Header as='h1' inverted color ='violet'>Galaxybnb</Header>
      <BookingForm history={this.props.history} handleBookingFormSubmit={this.handleSubmit}/>
      </div>
    );
  }

}

export default Home;
