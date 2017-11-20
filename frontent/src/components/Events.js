import React, { Component } from 'react'
import { connect } from 'react-redux'
import EventList from './EventList'
import { fetchEventsIfNeeded } from '../actions/events'
import PropTypes from 'prop-types'

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
    return (
      <div>
        {isFetching && (!events || events.length === 0) && <h2>Kraunama...</h2>}
        {!isFetching && (!events || events.length === 0) && <h2>Renginių nėra</h2>}
        {events && events.length > 0 &&
          <EventList events={events}></EventList>}
      </div>
    )
  }
}

Events.propTypes = {
  events: PropTypes.array.isRequired,
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

export default connect(mapStateToProps)(Events)