import {LOAD_EXAM_SUCCESS, LOAD_EXAM, LOAD_REPOS_ERROR, ANSWER} from './actions';
import {saveExam} from '../../../utils/local-storage';

const _ = require('lodash');

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  exam: false,
};

function examReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EXAM: {
      const newState = {
        ...state,
        loading: true,
        error: false,
        exam: false,
      };

      return newState;
    }
    case LOAD_EXAM_SUCCESS: {
      const newState = {
        ...state,
        loading: false,
        exam: action.exam,
      };
      return newState;
    }


    case LOAD_REPOS_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case ANSWER: {
      const {ques, sectionId} = action.payload;
      const exam = Object.assign([], state.exam);

      const {questions} = exam.filter(e => e.section.id === sectionId)[0];
      const oldQues = _.find(questions, ['id', ques.id]);
      oldQues.answered = ques.answered;

      saveExam(exam);

      return {
        ...state,
        error: action.error,
        loading: false,
        exam,
      };
    }

    default:
      return state;
  }
}

export default examReducer;
