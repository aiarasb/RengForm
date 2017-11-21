import React from 'react';
import PropTypes from 'prop-types' 

const Form = ({ title, description }) => (
  <tr>
    <td>{title}</td>
    <td>{description}</td>
  </tr>
)

Form.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default Form;