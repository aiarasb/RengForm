import React, { Component } from 'react'
import { Button, Modal, FormGroup, FormControl, ControlLabel, Form, Col } from 'react-bootstrap'
import { create, update } from '../../actions/events'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class EventForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
      event_title: "",
      event_place: "",
      event_date: "",
      event_description: ""
    }
  }

  close = () => {
    this.setState({
      showModal: false,
      event_title: "",
      event_place: "",
      event_date: "",
      event_description: ""
    });
  }

  open = () => {
    const {event} = this.props
    this.setState({
      showModal: true,
      event_title: event ? event.title : "",
      event_place: event ? event.place : "",
      event_date: event ? event.date : "",
      event_description: event ? event.description : ""
    });
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { dispatch, event } = this.props
    const { 
      event_title,
      event_place,
      event_date,
      event_description
     } = this.state

    const newEvent = {
      title: event_title,
      place: event_place,
      date: event_date,
      description: event_description
    }

    if (event) {
      dispatch(update(newEvent, event.id))
    } else {
      dispatch(create(newEvent))
    }
    this.close()
  }

  render() {
    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Naujas renginys</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal onSubmit={this.handleSubmit}>
              <FormGroup controlId="event_title">
                <Col componentClass={ControlLabel} sm={2}>
                  Pavadinimas
                </Col>
                <Col sm={10}>
                  <FormControl
                    autoFocus
                    type="text"
                    value={this.state.event_title}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup controlId="event_place">
                <Col componentClass={ControlLabel} sm={2}>
                  Vieta
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    value={this.state.event_place}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup controlId="event_date">
                <Col componentClass={ControlLabel} sm={2}>
                  Data
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="date"
                    value={this.state.event_date}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup controlId="event_description">
                <Col componentClass={ControlLabel} sm={2}>
                  Aprašymas
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="textarea"
                    value={this.state.event_description}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.handleSubmit}>Saugoti</Button>
            <Button onClick={this.close}>Atšaukti</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

EventForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  event: PropTypes.object
}

export default connect(null, null, null, { withRef: true })(EventForm)