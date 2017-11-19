import React, { Component } from 'react';
import { Grid, Jumbotron } from 'react-bootstrap';
import { Route } from 'react-router-dom';

import Home from './components/Home'
import Events from './components/Events'
import Forms from './components/Forms'
import Login from './components/Login'
import Categories from './components/Categories'
import Lectures from './components/Lectures'
import Registrations from './components/Registrations'
import NavBar from './components/NavBar'

class App extends Component {
  render() {
    return (
      <div>
      <NavBar></NavBar>
        <Jumbotron>
          <Grid>
            <Route exact path="/" component={Home}/>
            <Route path="/events" component={Events}/>
            <Route path="/forms" component={Forms}/>
            <Route path="/categories" component={Categories}/>
            <Route path="/lectures" component={Lectures}/>
            <Route path="/registrations" component={Registrations}/>
            <Route path="/login" component={Login}/>
          </Grid>
        </Jumbotron>
      </div>
    );
  }
}

export default App;