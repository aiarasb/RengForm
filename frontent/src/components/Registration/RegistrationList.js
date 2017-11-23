import React from 'react'
import { Table } from 'react-bootstrap'
import RegistrationLine from './RegistrationLine'
import PropTypes from 'prop-types'

const RegistrationList = ({ registrations }) => (
  <div>
    <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>id</th>
          <th>Duomenys</th>
        </tr>
      </thead>
      <tbody>
        {registrations.map((registration, index) => (
          <RegistrationLine key={index} {...registration} />
        ))}
      </tbody>
    </Table>
  </div>
)

RegistrationList.propTypes = {
  registrations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      data: PropTypes.array
    }).isRequired
  ).isRequired,
}

export default RegistrationList