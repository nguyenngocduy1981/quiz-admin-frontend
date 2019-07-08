import {OPTION_FROM_GIVEN, QUESTION_TEXT_TYPES} from "../../constants/questions";

const _ = require('lodash');

function posAnsHasDuplicate(q) {
  const pos = q.pos;
  return _.uniq([pos.a, pos.b, pos.c, pos.d]).length < 4;
}

function isEmptyTextQuestion(q) {
  return q.text === '' || q.ans === '';
}

function isEmptyPosQuestion(q) {
  // TODO cho nay can check "answer possible answer nua
  const pos = q.pos;
  return q.text === '' ||
    pos.length === 0 ||
    pos.a === '' ||
    pos.b === '' ||
    pos.c === '' ||
    pos.d === '';
}

function isAnsInGiven(sec, q) {
  return sec.options.includes(q.ans);
}

function isOPTION_FROM_GIVEN(q) {
  return q.questionType === OPTION_FROM_GIVEN;
}

export function validateOption(questions) {
  return questions.map(q => {
    const pos = q.pos;
    q.error = q.text === '' ||
      pos.length === 0 ||
      pos.a === '' ||
      pos.b === '' ||
      pos.c === '' ||
      pos.d === '';

    return q;
  });
}

export function validateText(questions) {
  return questions.map(q => {
    q.error = q.text === '';
    return q;
  });
}

export function validateQuestions(questions, type) {
  if (QUESTION_TEXT_TYPES.includes(type)) {
    return validateText(questions);
  }
  return validateOption(questions);
}

export function resetQuestionError(questions) {
  return questions.map(q => {
    q.error = false;
    return q;
  });
}

export function setDulicatedQuestionError(questions) {
  return questions.map(q => {
    q.error = questions.filter(x => x.text === q.text).length > 1;
    return q;
  });
}

export function setEmptyQuestionError(questions, type) {
  if (QUESTION_TEXT_TYPES.includes(type)) {
    return questions.map(q => {
      q.error = isEmptyTextQuestion(q);
      return q;
    });
  }
  return questions.map(q => {
    q.error = isEmptyPosQuestion(q)
    return q;
  });
}

export function setPossibleAnsError(questions) {
  return questions.map(q => {
    q.error = posAnsHasDuplicate(q)
    return q;
  });
}

export function setQuesOPTION_FROM_GIVENWithAnswerMustInGivenError(section, questions) {
  return questions.map(q => {
    if (!isOPTION_FROM_GIVEN(q)) return q;

    q.error = !isAnsInGiven(section, q);
    return q;
  });
}

export function checkQuesOPTION_FROM_GIVENWithAnswerMustInGiven(section, questions) {
  questions = questions.filter(isOPTION_FROM_GIVEN);

  const len = questions.length;
  if (len === 0) return true;

  return questions.filter(q => isAnsInGiven(section, q)).length === len;
}

export function posAnsHasError(questions) {
  return questions.filter(posAnsHasDuplicate).length > 0;
}

export function isEmptyQuestions(questions, type) {
  if (QUESTION_TEXT_TYPES.includes(type)) {
    return questions.filter(isEmptyTextQuestion).length > 0;
  }
  return questions.filter(isEmptyPosQuestion).length > 0;
}

export function isQuestionsExisted(questions) {
  const len = questions.length;
  return _.uniq(questions.map(q => q.text)).length !== len;
}

export function hasError(questions) {
  return questions.filter(q => q.error).length > 0;
}
