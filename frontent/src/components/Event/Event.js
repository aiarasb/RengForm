import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types' 
import { withRouter, Redirect } from 'react-router-dom'
import { Col, Panel, Row, Button, ButtonGroup } from 'react-bootstrap'
import CategoryList from '../Category/CategoryList'
import CategoryForm from '../Category/CategoryForm'
import EventForm from './EventForm'
import { fetchIfNeeded } from '../../actions/categories'
import { remove } from '../../actions/events'
import _ from 'lodash'

class Event extends Component {
  state = {
    navigate: false
  }

  componentDidMount() {
    const { dispatch, event } = this.props
    dispatch(fetchIfNeeded(event.id))
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const { dispatch, event } = this.props
      dispatch(fetchIfNeeded(event.id))
    }
  }

  delete = () => {
    const { dispatch, event } = this.props
    dispatch(remove(event))
    this.setState({navigate: true})
  }

  openForm = () => {
    this.refs.formModal.getWrappedInstance().open()
  }

  openCategoryForm = () => {
    this.refs.categoryFormModal.getWrappedInstance().open()
  }

  render() {
    const { id, title, description, date, place } = this.props.event
    const { categories, isFetching } = this.props
    const header = (<h3>{title}</h3>)
    const { navigate } = this.state

    if (navigate) {
      return <Redirect to={"/events"} push={true} />
    }

    return (
      <div>
        <Row>
          <Col md={4}>
            <Panel header={header} footer={(
              <div>
                <ButtonGroup>
                  <Button bsStyle="primary" onClick={this.openForm}>Redaguoti</Button>
                  <Button bsStyle="danger" onClick={this.delete}>Pašalinti</Button>
                </ButtonGroup>
              </div>
            )}>
              <div>Vieta: {place}</div>
              <div>Data: {date}</div>
              <div>Aprašymas: {description}</div>
            </Panel>
          </Col>
          <Col md={8}>
            <Panel header={(<h3>Katogorijos</h3>)} footer={(<Button bsStyle="primary" onClick={this.openCategoryForm}>Nauja kategorija</Button>)}>
              {isFetching && (!categories || categories.length === 0) && <h3>Kraunama...</h3>}
              {!isFetching && (!categories || categories.length === 0) && <h3>Kategorijų nėra</h3>}
              {categories && categories.length > 0 &&
                <CategoryList categories={categories}/>}
            </Panel>
          </Col>
        </Row>
        <EventForm event={this.props.event} ref="formModal"/>
        <CategoryForm eventId={id} ref="categoryFormModal"/>
      </div>
    )
  }
}

Event.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    place: PropTypes.string.isRequired
  }).isRequired,
  categories: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const event = _.find(state.events.items, {id: parseInt(ownProps.match.params.id, 10)})
  const {
    isFetching,
    items: categories
  } = state.categories[event.id] || {
    isFetching: true,
    items: []
  }

  return {
    event,
    categories,
    isFetching
  }
}

export default withRouter(connect(mapStateToProps)(Event));