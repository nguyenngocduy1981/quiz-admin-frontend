import {
  LOAD_EXAMS_SUCCESS, ERROR, LOAD_EXAMS,
} from './actions';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  exams: false
};


function examsReportReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EXAMS:
      return {...state, loading: true};
    case LOAD_EXAMS_SUCCESS: {
      const newState = {
        ...state,
        loading: false,
        exams: action.payload
      };
      return newState;
    }
    case ERROR: {
      return {
        ...state,
        error: true,
        loading: false,
      };
    }
    default:
      return state;
  }
}

export default examsReportReducer;
