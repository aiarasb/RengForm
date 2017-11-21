import React, { Component } from 'react'
import { Grid, Jumbotron } from 'react-bootstrap'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Events from './components/Events'
import Forms from './components/Forms'
import Login from './components/Login'
import Logout from './components/Logout'
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
            <Route path="/categories" render={() => (
              this.props.loggedIn ? (
                <Categories/>
              ) : (
                <Redirect to="/login"/>
              )
            )}/>
            <Route path="/lectures" render={() => (
              this.props.loggedIn ? (
                <Lectures/>
              ) : (
                <Redirect to="/login"/>
              )
            )}/>
            <Route path="/registrations" render={() => (
              this.props.loggedIn ? (
                <Registrations/>
              ) : (
                <Redirect to="/login"/>
              )
            )}/>
            <Route path="/login" component={Login}/>
            <Route path="/logout" component={Logout}/>
          </Grid>
        </Jumbotron>
      </div>
    );
  }
}

App.propTypes = {
  loggedIn: PropTypes.bool.isRequired
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