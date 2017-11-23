import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types' 
import { withRouter } from 'react-router-dom'
import { Col, Panel, Row, ListGroupItem, ListGroup } from 'react-bootstrap'
import _ from 'lodash'

class Form extends Component {
  render() {
    const { id, title, description, config } = this.props.form
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
              <Panel header="Konfiguracija">
                <ListGroup fill>
                  {config.map((field, index) => (
                    <ListGroupItem key={index}>
                      <h4 className="list-group-item-heading">{field.title}</h4>
                      <div>Pavadinimas: {field.name}</div>
                      <div>Tipas: {field.type}</div>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </Panel>
              <Panel header="Peržiūra">
                <iframe src={"http://rengform.dev/api/lectures/"+id+"/render_form"} title="form_preview"/>
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
    config: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  }).isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const form = _.find(state.forms.items, {id: parseInt(ownProps.match.params.id, 10)})

  return {
    form
  }
}

export default withRouter(connect(mapStateToProps)(Form));