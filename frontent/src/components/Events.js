import React, { Component } from 'react';
import { connect } from 'react-redux'
import EventList from './EventList'
import { fetchEventsIfNeeded, fetchEvents } from '../actions/events'
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
      const { eventss, isFetching } = this.props
    return (
      <div>
        {isFetching && eventss.length === 0 && <h2>Loading...</h2>}
        {!isFetching && eventss.length === 0 && <h2>Empty.</h2>}
        {eventss.length > 0 &&
          <EventList events={eventss}></EventList>}
      </div>
    );
  }
}

Events.propTypes = {
  eventss: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  const { events } = state
  const {
    isFetching,
    items: eventss
  } = events || {
    isFetching: true,
    items: []
  }

  return {
    eventss,
    isFetching
  }
}

export default connect(mapStateToProps)(Events)