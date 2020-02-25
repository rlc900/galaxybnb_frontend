import React, { Component } from 'react';
import { Form, Select } from 'semantic-ui-react'
import {DatesRangeInput} from 'semantic-ui-calendar-react'


class SearchForm extends Component {

  state = {
    planets: [],
    datesRange: ''
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    console.log('hey')
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
        value: planet.name
      }
    })
  }
  handleChange = (evt, {name, value}) => {
    let {datesRange} = this.state
    if (datesRange.hasOwnProperty(name)) {
      this.setState({
        [name]: value
      });
    }
  }

  render() {
    // console.log(this.state.planets)
    return (
      <Form onSubmit={this.handleSubmit}>

        <Form.Group widths='equal'>
        <Form.Field
            control={Select}
            label='Planets'
            options={this.formatOptions()}
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
          options={[]}
          placeholder='Travelers'
        />
      </Form.Group>

        <Form.Button>Submit</Form.Button>
      </Form>
    );
  }

}

export default SearchForm;
