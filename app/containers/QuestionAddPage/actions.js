export const NEW_QUESTION = '[QuestionAdPage] NEW_QUESTION';

export const TEMP_SAVE_QUESTION = '[QuestionAdPage] TEMP_SAVE_QUESTION';

export const MARK_EXISTED_QUESTION = '[QuestionAdPage] MARK_EXISTED_QUESTION';
export const CHECK_EXISTED_QUESTION = '[QuestionAdPage] CHECK_EXISTED_QUESTION';
export const REMOVE_QUESTION = '[QuestionAdPage] REMOVE_QUESTION ';

export const SAVE_QUESTIONS = '[QuestionAdPage] save questions';
export const SAVE_QUESTIONS_SUCCESS = '[QuestionAdPage] save questions SUCCESS';
export const ERROR = '[QuestionAdPage] save questions ERROR';
export const RESET_ERROR = '[QuestionAdPage] save questions RESET_ERROR';

export const GET_SECTION = '[QuestionAdPage] GET_SECTION';
export const GET_SECTION_SUCCESS = '[QuestionAdPage] GET_SECTION SUCCESS';

export const MARK_ANSWER_PICKED_FROM_GIVEN = '[QuestionAdPage] MARK_ANSWER_PICKED_FROM_GIVEN';
export const GO_HOME = '[QuestionAdPage] GO_HOME';

export function goHome(catId) {
  return {
    type: GO_HOME,
    catId
  };
}

export function removeQuestion(payload) {
  return {
    type: REMOVE_QUESTION,
    payload
  };
}
export function markAnswerPickedFromGiven() {
  return {
    type: MARK_ANSWER_PICKED_FROM_GIVEN,
  };
}

export function resetError() {
  return {
    type: RESET_ERROR,
  };
}

export function markExistedQuestion(payload) {
  return {
    type: MARK_EXISTED_QUESTION,
    payload
  };
}

export function checkExistedQuestion(payload) {
  return {
    type: CHECK_EXISTED_QUESTION,
    payload
  };
}

export function saveTempQuestion(payload) {
  return {
    type: TEMP_SAVE_QUESTION,
    payload
  };
}

export function saveQuestions(payload) {
  return {
    type: SAVE_QUESTIONS,
    payload
  };
}

export function newQuestion() {
  return {
    type: NEW_QUESTION
  };
}

export function saveQuestionsSuccess() {
  return {
    type: SAVE_QUESTIONS_SUCCESS
  };
}

export function requestError() {
  return {
    type: ERROR,
  };
}

export function getSection(sectionId) {
  return {
    type: GET_SECTION,
    sectionId
  };
}

export function getSectionSuccess(payload) {
  return {
    type: GET_SECTION_SUCCESS,
    payload
  };
}
