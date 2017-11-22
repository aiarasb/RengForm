import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types' 
import { Redirect } from 'react-router-dom'

class FormLine extends Component {
  state = {
    navigate: false
  }

  render() {
    const { id, title, description } = this.props
    const { navigate } = this.state

    if (navigate) {
      return <Redirect to={"/forms/"+id} push={true} />
    }

    return (
      <tr onClick={() => this.setState({ navigate: true })} style={{cursor:'pointer'}}>
        <td>{title}</td>
        <td>{description}</td>
      </tr>
    )
  }
}

FormLine.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default connect()(FormLine);