import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types' 
import { Redirect } from 'react-router-dom'

class EventLine extends Component {
  state = {
    navigate: false
  }

  render() {
    const { id, title, description, date, place } = this.props
    const { navigate } = this.state

    if (navigate) {
      return <Redirect to={"/events/"+id} push={true} />
    }

    return (
      <tr onClick={() => this.setState({ navigate: true })} style={{cursor:'pointer'}}>
        <td>{title}</td>
        <td>{date}</td>
        <td>{place}</td>
        <td>{description}</td>
      </tr>
    )
  }
}

EventLine.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired
}

export default connect()(EventLine);