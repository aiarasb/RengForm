import React from 'react';
import { Table } from 'react-bootstrap';
import Event from './Event'
import PropTypes from 'prop-types'

const EventList = ({ events }) => (
  <div>
    <h2>Renginiai</h2>
    <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>Pavadinimas</th>
          <th>Data</th>
          <th>Vieta</th>
          <th>Aprašymas</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event, index) => (
          <Event key={index} {...event} />
        ))}
      </tbody>
    </Table>
  </div>
)

EventList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      place: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
}

export default EventList;