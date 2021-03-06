export const REQUEST = 'REQUEST_LECTURES'
export const RECEIVE = 'RECEIVE_LECTURES'
export const CREATE = 'CREATE_LECTURE'

function request(categoryId) {
  return {
    type: REQUEST,
    categoryId
  }
}

function receive(categoryId, json) {
  return {
    type: RECEIVE,
    categoryId,
    items: json
  }
}

export function create(item) {
  return (dispatch, getState) => {
    return fetch(`http://rengform.test/api/lectures`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + getState().login.loginData.access_token
      },
      body: JSON.stringify(item)
    })
      .then(response => { dispatch(fetchItems(item.categoryId)) })
  }
}

export function remove(item) {
  return (dispatch, getState) => {
    const categoryId = item.category.id
    return fetch(`http://rengform.test/api/lectures/` + item.id, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + getState().login.loginData.access_token
      }
    })
      .then(response => { dispatch(fetchItems(categoryId)) })
  }
}

export function fetchItems(categoryId) {
  return (dispatch, getState) => {
    dispatch(request(categoryId))
    return fetch(`http://rengform.test/api/categories/`+categoryId+`/lectures`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + getState().login.loginData.access_token
      }
    })
      .then(response => response.json())
      .then(json => dispatch(receive(categoryId, json)))
  }
}

function shouldFetch(state, categoryId) {
  const items = state.lectures[categoryId]
  if (!items) {
    return true
  } else if (items.isFetching) {
    return false
  } else {
    return items.didInvalidate
  }
}

export function fetchIfNeeded(categoryId) {
  return (dispatch, getState) => {
    if (shouldFetch(getState(), categoryId)) {
      return dispatch(fetchItems(categoryId))
    } else {
      return Promise.resolve()
    }
  }
}