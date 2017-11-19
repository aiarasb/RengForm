import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Grid, Navbar, Nav, NavItem } from 'react-bootstrap';

class AppNavBar extends Component {
  render() {
    return (
      <Navbar inverse fixedTop>
        <Grid>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">RengForm</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Nav>
            <LinkContainer exact to="/">
              <NavItem eventKey={1}>Pradžia</NavItem>
            </LinkContainer>
            <LinkContainer exact to="/events">
              <NavItem eventKey={2}>Renginiai</NavItem>
            </LinkContainer>
            <LinkContainer exact to="/forms">
              <NavItem eventKey={2}>Formos</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            <LinkContainer to="/login">
              <NavItem eventKey={3}>Prisijungti</NavItem>
            </LinkContainer>
          </Nav>
        </Grid>
      </Navbar>
    );
  }
}

export default AppNavBar;