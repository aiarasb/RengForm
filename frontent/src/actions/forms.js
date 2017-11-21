export const REQUEST_FORMS = 'REQUEST_FORMS'
export const RECEIVE_FORMS = 'RECEIVE_FORMS'

function request() {
  return {
    type: REQUEST_FORMS
  }
}

function receive(json) {
  return {
    type: RECEIVE_FORMS,
    events: json,
    receivedAt: Date.now()
  }
}

export function fetch() {
  return (dispatch, getState) => {
    dispatch(requestEvents())
    return fetch(`http://rengform.dev/api/forms`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + getState().login.loginData.access_token
      }
    })
      .then(response => response.json())
      .then(json => dispatch(receiveEvents(json)))
  }
}

function shouldFetch(state) {
  if (!state.events.items) {
    return true
  } else if (state.events.isFetching) {
    return false
  } else {
    return state.events.didInvalidate
  }
}

export function fetchIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetch(getState())) {
      return dispatch(fetch())
    } else {
      return Promise.resolve()
    }
  }
}