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
  return (dispatch, getState) => {
    dispatch(requestEvents())
    return fetch(`http://rengform.dev/api/events`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + getState().login.loginData.access_token
      }
    })
      .then(response => response.json())
      .then(json => dispatch(receiveEvents(json)))
  }
}

function shouldFetchEvents(state) {
  if (!state.events.items) {
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