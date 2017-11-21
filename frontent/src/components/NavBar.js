import React, { Component } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { Grid, Navbar, Nav, NavItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class AppNavBar extends Component {
  render() {
    return (
      <Navbar inverse fixedTop>
        <Grid>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/events">RengForm</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            {this.props.loggedIn &&
              <Nav>
                <LinkContainer exact to="/events">
                  <NavItem eventKey={2}>Renginiai</NavItem>
                </LinkContainer>
                <LinkContainer exact to="/forms">
                  <NavItem eventKey={2}>Formos</NavItem>
                </LinkContainer>
              </Nav>
            }
            <Nav pullRight>
              {!this.props.loggedIn &&
                <LinkContainer to="/login">
                  <NavItem eventKey={3}>Prisijungti</NavItem>
                </LinkContainer>
              }
              {this.props.loggedIn &&
                <LinkContainer to="/logout">
                  <NavItem eventKey={3}>Atsijungti</NavItem>
                </LinkContainer>
              }
            </Nav>
          </Navbar.Collapse>
        </Grid>
      </Navbar>
    )
  }
}

AppNavBar.propTypes = {
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

export default withRouter(connect(mapStateToProps)(AppNavBar))