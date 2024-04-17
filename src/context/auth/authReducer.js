import {
  CLEAR_ERRORS,
  AUTH_LOADING,
  SET_USER,
  AUTH_ERROR,
  LOGOUT,
  LOGIN,
  REGISTER,
  GET_USER_LOADING,
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: true,
      }
    case GET_USER_LOADING:
      return {
        ...state,
        userLoading: true,
      }
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        userLoading: false,
      }
    case LOGOUT:
      return {
        ...state,
        user: null,
        userLoading: false,
      }
    case LOGIN:
    case REGISTER:
      return {
        ...state,
        loading: false,
        userLoading: false,
      }
    case AUTH_ERROR:
      return {
        ...state,
        loading: false,
        userLoading: false,
      }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        loading: false,
      }
    default:
      return state
  }
}
