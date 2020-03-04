import React, { Component } from 'react';
import { Grid, Image, Card, Button, Icon, Modal, Header } from 'semantic-ui-react'
import Emoji from './Emoji'

import ReviewForm from './ReviewForm'



class PlanetLocations extends Component {

  state = {
    open: false,
    location_id: 0
  }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  sendData = (planetObj) => {
    this.props.getPlanetObj(planetObj);
  }

  componentDidMount() {
    // debugger;
    let planetId = this.props.match.params.id;
    // console.log(planetId)
    // debugger
    fetch(`http://localhost:4000/planets/${planetId}`)
    .then(r => r.json())
    .then(planetObj => {
      this.sendData(planetObj)
    })
  }

  renderPlanetNames = () => {
    return this.props.stateFromMain.planets.map((planet) => {
      return (
        planet ? planet.name : 'meow'
      )
    })
  }

  handleClick = (evt) => {
    console.log(this.state.location_id, this.props.stateFromMain.token)



    fetch('http://localhost:4000/bookings', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `bearer ${this.props.stateFromMain.token}`
      },
      body: JSON.stringify({
        location_id: this.state.location_id,
        datesRange: this.props.stateFromMain.datesRange,
        numOfTravelers: this.props.stateFromMain.numOfTravelers
      })
    })
    .then(r => r.json())
    // .then(console.log)
    .then(bookingObj => {
      this.props.addBooking(bookingObj)
    })
  }



  nestedModal = () => {
   const { open } = this.state

    return <Modal
      open={open}
      onOpen={this.open}
      onClose={this.close}
      size='small'
      trigger={
    <Button circular={true} inverted color='violet' onClick={this.handleClick}>
      Book Location <Icon name='right chevron' />
    </Button>
    }
    >
    <Modal.Header>You're going to</Modal.Header>
      <Modal.Content>
        <p>That's everything!</p>
      </Modal.Content>
    <Modal.Actions>
      <Button color='black' icon='check' content='Profile' onClick={this.goToProfile} >
      </Button>
    </Modal.Actions>
    </Modal>
  }

  handleBooking = (id) => {
    this.setState({
      location_id: id
    })
  }

  renderLocations = (state) => {
    let {datesRange, numOfTravelers} = this.props.stateFromMain
    let {name} = this.props.stateFromMain.planetObj
      return this.props.stateFromMain.planetObj.locations ? this.props.stateFromMain.planetObj.locations.map((locationObj) => {
        return <Grid.Column>
           <Card centered={true}>
            <Image src={locationObj.image} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{locationObj.name}</Card.Header>

              <Modal trigger={
                <div>
                <Button animated inverted color='violet' size='small' onClick={() => this.handleBooking(locationObj.id)}
                ><Button.Content visible>Board Ship</Button.Content>
                  <Button.Content hidden>
                    <Emoji symbol="🚀🚀🚀" label="spaceship"/>
                  </Button.Content></Button>
                </div>}>
                <Modal.Header>Confirmation</Modal.Header>
                  <Modal.Content image>
                    <div className='image'>
                      <Image wrapped size='medium' src='../baby_yoda.png' />
                    </div>
                    <Modal.Description >
                    <h1>Planet: { name }</h1>
                    <h1>Location: {locationObj.name}</h1>
                    <h2>Date Range: { datesRange }</h2>
                    <h3>Number of Travelers: { numOfTravelers }</h3>
                    </Modal.Description>
                  </Modal.Content>
                  <Modal.Actions>
                    {this.nestedModal()}
                  </Modal.Actions>
              </Modal>

              <Modal trigger={
                <Button inverted color='violet'>
                <Button.Content visible>Desc</Button.Content>
                </Button>
                }>
              <Modal.Header>{locationObj.name}</Modal.Header>
                <Modal.Content image>
                  <Image wrapped size='medium' src={locationObj.image} />
                  <Modal.Description>
                  <Header></Header>
                  {locationObj.reviews.map((review) => {
                    return <p>{review.rating}</p>
                  })}
                  <ReviewForm token={this.props.stateFromMain.token} addReview={this.props.addReview} locationId={locationObj.id} error_message={this.props.stateFromMain.error_message}/>

                 </Modal.Description>
               </Modal.Content>
              </Modal>
              </Card.Content>
             </Card>
          </Grid.Column>

      }) : 'The force is not with you.'
  }


  render() {
    // debugger;
    // console.log('STATE FROM PLANET_LOCATIONS', this.state.planetObj)
    console.log(this.props.stateFromMain.planetObj.image);
    console.log(this.state.location_id);
    console.log('PROPS FROM PLANET_LOCATIONS', this.props.stateFromMain.error_message)
      return (
        <div >
        <Grid centered columns={2}>
        <Grid.Column>
          <Image src={this.props.stateFromMain.planetObj.image} />
        </Grid.Column>
        <Grid.Row centered columns={4}>
        </Grid.Row>
        </Grid>
        {this.renderLocations()}
        </div>
      );
  }
}



export default PlanetLocations;
  // <Image src={this.props.stateFromMain.planetObj.image} />
