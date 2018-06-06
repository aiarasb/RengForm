export const REQUEST = 'REQUEST_FORMS'
export const RECEIVE = 'RECEIVE_FORMS'

function request() {
  return {
    type: REQUEST
  }
}

function receive(json) {
  return {
    type: RECEIVE,
    items: json
  }
}

export function fetchItems() {
  return (dispatch, getState) => {
    dispatch(request())
    return fetch(`http://rengform.test/api/forms`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + getState().login.loginData.access_token
      }
    })
      .then(response => response.json())
      .then(json => dispatch(receive(json)))
  }
}

function shouldFetch(state) {
  if (!state.forms.items) {
    return true
  } else if (state.forms.isFetching) {
    return false
  } else {
    return state.forms.didInvalidate
  }
}

export function fetchIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetch(getState())) {
      return dispatch(fetchItems())
    } else {
      return Promise.resolve()
    }
  }
}