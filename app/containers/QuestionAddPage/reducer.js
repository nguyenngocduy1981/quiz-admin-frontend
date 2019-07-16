import {
  SAVE_QUESTIONS,
  SAVE_QUESTIONS_SUCCESS,
  TEMP_SAVE_QUESTION,
  ERROR,
  GET_SECTION,
  GET_SECTION_SUCCESS,
  NEW_QUESTION, MARK_EXISTED_QUESTION, RESET_ERROR, REMOVE_QUESTION, MARK_ANSWER_PICKED_FROM_GIVEN
} from './actions';
import getId from '../../utils/datetime';
import {
  ERROR_MSG,
  QUESTION_TEXT_TYPES,
  QUESTION_OPTION_TYPES,
  PASSAGE_TYPES,
  PASSAGE_TEXT,
  PASSAGE_OPTION_FROM_GIVEN
} from '../../constants/questions';
import {
  isEmptyQuestions,
  isQuestionsExisted,
  posAnsHasError,
  resetQuestionError,
  setDulicatedQuestionError,
  setEmptyQuestionError,
  setPossibleAnsError,
  setQuesOPTION_FROM_GIVENWithAnswerMustInGivenError,
  checkQuesOPTION_FROM_GIVENWithAnswerMustInGiven
} from './utils';
import notify from "../../utils/notify";

const _ = require('lodash');

const pos = {
  a: '', b: '', c: '', d: ''
};

function createNew(type) {
  const newQues = {
    id: getId(),
    text: '',
    questionType: type
  };
  if (QUESTION_TEXT_TYPES.includes(type)) {
    newQues.ans = '';
  } else if (QUESTION_OPTION_TYPES.includes(type)) {
    newQues.pos = Object.assign({}, pos);
  } else {
    console.log('nothing set');
  }

  return newQues;
}

function toQuestions(state) {
  return Object.assign([], state.questions);
}

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  questions: [],
  section: false,
  requiredPickFromGiven: false /* USED only for OPTION_FROM_GIVEN type */
};

function addQuestionReducer(state = initialState, action) {
  switch (action.type) {
    case MARK_ANSWER_PICKED_FROM_GIVEN: {
      return {...state, requiredPickFromGiven: !state.requiredPickFromGiven};
    }
    case NEW_QUESTION: {
      // TODO chú ý, update logic check ở đây thì cũng cần update "save questions" trong index.js
      const type = state.section.questionType;
      let questions = resetQuestionError(toQuestions(state));

      if (isEmptyQuestions(questions, type)) {
        questions = setEmptyQuestionError(questions, type);
        notify(ERROR_MSG.ERR_MANDATORY);
        return {...state, questions};
      }
      if (isQuestionsExisted(questions)) {
        notify(ERROR_MSG.ERR_EXISTED_Q);
        questions = setDulicatedQuestionError(questions);
        return {...state, questions};
      }

      if (QUESTION_OPTION_TYPES.includes(type) && posAnsHasError(questions)) {
        questions = setPossibleAnsError(questions);
        notify(ERROR_MSG.ERR_EXISTED_A);
        return {...state, questions};
      }

      const {requiredPickFromGiven, section} = state;
      if (requiredPickFromGiven && !checkQuesOPTION_FROM_GIVENWithAnswerMustInGiven(section, questions)) {
        questions = setQuesOPTION_FROM_GIVENWithAnswerMustInGivenError(section, questions);
        notify(ERROR_MSG.ERR_A_NOT_IN_GIVEN);
        return {...state, questions};
      }

      questions.push(createNew(type));

      return {...state, questions};
    }
    case MARK_EXISTED_QUESTION: {
      const {id, f} = action.payload;
      let questions = toQuestions(state);
      questions = questions.map(q => {
        q.error = q.id === id && f;
        return q;
      });

      return {...state, questions};
    }
    case REMOVE_QUESTION: {
      const id = action.payload.data;
      let questions = toQuestions(state);
      questions = questions.filter(q => q.id !== id);

      return {...state, questions};
    }
    case TEMP_SAVE_QUESTION: {
      const questions = toQuestions(state);
      const ques = action.payload;
      const oldQues = _.find(questions, ['id', ques.id]);
      const type = state.section.questionType;

      if (oldQues) {
        if (QUESTION_TEXT_TYPES.includes(type)) {
          oldQues.text = ques.text;
          oldQues.ans = ques.ans;
        } else {
          oldQues.text = ques.text;
          oldQues.pos = ques.pos;
        }
      } else {
        questions.push(ques);
      }

      return {...state, questions};
    }
    case SAVE_QUESTIONS: {
      const newState = {
        ...state,
        loading: true,
        error: false,
        questions: action.payload.questions,
      };

      return newState;
    }
    case SAVE_QUESTIONS_SUCCESS: {
      const {section} = state;
      const newState = {
        ...state,
        loading: false,
        questions: [createNew(section.questionType)],
      };
      return newState;
    }
    case GET_SECTION: {
      const newState = {
        ...state,
        loading: true,
        error: false,
        questions: []
      };

      return newState;
    }
    case GET_SECTION_SUCCESS: {
      const {id, text, questionType, category, options, passage} = action.payload
      const section = {id, text, questionType, category, options, passage};
      const newState = {
        ...state,
        loading: false,
        questions: [createNew(questionType)],
        section,
      };
      return newState;
    }


    case RESET_ERROR: {
      return {
        ...state,
        error: false,
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

export default addQuestionReducer;
