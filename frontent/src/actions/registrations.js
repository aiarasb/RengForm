export const REQUEST = 'REQUEST_REGISTRATIONS'
export const RECEIVE = 'RECEIVE_REGISTRATIONS'

function request(lectureId) {
  return {
    type: REQUEST,
    lectureId
  }
}

function receive(lectureId, json) {
  return {
    type: RECEIVE,
    lectureId,
    items: json
  }
}

export function fetchItems(lectureId) {
  return (dispatch, getState) => {
    dispatch(request(lectureId))
    return fetch(`http://rengform.dev/api/lectures/`+lectureId+`/registrations`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + getState().login.loginData.access_token
      }
    })
      .then(response => response.json())
      .then(json => dispatch(receive(lectureId, json)))
  }
}

function shouldFetch(state, lectureId) {
  const items = state.registrations[lectureId]
  if (!items) {
    return true
  } else if (items.isFetching) {
    return false
  } else {
    return items.didInvalidate
  }
}

export function fetchIfNeeded(lectureId) {
  return (dispatch, getState) => {
    if (shouldFetch(getState(), lectureId)) {
      return dispatch(fetchItems(lectureId))
    } else {
      return Promise.resolve()
    }
  }
}