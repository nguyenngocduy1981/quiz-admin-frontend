export const GET_QUESTIONS = '[QuestionViewPage] get questions';
export const GET_QUESTIONS_SUCCESS = '[QuestionViewPage] get questions SUCCESS';

export const REMOVE_QUESTION = '[QuestionViewPage] REMOVE_QUESTION ';
export const REMOVE_QUESTION_SUCCESS = '[QuestionViewPage] REMOVE_QUESTION _SUCCESS';

export const ADD_2_EXAM_BULK = '[QuestionViewPage] ADD_2_EXAM_BULK';
export const ADD_2_EXAM = '[QuestionViewPage] ADD_2_EXAM';
export const LOAD_EXAM_FROM_LOCAL_STORAGE = '[QuestionViewPage] LOAD_EXAM_FROM_LOCAL_STORAGE';

export const ERROR = '[QuestionAdPage] ERROR';

export const GO_HOME = '[QuestionAdPage] GO_HOME';

export function loadExamFromLocalStorage() {
  return {
    type: LOAD_EXAM_FROM_LOCAL_STORAGE,
  };
}
export function add2Exam(payload) {
  return {
    type: ADD_2_EXAM,
    payload
  };
}
export function add2ExamBulk(payload) {
  return {
    type: ADD_2_EXAM_BULK,
    payload
  };
}

export function removeQuestion(id) {
  return {
    type: REMOVE_QUESTION,
    id
  };
}

export function removeQuestionSuccess(id) {
  return {
    type: REMOVE_QUESTION_SUCCESS,
    id
  };
}


export function goHome(payload) {
  return {
    type: GO_HOME,
    payload
  };
}

export function requestError() {
  return {
    type: ERROR,
  };
}

export function getQuestions(payload) {
  return {
    type: GET_QUESTIONS,
    payload
  };
}

export function getQuestionsSuccess(payload) {
  return {
    type: GET_QUESTIONS_SUCCESS,
    payload
  };
}
