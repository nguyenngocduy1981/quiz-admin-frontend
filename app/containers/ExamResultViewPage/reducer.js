import {
  APPROVE_QUES,
  ERROR, LOAD_EXAM_BY_ID, LOAD_EXAM_BY_ID_SUCCESS, RESET_ERROR, SAVE_EXAM, SAVE_EXAM_SUCCESS
} from './actions';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  exam: []
};

function evaluateQues(ques) {
  if (ques.correct) return ques;

  ques.correct = ques.answer === ques.answered;
  return ques;
}

function evaluate(e) {
  const {questions} = e;
  e.questions = questions.map(evaluateQues);
  return e;
}

function evaluateResult(exam) {
  exam.map(evaluate);
  return exam;
}

function examResultReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EXAM_BY_ID: {
      return {...state, loading: true};
    }
    case SAVE_EXAM: {
      return {
        ...state,
        loading: true
      };
    }
    case APPROVE_QUES: {
      const newState = {
        ...state,
        exam: action.payload
      };
      return newState;
    }
    case LOAD_EXAM_BY_ID_SUCCESS: {
      const exam = evaluateResult(action.payload);
      const newState = {
        ...state,
        loading: false,
        exam
      };
      return newState;
    }

    case SAVE_EXAM_SUCCESS:
    case RESET_ERROR: {
      return {
        ...state,
        loading: false,
      };
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

export default examResultReducer;
