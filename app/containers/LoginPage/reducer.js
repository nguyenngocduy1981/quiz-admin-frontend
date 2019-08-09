import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from './actions';

export const initialState = {
  loading: false,
  error: false,
};

function loginResultReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      return {...state, loading: true};
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false
      };
    }
    case LOGIN_FAIL: {
      const newState = {
        ...state,
        loading: false,
        error: action.payload
      };
      return newState;
    }
    default:
      return state;
  }
}

export default loginResultReducer;
