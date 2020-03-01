import React, { Component } from 'react';
import { Button, Divider, Form } from 'semantic-ui-react'


// let reviewUrl = `https://localhost:4000/reviews`
class ReviewForm extends Component {

  state = {
    rating: ''
  }

  handleReviewFormSubmit = (evt) => {
    evt.preventDefault()
    // console.log('aye')

    fetch(`https://localhost:4000/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${this.props.token}`
      },
      body: JSON.stringify(this.state)
    })
  }

  render() {
    // console.log(this.props)
    return (
      <div>
      <Form onSubmit={this.handleReviewFormSubmit}size='large' key='large'>
       <Form.Group widths='equal'>
         <Form.Field
           label='Review'
           control='input'
           placeholder='Write a review...'
         />
       </Form.Group>
       <Button type='submit'>Submit</Button>
       <Divider hidden />
     </Form>

      </div>
    );
  }

}

export default ReviewForm;
