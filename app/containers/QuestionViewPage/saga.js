import {
  call, put, takeLatest,
} from 'redux-saga/effects';

import {push} from 'react-router-redux';

import {
  GET_QUESTIONS, GO_HOME,
  REMOVE_QUESTION,
  requestError, getQuestionsSuccess, removeQuestionSuccess
} from './actions';
import {DEL_QUESTIONS, SECTION_QUESTIONS} from '../../constants/service-model';
import request from '../../utils/request';
import {SECTION_R} from "../../constants/routers";
import notify from "../../utils/notify";
import {NO_REQUIRE_RELOAD} from "../../constants/constants";

const _ = require('lodash');

export function* goHome(pl) {
  const {catId} = pl.payload;
  if (catId) {
    yield put(push(`${SECTION_R}/${catId}/${NO_REQUIRE_RELOAD}`));
  } else {
    yield put(push(SECTION_R));
  }
}

export function* deleteQuestion(payload) {
  try {
    const {id} = payload;
    const URI = DEL_QUESTIONS + id
    const res = yield call(request, URI);
    if (res.data) {
      yield put(removeQuestionSuccess(id));
    } else {
      notify("Không xóa được");
    }
  } catch (err) {
    yield put(requestError());
  }
}

export function* fetchQuestions(rq) {
  try {
    const {sectionId, page} = rq.payload;
    const URI = SECTION_QUESTIONS.replace('{id}', sectionId).replace('{p}', page);
    const res = yield call(request, URI);
    yield put(getQuestionsSuccess(res.data));
  } catch (err) {
    yield put(requestError());
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* questionsData() {
  yield takeLatest(GET_QUESTIONS, fetchQuestions);
  yield takeLatest(REMOVE_QUESTION, deleteQuestion);
  yield takeLatest(GO_HOME, goHome);
}
