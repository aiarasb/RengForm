import React from 'react';
import PropTypes from 'prop-types' 

const Event = ({ title, description, date, place }) => (
  <tr>
    <td>{title}</td>
    <td>{date}</td>
    <td>{place}</td>
    <td>{description}</td>
  </tr>
)

Event.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired
}

export default Event;