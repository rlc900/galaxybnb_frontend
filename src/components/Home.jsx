import React, { Component } from 'react';
import {Header} from 'semantic-ui-react'
import SearchForm from './SearchForm'

class Home extends Component {

  render() {
    return (
      <div className='home'>
      <Header as='h1' inverted color ='violet' >Galaxybnb</Header>
      <SearchForm history={this.props.history}/>
      </div>
    );
  }

}

export default Home;
