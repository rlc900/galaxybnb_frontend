import React, { Component } from 'react';
import { Divider, Form } from 'semantic-ui-react'


// let reviewUrl = `https://localhost:4000/reviews`
class ReviewForm extends Component {

  state = {
    rating: ''
  }

  handleReviewFormSubmit = (evt) => {
    evt.preventDefault()
    // console.log('aye')

    fetch(`http://localhost:4000/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${this.props.token}`
      },
      body: JSON.stringify({
        rating: this.state.rating,
        location_id: this.props.locationId
      })
    })
    .then( r => r.json())
    // .then(console.log)
    .then((reviewObj) => {
      // let locationId = this.props.locationId

      this.props.addReview(reviewObj)
      // console.log(reviewObj)
    })
  }

  onChange = (evt) => {
    let {name, value} = evt.target
      this.setState({
        [name]: value
      })
  }

  render() {
    // console.log(this.props)
    return (
      <div>
      <Form onSubmit={this.handleReviewFormSubmit} size='large' key='large'>
       <Form.Group widths='equal'>
         <Form.Field
           label='Review'
           control='input'
           input type='text' name='rating' value={this.state.rating} onChange={this.onChange}
           placeholder='Write a review...'
         />
       </Form.Group>
    
       <Form.Button type='submit'>Submit Review</Form.Button>

       <Divider hidden />
     </Form>

      </div>
    );
  }

}

export default ReviewForm;

 // <h2>{this.props.error_message}</h2>
