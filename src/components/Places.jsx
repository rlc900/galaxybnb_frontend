import React, { Component } from 'react';
import { Grid, Image, Card, Button} from 'semantic-ui-react'


// let locations_url = `http://localhost:4000/locations`

class Places extends Component {

  state = {
    planetObj: {}
  }

  componentDidMount() {
    // debugger;
    let planetId = this.props.match.params.id;
    // console.log(planetId)
    // debugger
    fetch(`http://localhost:4000/planets/${planetId}`)
    .then(r => r.json())
    .then(planetObj => {
      // console.log(planetObj)
      this.setState({
        planetObj: planetObj
      })
    })
  }
  //
  renderLocations = () => {
      return this.state.planetObj.locations ? this.state.planetObj.locations.map((locationObj) => {
          return <Card>
            <Image src={locationObj.image} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{locationObj.name}</Card.Header>
              <Card.Meta>
                <span className='date'>Joined in 2015</span>
              </Card.Meta>
            <button class="ui circular icon button"><i aria-hidden="true" class="settings icon"></i></button>
           </Card.Content>
          </Card>
      }) : 'The force is not with you.'
  }




  render() {
    // debugger;
      return (
        <div>
        <Grid centered columns={2}>
        <Grid.Column>
          <Image src={this.state.planetObj.image} />
        </Grid.Column>
        <Grid.Row centered columns={4}>
          <Grid.Column>
            <Image src='' />
          </Grid.Column>
          <Grid.Column>
            <Image src='' />
          </Grid.Column>
        </Grid.Row>
        </Grid>
        {this.renderLocations()}
        </div>
      );
  }
}

export default Places;
