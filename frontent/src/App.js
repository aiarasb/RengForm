import React, { Component } from 'react'
import { Grid } from 'react-bootstrap'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Events from './components/Event/Events'
import Forms from './components/Form/Forms'
import Login from './components/Login'
import Category from './components/Category/Category'
import Lecture from './components/Lecture/Lecture'
import Home from './components/Home'
import Logout from './components/Logout'
import NavBar from './components/NavBar'

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <NavBar/>
        </header>
        <main role="main" className="container" style={{padding: "60px 15px 0"}}>
          <Grid>
            <Route exact path="/" component={Home}/>
            <Route path="/events/:id?" render={() => (
              this.props.loggedIn ? (
                <Events/>
              ) : (
                <Redirect to="/login"/>
              )
            )}/>
            <Route path="/forms/:id?" render={() => (
              this.props.loggedIn ? (
                <Forms/>
              ) : (
                <Redirect to="/login"/>
              )
            )}/>
            <Route path="/categories/:id" render={() => (
              this.props.loggedIn ? (
                <Category/>
              ) : (
                <Redirect to="/login"/>
              )
            )}/>
            <Route path="/lectures/:id" render={() => (
              this.props.loggedIn ? (
                <Lecture/>
              ) : (
                <Redirect to="/login"/>
              )
            )}/>
            <Route path="/login" component={Login}/>
            <Route path="/logout" component={Logout}/>
          </Grid>
        </main>
        <footer className="footer">
          <div className="container">
            <span className="text-muted">RengForm 2017</span>
            <embed className="pull-right" style={{ width: 'auto', height: 60 }} type="image/svg+xml" src="skyline.svg" />
          </div>
        </footer>
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