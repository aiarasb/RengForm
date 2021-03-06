import React, { Component } from 'react'
import { Button, Modal, FormGroup, FormControl, ControlLabel, Form, Col } from 'react-bootstrap'
import { create, update } from '../../actions/categories'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class CategoryForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
      category_title: "",
      category_description: ""
    }
  }

  close = () => {
    this.setState({
      showModal: false,
      category_title: "",
      category_description: ""
    });
  }

  open = () => {
    const { category } = this.props
    this.setState({
      showModal: true,
      category_title: category ? category.title : "",
      category_description: category ? category.description : ""
    });
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { dispatch, eventId, category } = this.props
    const { 
      category_title,
      category_description
     } = this.state

    const newCategory = {
      title: category_title,
      description: category_description,
      eventId: eventId
    }

    if (category) {
      dispatch(update(newCategory, category.id))
    } else {
      dispatch(create(newCategory))
    }

    this.close()
  }

  render() {
    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Nauja kategorija</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal onSubmit={this.handleSubmit}>
              <FormGroup controlId="category_title">
                <Col componentClass={ControlLabel} sm={2}>
                  Pavadinimas
                </Col>
                <Col sm={10}>
                  <FormControl
                    autoFocus
                    type="text"
                    value={this.state.category_title}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup controlId="category_description">
                <Col componentClass={ControlLabel} sm={2}>
                  Aprašymas
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="textarea"
                    value={this.state.category_description}
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

CategoryForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  eventId: PropTypes.number.isRequired,
  category: PropTypes.object
}

export default connect(null, null, null, { withRef: true })(CategoryForm)