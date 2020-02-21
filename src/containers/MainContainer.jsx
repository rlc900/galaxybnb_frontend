import React, { Component } from 'react';
import Form from './components/Form'
import NavBar from './components/NavBar'
import {Route} from 'react-router'
import {withRouter} from 'react-router-dom'

class MainContainer extends Component {

  renderForm = () => {

  }

  render() {
    // console.log(this.routerProps)
    return (
      <div>
      <Route path='/signup' render={this.renderForm}/>
      <Route path='/login' render={this.renderForm}/>

      </div>
    );
  }

}

export default MainContainer;
