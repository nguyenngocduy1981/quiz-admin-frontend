import {LOAD_EXAM_LIST, LOAD_EXAM_LIST_FAIL, LOAD_EXAM_LIST_SUCCESS} from './actions';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  examList: false,
};

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EXAM_LIST: {
      const newState = {
        ...state,
        loading: true,
        error: false,
        examList: false,
      };

      return newState;
    }
    case LOAD_EXAM_LIST_SUCCESS: {
      let examList = action.payload;
      if (!examList || examList.length === 0) {
        examList = false;
      }

      const newState = {
        ...state,
        loading: false,
        examList
      };
      return newState;
    }

    case LOAD_EXAM_LIST_FAIL: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }

    default:
      return state;
  }
}

export default homeReducer;
