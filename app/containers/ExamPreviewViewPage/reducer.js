import {
  LOAD_EXAM_PREVIEW_SUCCESS, ERROR, CANCEL_EXAM
} from './actions';
import {clearExam} from "../../utils/local-storage";

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  exam: []
};


function examPreviewReducer(state = initialState, action) {
  switch (action.type) {
    case CANCEL_EXAM: {
      clearExam();
      return {...state, exam: {}};
    }
    case LOAD_EXAM_PREVIEW_SUCCESS: {
      const newState = {
        ...state,
        loading: false,
        exam: action.payload
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

export default examPreviewReducer;
