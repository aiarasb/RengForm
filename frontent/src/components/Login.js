import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap"
import PropTypes from 'prop-types'
import { login } from '../actions/login'
import { Redirect } from 'react-router-dom'
import './Login.css'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "",
      password: ""
    }
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { dispatch } = this.props
    const { username, password } = this.state
    dispatch(login(username, password))
  }

  render() {
    let {isLoginPending, isLoginSuccess, loginError} = this.props;
    return (
      <div className="container">
        <form className="form-signin" onSubmit={this.handleSubmit}>
          <h2 className="form-signin-heading">Prisijunkite</h2>
          { isLoginPending && <h3>Please wait...</h3> }
          { isLoginSuccess && <Redirect to="/events"/> }
          { loginError && <h3>{loginError.message}</h3> }
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
    )
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoginPending: PropTypes.bool.isRequired,
  isLoginSuccess: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  return {
    isLoginPending: state.login.isLoginPending,
    isLoginSuccess: state.login.isLoginSuccess,
    loginError: state.login.loginError
  }
}

export default connect(mapStateToProps)(Login)