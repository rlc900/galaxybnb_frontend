import React from 'react';

// review = reviewObj passed down from PlanetLocations
const Review = (props) => {
  console.log(props)
  return(
    <li>{props.review.rating}</li>
  )
};

export default Review;
