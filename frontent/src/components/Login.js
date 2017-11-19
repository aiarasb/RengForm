import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <form className="form-signin" onSubmit={this.handleSubmit}>
          <h2 className="form-signin-heading">Prisijunkite</h2>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel className="sr-only">Vartotojo vardas</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              placeholder="Vartotojo vardas"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel className="sr-only">Slaptažodis</ControlLabel>
            <FormControl
              placeholder="Slaptažodis"
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Prisijungti
          </Button>
        </form>
      </div>
    );
  }
}

export default Login;