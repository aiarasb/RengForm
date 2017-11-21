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
        <h2>Renginiai</h2>
        {isFetching && (!events || events.length === 0) && <h3>Kraunama...</h3>}
        {!isFetching && (!events || events.length === 0) && <h3>Renginių nėra</h3>}
        {events && events.length > 0 &&
          <EventList events={events}/>}
      </div>
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

export default connect(mapStateToProps)(Events)