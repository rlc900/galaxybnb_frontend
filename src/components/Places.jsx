import React, { Component } from 'react';

// let locations_url = `http://localhost:4000/locations`

class Places extends Component {

  state = {
    locations: []
  }

  componentDidMount() {
    // debugger;
    let planetId = this.props.match.params.id
    fetch(`http://localhost:4000/planets/${planetId}`)
    .then(r => r.json())
    // .then(console.log)
    .then(planetObj => {
      // console.log(planetObj.locations[0])
      this.setState({
        locations: planetObj.locations
      })
    })
  }
  //
  renderLocations = () => {
      let locations = this.state.locations.map((locationObj) => {
          return <li>{locationObj.name}</li>
      })
      return locations
  }

  render() {
    // debugger;
    console.log(this.state.locations)
      return (
        <div>
        {this.renderLocations()}
        </div>
      );
  }
}

export default Places;
