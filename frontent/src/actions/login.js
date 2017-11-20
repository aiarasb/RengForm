export const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
export const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
export const SAVE_LOGIN_DATA = 'SAVE_LOGIN_DATA';
 
function setLoginPending(isLoginPending) {
  return {
    type: SET_LOGIN_PENDING,
    isLoginPending
  };
}
 
function setLoginSuccess(isLoginSuccess) {
  return {
    type: SET_LOGIN_SUCCESS,
    isLoginSuccess,
  };
}
 
function setLoginError(loginError) {
  return {
    type: SET_LOGIN_ERROR,
    loginError
  }
}
 
function saveLoginData(loginData) {
  return {
    type: SAVE_LOGIN_DATA,
    loginData
  }
}

function callLoginApi(username, password, callback) {
  let response = fetch(`http://rengform.dev/token?grant_type=password&client_id=4_5g2kkmt2w6g4oc4oowsc4kgo4sowkow4k40gc000wk40o4kgs8&client_secret=4ymbwysmzvcw8ows48cwo8gg8gc8gggw4sw0c8gkgggkwswwkw&username=`+username+`&password=`+password)
      .then(response => response.json())

  return callback(null, response)
}

export function login(email, password) {
  return dispatch => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));

    callLoginApi(email, password, (error, response) => {
      dispatch(setLoginPending(false));
      if (!error) {
        dispatch(setLoginSuccess(true));
        response.then(json => dispatch(saveLoginData(json)))
      } else {
        dispatch(setLoginError(error));
      }
    });
  }
}