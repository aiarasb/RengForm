import React from 'react'
import { Table } from 'react-bootstrap'
import LectureLine from './LectureLine'
import PropTypes from 'prop-types'

const LectureList = ({ lectures }) => (
  <div>
    <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>id</th>
          <th>Pavadinimas</th>
          <th>Vieta</th>
          <th>Pradžia</th>
          <th>Pabaiga</th>
          <th>Vietų skaičius</th>
          <th>Aprašymas</th>
        </tr>
      </thead>
      <tbody>
        {lectures.map((lecture, index) => (
          <LectureLine key={index} {...lecture} />
        ))}
      </tbody>
    </Table>
  </div>
)

LectureList.propTypes = {
  lectures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      place: PropTypes.string.isRequired,
      startTime: PropTypes.string.isRequired,
      endTime: PropTypes.string.isRequired,
      capacity: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
}

export default LectureList