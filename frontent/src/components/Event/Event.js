import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types' 
import { withRouter } from 'react-router-dom'
import { Col, Panel, Row } from 'react-bootstrap'
import CategoryList from '../Category/CategoryList'
import CategoryForm from '../Category/CategoryForm'
import { fetchIfNeeded } from '../../actions/categories'
import _ from 'lodash'

class Event extends Component {

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

  render() {
    const { id, title, description, date, place } = this.props.event
    const { categories, isFetching } = this.props
    const header = (<h3>{title}</h3>)
    return (
      <div>
        <Row>
          <Col md={4}>
            <Panel header={header}>
              <div>Vieta: {place}</div>
              <div>Data: {date}</div>
              <div>Aprašymas: {description}</div>
            </Panel>
          </Col>
          <Col md={8}>
            <Panel header={(<h3>Katogorijos</h3>)}>
              {isFetching && (!categories || categories.length === 0) && <h3>Kraunama...</h3>}
              {!isFetching && (!categories || categories.length === 0) && <h3>Kategorijų nėra</h3>}
              {categories && categories.length > 0 &&
                <CategoryList categories={categories}/>}
                <CategoryForm eventId={id}/>
            </Panel>
          </Col>
        </Row>
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