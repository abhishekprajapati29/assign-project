import * as actionType from "../actions/actionsType";
import updateObject from "../utility";

const initState = {
  loading: null,
  username: null,
  error: null,
  token: null,
  baseurl: "http://localhost:3001",
};

const authStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null,
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    token: action.token,
    baseurl: "http://localhost:3001",
  });
};
const authFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};
const authLogout = (state, action) => {
  return updateObject(state, {
    username: null,
    token: null,
  });
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.AUTH_START:
      return authStart(state, action);
    case actionType.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionType.AUTH_FAIL:
      return authFail(state, action);
    case actionType.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
