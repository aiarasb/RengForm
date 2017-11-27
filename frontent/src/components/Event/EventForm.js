import React, { Component } from 'react'
import { Button, Modal, FormGroup, FormControl, ControlLabel, Form, Col } from 'react-bootstrap'
import { create } from '../../actions/events'
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
    this.setState({ showModal: true });
    const {event} = this.props
    console.log(event)
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { dispatch } = this.props
    const { 
      event_title,
      event_place,
      event_date,
      event_description
     } = this.state
    const event = {
      title: event_title,
      place: event_place,
      date: event_date,
      description: event_description
    }
    dispatch(create(event))
    this.close()
  }

  render() {
    return (
      <div>
        <Button bsStyle="primary" onClick={this.open}>Naujas renginys</Button>

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
            <Button bsStyle="primary" onClick={this.handleSubmit}>Sukurti</Button>
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

export default connect()(EventForm)