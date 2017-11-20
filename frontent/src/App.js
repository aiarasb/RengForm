import React, { Component } from 'react'
import { Grid, Jumbotron } from 'react-bootstrap'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

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
      <NavBar/>
        <Jumbotron>
          <Grid>
            <Route exact path="/" component={Home}/>
            <Route path="/events" render={() => (
              this.props.loggedIn ? (
                <Events/>
              ) : (
                <Redirect to="/login"/>
              )
            )}/>
            <Route path="/forms" render={() => (
              this.props.loggedIn ? (
                <Forms/>
              ) : (
                <Redirect to="/login"/>
              )
            )}/>
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

const mapStateToProps = state => {
  let loggedIn = true
  if (!state.login.loginData) {
    loggedIn = false
  }

  return {
    loggedIn
  }
}

export default withRouter(connect(mapStateToProps)(App))
// export default App