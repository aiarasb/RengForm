import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types' 
import { withRouter } from 'react-router-dom'
import { Col, Panel, Row } from 'react-bootstrap'
import _ from 'lodash'

class Form extends Component {
  render() {
    const { title, description, config } = this.props.form
    const header = (<h3>{title}</h3>)
    return (
      <div>
        <Row>
          <Col md={4}>
            <Panel header={header}>
              <div>{description}</div>
            </Panel>
          </Col>
          <Col md={8}>
            <Panel header={(<h3>Konfiguracija</h3>)}>
              { JSON.stringify(config) }
            </Panel>
          </Col>
        </Row>
      </div>
    )
  }
}

Form.propTypes = {
  form: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    config: PropTypes.array.isRequired,
  }).isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const form = _.find(state.forms.items, {id: parseInt(ownProps.match.params.id, 10)})

  return {
    form
  }
}

export default withRouter(connect(mapStateToProps)(Form));