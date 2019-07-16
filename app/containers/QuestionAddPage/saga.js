import {
  call, put, takeLatest,
} from 'redux-saga/effects';

import {push} from 'react-router-redux';


import {
  SAVE_QUESTIONS, GET_SECTION, GO_HOME,
  saveQuestionsSuccess, requestError, getSectionSuccess, CHECK_EXISTED_QUESTION, markExistedQuestion, resetError
} from './actions';
import {QUESTIONS_BULK, SECTIONS, QUESTIONS} from '../../constants/service-model';
import request from '../../utils/request';
import {post} from '../../utils/request-method';
import {SECTION_R} from "../../constants/routers";
import {
  PASSAGE_TEXT,
  PASSAGE_OPTION_FROM_GIVEN,
  QUESTION_TEXT_TYPES,
  QUESTION_OPTION_TYPES
} from "../../constants/questions";
import notify from "../../utils/notify";

const _ = require('lodash');

export function* goHome(payload) {
  const {catId} = payload;
  if (catId) {
    yield put(push(`${SECTION_R}/${catId}`));
  } else {
    yield put(push(SECTION_R));
  }
}

function convertTextQuestion(q) {
  return {text: q.text, answer: q.ans};
}

function convertPassageQuestion(q, section, catId) {
  // passageId
  const ques = {
      text: q.text,
      type: section.questionType,
      passages: q.passages,
      sectionId: section.id,
      categoryId: catId
    }
  ;
  return ques;
}

function convertPosQuestion(q, section) {
  const {a, b, c, d} = q.pos;
  const ques = {
    text: q.text,
    answer: q.ans,
    type: section.questionType,
    possibleAnswers: [a, b, c, d],
  };
  return ques;
}

function convert2Save(payload) {
  const {section, childCatId} = payload;
  let {questions} = payload;
  const type = section.questionType;

  if (QUESTION_TEXT_TYPES.includes(type)) {
    questions = questions.map(convertTextQuestion);
  } else if (PASSAGE_OPTION_FROM_GIVEN === type) {
    questions = questions.map(q => convertPassageQuestion(q, section, childCatId));
  } else if (QUESTION_OPTION_TYPES.includes(type)) {
    questions = questions.map(q => convertPosQuestion(q, section));
  }
  return {sectionId: section.id, categoryId: childCatId, passageId: 11, questions};
}

export function* saveQuestions(req) {
  try {
    const res = yield call(request, QUESTIONS_BULK, post(convert2Save(req.payload)));
    if (res.error) {
      notify(res.error.message);
      yield put(resetError());
    } else {
      yield put(saveQuestionsSuccess());
      const {catId, childCatId} = req.payload;
      yield put(push(`${SECTION_R}/${catId}/${childCatId}`));
    }
  } catch (err) {
    yield put(requestError());
  }
}

export function* checkExistedQuestionInSecion(req) {
  try {
    const {sectionId, data} = req.payload;
    const {id, text} = data;
    const URI = `${QUESTIONS}/${sectionId}?text=${text}`;
    const res = yield call(request, URI);
    const {error} = res;
    if (error) {
      notify(error.message);
      yield put(markExistedQuestion({id, f: true}));
    } else {
      yield put(markExistedQuestion({id, f: false}));
    }
  } catch (err) {
    notify('Lỗi khi kiểm trả câu hỏi đã tồn tại');
  }
}

export function* fetchSection(payload) {
  try {
    const URI = `${SECTIONS}/${payload.sectionId}`;
    const res = yield call(request, URI);
    yield put(getSectionSuccess(res.data));
  } catch (err) {
    yield put(requestError());
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* questionsData() {
  yield takeLatest(SAVE_QUESTIONS, saveQuestions);
  yield takeLatest(GET_SECTION, fetchSection);
  yield takeLatest(CHECK_EXISTED_QUESTION, checkExistedQuestionInSecion);
  yield takeLatest(GO_HOME, goHome);
}
