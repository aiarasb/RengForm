import React, { Component } from 'react'
import { Button, Modal, FormGroup, FormControl, ControlLabel, Form, Col } from 'react-bootstrap'
import { create } from '../../actions/lectures'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { fetchIfNeeded } from '../../actions/forms'

class LectureForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
      lecture_title: "",
      lecture_place: "",
      lecture_startTime: "",
      lecture_endTime: "",
      lecture_capacity: "",
      lecture_description: "",
      lecture_form: ""
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchIfNeeded())
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const { dispatch } = this.props
      dispatch(fetchIfNeeded())
    }
  }

  close = () => {
    this.setState({
      showModal: false,
      lecture_title: "",
      lecture_place: "",
      lecture_startTime: "",
      lecture_endTime: "",
      lecture_capacity: "",
      lecture_description: "",
      lecture_form: ""
    });
  }

  open = () => {
    this.setState({ showModal: true });
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { dispatch, categoryId } = this.props
    const { 
      lecture_title,
      lecture_place,
      lecture_startTime,
      lecture_endTime,
      lecture_capacity,
      lecture_description,
      lecture_form
     } = this.state
    const lecture = {
      title: lecture_title,
      place: lecture_place,
      startTime: lecture_startTime,
      endTime: lecture_endTime,
      capacity: lecture_capacity,
      description: lecture_description,
      categoryId: categoryId,
      formId: lecture_form
    }
    dispatch(create(lecture))
    this.close()
  }

  render() {
    const { forms, isFetching } = this.props
    return (
      <div>
        <Button onClick={this.open}>Naujas Užsiėmimas</Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Nauja Užsiėmimas</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal onSubmit={this.handleSubmit}>
              <FormGroup controlId="lecture_title">
                <Col componentClass={ControlLabel} sm={2}>
                  Pavadinimas
                </Col>
                <Col sm={10}>
                  <FormControl
                    autoFocus
                    type="text"
                    value={this.state.lecture_title}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup controlId="lecture_place">
                <Col componentClass={ControlLabel} sm={2}>
                  Vieta
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    value={this.state.lecture_place}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup controlId="lecture_startTime">
                <Col componentClass={ControlLabel} sm={2}>
                  Pradžia
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="time"
                    value={this.state.lecture_startTime}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup controlId="lecture_endTime">
                <Col componentClass={ControlLabel} sm={2}>
                  Pabaiga
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="time"
                    value={this.state.lecture_endTime}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup controlId="lecture_capacity">
                <Col componentClass={ControlLabel} sm={2}>
                  Vietų skaičius
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="number"
                    value={this.state.lecture_capacity}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup controlId="lecture_description">
                <Col componentClass={ControlLabel} sm={2}>
                  Aprašymas
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="textarea"
                    value={this.state.lecture_description}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup controlId="lecture_form">
                <Col componentClass={ControlLabel} sm={2}>
                  Forma
                </Col>
                <Col sm={10}> 
                  {isFetching && (!forms || forms.length === 0) && <div>Kraunama...</div>}
                  {!isFetching && (!forms || forms.length === 0) && <div>Formų nėra</div>}
                  {forms && forms.length > 0 &&
                    <FormControl
                      componentClass="select" placeholder="Pasirinkite formą"
                      value={this.state.lecture_form}
                      onChange={this.handleChange}
                    >
                      <option key="0" value="0">Pasirinkite formą</option>
                      {forms.map((form, index) => (
                        <option key={form.id} value={form.id}>{form.title}</option>
                      ))}
                    </FormControl>
                  }
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleSubmit}>Sukurti</Button>
            <Button onClick={this.close}>Atšaukti</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

LectureForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  categoryId: PropTypes.number.isRequired,
  forms: PropTypes.array,
  isFetching: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
  const {
    isFetching,
    items: forms
  } = state.forms || {
    isFetching: true,
    items: []
  }

  return {
    forms,
    isFetching
  }
}

export default withRouter(connect(mapStateToProps)(LectureForm));