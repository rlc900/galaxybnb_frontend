import React, { Component } from 'react';
import { Grid, Image, Card, Button, Icon, Modal } from 'semantic-ui-react'
import Emoji from './Emoji'
// import BookingForm from './BookingForm'


// let locations_url = `http://localhost:4000/locations`


class PlanetLocations extends Component {

  state = {
    planetObj: {},
    open: false
  }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  componentDidMount() {
    // debugger;
    let planetId = this.props.match.params.id;
    // console.log(planetId)
    // debugger
    fetch(`http://localhost:4000/planets/${planetId}`)
    .then(r => r.json())
    .then(planetObj => {
      this.setState({
        planetObj: planetObj
      })
    })
  }

  renderPlanetNames = () => {
    return this.props.stateFromMain.planets.map((planet) => {
      // console.log(planet.name)
      // return (
      //   planet.name
      // )
      return (
        planet ? planet.name : 'meow'
      )
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
    <Button primary icon>
      Travel <Icon name='right chevron' />
    </Button>
    }
    >
    <Modal.Header>You're going to</Modal.Header>
      <Modal.Content>
        <p>That's everything!</p>
      </Modal.Content>
    <Modal.Actions>
      <Button icon='check' content='All Done' onClick={this.close} />
    </Modal.Actions>
    </Modal>
  }



  renderLocations = (state) => {
    let {datesRange, numOfTravelers} = this.props.stateFromMain
    let {name} = this.state.planetObj
      return this.state.planetObj.locations ? this.state.planetObj.locations.map((locationObj) => {
        return <Grid.Column>
           <Card centered={true}>
            <Image src={locationObj.image} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{locationObj.name}</Card.Header>

              <Modal trigger={
                <div className='ui two buttons'>
                <Button animated><Button.Content visible>Board Ship</Button.Content>
                  <Button.Content hidden>
                    <Emoji symbol="🚀🚀🚀" label="spaceship"/>
                  </Button.Content></Button>
                  <Button animated='vertical'><Button.Content visible>Desc</Button.Content>
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
                    <h2>Date Range: { datesRange }</h2>
                    <h3>Number of Travelers: { numOfTravelers }</h3>
                    </Modal.Description>
                  </Modal.Content>
                  <Modal.Actions>
                    {this.nestedModal()}
                  </Modal.Actions>
              </Modal>

           </Card.Content>
          </Card>
          </Grid.Column>

      }) : 'The force is not with you.'
  }


  render() {
    // debugger;
    console.log(this.state)
    // PLANETS ARRAY
    // console.log(this.props.stateFromMain.datesRange)
      return (
        <div >
        <Grid centered columns={2}>
        <Grid.Column>
          <Image src={this.state.planetObj.image} />
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

// <div className='ui two buttons'>
//          <Button basic color='green'>
//            Approve
//          </Button>
//          <Button basic color='red'>
//            Decline
//          </Button>
//        </div>


// <Modal trigger={
//
//   <Button animated><Button.Content visible>Board Ship</Button.Content>
//   <Button.Content hidden>
//     <Emoji symbol="🚀🚀🚀" label="spaceship"/>
//   </Button.Content></Button>}>
