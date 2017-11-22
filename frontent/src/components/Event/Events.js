import React, { Component } from 'react'
import { connect } from 'react-redux'
import EventList from './EventList'
import EventForm from './EventForm'
import Event from './Event'
import { fetchEventsIfNeeded } from '../../actions/events'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class Events extends Component { 

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchEventsIfNeeded())
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const { dispatch } = this.props
      dispatch(fetchEventsIfNeeded())
    }
  }

  render() {
    const { events, isFetching } = this.props

    if (!this.props.match.params.id) {
      return (
        <div>
          <h2>Renginiai</h2>
          {isFetching && (!events || events.length === 0) && <h3>Kraunama...</h3>}
          {!isFetching && (!events || events.length === 0) && <h3>Renginių nėra</h3>}
          {events && events.length > 0 &&
            <EventList events={events}/>}
          <EventForm/>
        </div>
      )
    }

    return (
      <Event id={this.props.match.params.id}/>
    )
  }
}

Events.propTypes = {
  events: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  const {
    isFetching,
    items: events
  } = state.events || {
    isFetching: true,
    items: []
  }

  return {
    events,
    isFetching
  }
}

export default withRouter(connect(mapStateToProps)(Events))