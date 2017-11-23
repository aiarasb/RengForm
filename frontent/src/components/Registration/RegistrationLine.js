import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types' 

class RegistrationLine extends Component {
  render() {
    const { id, data } = this.props
    return (
      <tr onClick={() => this.setState({ navigate: true })} style={{cursor:'pointer'}}>
        <td>{id}</td>
        <td>{JSON.stringify(data)}</td>
      </tr>
    )
  }
}

RegistrationLine.propTypes = {
  id: PropTypes.number.isRequired,
  data: PropTypes.array
}

export default connect()(RegistrationLine);