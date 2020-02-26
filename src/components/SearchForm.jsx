import React, { Component } from 'react';
import { Form, Select } from 'semantic-ui-react'
import { DatesRangeInput } from 'semantic-ui-calendar-react';
// import DateForm from './DateForm'

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
class SearchForm extends Component {

  state = {
    planets: [],
    datesRange: '',
    whichPlanet: '',
    numOfTravelers: ''
  }

  handleSubmit = (evt, id) => {
    evt.preventDefault()
    let {whichPlanet} = this.state
    // Takes user to page where they can select
    // places to rent
    this.props.history.push(`/places/${whichPlanet}`)
  }

  componentDidMount() {
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
      this.setState({ [name]: value });
    }
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
            name={'whichPlanet'}
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

export default SearchForm;
