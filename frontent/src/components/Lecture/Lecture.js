import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types' 
import { withRouter, Redirect } from 'react-router-dom'
import { Col, Panel, Row, Button } from 'react-bootstrap'
import RegistrationList from '../Registration/RegistrationList'
import { fetchIfNeeded } from '../../actions/registrations'
import { remove } from '../../actions/lectures'
import _ from 'lodash'

class Lecture extends Component {
  state = {
    navigate: false
  }

  componentDidMount() {
    const { dispatch, lecture } = this.props
    dispatch(fetchIfNeeded(lecture.id))
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const { dispatch, lecture } = this.props
      dispatch(fetchIfNeeded(lecture.id))
    }
  }

  delete = () => {
    const { dispatch, lecture } = this.props
    dispatch(remove(lecture))
    this.setState({navigate: true})
  }

  render() {
    const { title, description, place, startTime, endTime, capacity, category } = this.props.lecture
    const { registrations, isFetching } = this.props
    const header = (<h3>{title}</h3>)
    const { navigate } = this.state

    if (navigate) {
      return <Redirect to={"/categories/"+category.id} push={true} />
    }

    return (
      <div>
        <Row>
          <Col md={4}>
            <Panel header={header} footer={(<Button bsStyle="danger" onClick={this.delete}>Pašalinti Užsiėmimą</Button>)}>
              <div>Vieta: {place}</div>
              <div>Pradžia: {startTime}</div>
              <div>Pabaiga: {endTime}</div>
              <div>Vietų skaičius: {capacity}</div>
              <div>Aprašymas: {description}</div>
            </Panel>
          </Col>
          <Col md={8}>
            <Panel header={(<h3>Registracijos</h3>)}>
              {isFetching && (!registrations || registrations.length === 0) && <h3>Kraunama...</h3>}
              {!isFetching && (!registrations || registrations.length === 0) && <h3>Registracijų nėra</h3>}
              {registrations && registrations.length > 0 &&
                <RegistrationList registrations={registrations}/>}
            </Panel>
          </Col>
        </Row>
      </div>
    )
  }
}

Lecture.propTypes = {
  lecture: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    place: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    capacity: PropTypes.number.isRequired
  }).isRequired,
  registrations: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const lecture = _.find(state.lectures.items, {id: parseInt(ownProps.match.params.id, 10)})
  const {
    isFetching,
    items: registrations
  } = state.registrations[lecture.id] || {
    isFetching: true,
    items: []
  }

  return {
    lecture,
    registrations,
    isFetching
  }
}

export default withRouter(connect(mapStateToProps)(Lecture));