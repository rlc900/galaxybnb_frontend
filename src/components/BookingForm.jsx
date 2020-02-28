import React, { Component } from 'react';
import { Form, Select } from 'semantic-ui-react'
import { DatesRangeInput } from 'semantic-ui-calendar-react';


let numberOptions = [
  {text: '1', value: '1'},
  {text: '2', value: '2'},
  {text: '3', value: '3'},
  {text: '4', value: '4'},
  {text: '5', value: '5'},
  {text: '6', value: '6'},
  {text: '7', value: '7'},
  {text: '8', value: '8'},
  {text: '9', value: '9'},
  {text: '10', value: '10'}
]
class BookingForm extends Component {

  state = {
    planets: [],
    datesRange: '',
    numOfTravelers: '',
    selectedPlanet: ''
  }

  handleSubmit = (evt, id) => {
    evt.preventDefault()
    let {selectedPlanet} = this.state
    // Takes user to page where they can select
    // places to rent
    this.props.history.push(`/places/${selectedPlanet}`)
  }

  componentDidMount() {
    //
    fetch(`http://localhost:4000/planets`)
        .then(r => r.json())
        .then((planetObj) => {
          this.setState({
            planets: planetObj
          });
        })
  }

  formatOptions = () => {
    return this.state.planets.map(planet => {
      return {
        text: planet.name,
        value: planet.id
      }
    })
  }


  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value }, () => console.log('STATE FROM BOOKING FORM', this.state));
    }
  }

  valuesFromBooking = () => {
    let {selectedPlanet, datesRange, numOfTravelers} = this.state
      this.props.sendStateToMain(selectedPlanet, datesRange, numOfTravelers)
  }


  render() {
    // console.log(this.state)
    // console.log(this.props)
    return (
      <Form onSubmit={this.handleSubmit}>

        <Form.Group widths='equal'>
        <Form.Field
            control={Select}
            label='Planets'
            options={this.formatOptions()}
            onChange={this.handleChange}
            name={'selectedPlanet'}
            placeholder='Planets'
          />
        </Form.Group>
        <DatesRangeInput
         name="datesRange"
         placeholder="From - To"
         value={this.state.datesRange}
         iconPosition="left"
         onChange={this.handleChange}
        />
        <Form.Group widths='equal'>
        <Form.Select
          fluid
          label='How many travelers?'
          options={numberOptions}
          onChange={this.handleChange}
          name={'numOfTravelers'}
          placeholder='Travelers'
        />
      </Form.Group>

        <Form.Button>Submit</Form.Button>
      </Form>
    );
  }

}

export default BookingForm;
