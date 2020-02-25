import React, { Component } from 'react';

let locations_url = `http://localhost:4000/locations`

class Places extends Component {

  state = {
    locations: []
  }

  componentDidMount() {
    // debugger;
    fetch(locations_url)
    .then(r => r.json())
    // .then(console.log)
    .then(locationData => {
      this.setState({
        locations: [...this.state.locations, locationData]
      })
    })
  }

  renderLocations = () => {
      let locations = this.state.locations.map((locationArr) => {
        return locationArr.map((location) => {
          return <li>{location.name}</li>
        })
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
