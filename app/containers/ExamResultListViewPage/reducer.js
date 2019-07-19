import {
  LOAD_EXAMS_SUCCESS, ERROR, LOAD_EXAMS, UPLOAD_EXAM, UPLOAD_EXAM_DONE,
} from './actions';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  exams: false
};


function examsResultReducer(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_EXAM:
    case LOAD_EXAMS:
      return {...state, loading: true};
    case UPLOAD_EXAM_DONE: {
      return {...state, loading: false};
    }
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

export default examsResultReducer;
