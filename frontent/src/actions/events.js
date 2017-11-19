export const REQUEST_EVENTS = 'REQUEST_EVENTS'

function requestEvents() {
  return {
    type: REQUEST_EVENTS
  }
}

export const RECEIVE_EVENTS = 'RECEIVE_EVENTS'

function receiveEvents(json) {
  return {
    type: RECEIVE_EVENTS,
    events: json,
    receivedAt: Date.now()
  }
}

export function fetchEvents() {
  return dispatch => {
    dispatch(requestEvents())
    return fetch(`http://rengform.dev/api/events`)
      .then(response => response.json())
      .then(json => dispatch(receiveEvents(json)))
  }
}

function shouldFetchEvents(state) {
  if (!state.events || (!state.events.isFetching && state.events.items.length <= 0)) {
    return true
  } else if (state.events.isFetching) {
    return false
  } else {
    return state.events.didInvalidate
  }
}

export function fetchEventsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchEvents(getState())) {
      return dispatch(fetchEvents())
    } else {
      return Promise.resolve()
    }
  }
}