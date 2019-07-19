import {
  ERROR,
  GET_QUESTIONS,
  REMOVE_QUESTION,
  GET_QUESTIONS_SUCCESS, REMOVE_QUESTION_SUCCESS, ADD_2_EXAM, LOAD_EXAM_FROM_LOCAL_STORAGE, ADD_2_EXAM_BULK
} from './actions';
import {addExam, addExamBulk, getExam} from "../../utils/local-storage";

const _ = require('lodash');

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  questions: false,
  pageCount: false,
  currentPage: 1,
  section: false,
  passage: false,
  exam: {}
};

// function extractSection(questions) {
//   if (questions.length > 0) {
//     const {sectionId, sectionName, type, options} = questions[0];
//     return {id: sectionId, text: sectionName, questionType: type, options};
//   }
//   return false;
// }

function viewQuestionInSectionReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EXAM_FROM_LOCAL_STORAGE: {
      return {...state, exam: getExam()};
    }
    case ADD_2_EXAM_BULK: {
      return {...state, exam: addExamBulk(action.payload)};
    }
    case ADD_2_EXAM: {
      return {...state, exam: addExam(action.payload)};
    }
    case GET_QUESTIONS: {
      const {page} = action.payload;
      const newState = {
        ...state,
        loading: true,
        currentPage: page,
        error: false
      };

      return newState;
    }
    case GET_QUESTIONS_SUCCESS: {
      const {data, pageCount} = action.payload;
      const {section, passage, questions} = data;
      const newState = {
        ...state,
        loading: false,
        section,
        passage,
        questions,
        pageCount
      };
      return newState;
    }

    case REMOVE_QUESTION_SUCCESS: {
      let questions = Object.assign([], state.questions);
      questions = questions.filter(q => q.id !== action.id);

      return {...state, questions};
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

export default viewQuestionInSectionReducer;
