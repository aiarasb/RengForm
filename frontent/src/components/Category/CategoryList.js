import React from 'react'
import { Table } from 'react-bootstrap'
import CategoryLine from './CategoryLine'
import PropTypes from 'prop-types'

const CategoryList = ({ categories }) => (
  <div>
    <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>id</th>
          <th>Pavadinimas</th>
          <th>Aprašymas</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category, index) => (
          <CategoryLine key={index} {...category} />
        ))}
      </tbody>
    </Table>
  </div>
)

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
}

export default CategoryList