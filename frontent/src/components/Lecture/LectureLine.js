import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types' 
import { Redirect } from 'react-router-dom'

class LectureLine extends Component {
  state = {
    navigate: false
  }

  render() {
    const { id, title, description, place, startTime, endTime, capacity } = this.props
    const { navigate } = this.state

    if (navigate) {
      return <Redirect to={"/lectures/"+id} push={true} />
    }

    return (
      <tr onClick={() => this.setState({ navigate: true })} style={{cursor:'pointer'}}>
        <td>{id}</td>
        <td>{title}</td>
        <td>{place}</td>
        <td>{startTime}</td>
        <td>{endTime}</td>
        <td>{capacity}</td>
        <td>{description}</td>
      </tr>
    )
  }
}

LectureLine.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  capacity: PropTypes.number.isRequired
}

export default connect()(LectureLine);