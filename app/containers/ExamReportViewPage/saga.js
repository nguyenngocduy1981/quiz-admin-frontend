import {
  call, put, takeLatest,
} from 'redux-saga/effects';

import {push} from 'react-router-redux';

import {
  LOAD_EXAMS, GO_HOME, loadExamsSuccess,
  requestError,
} from './actions';
import {REPORTS} from '../../constants/service-model';
import request from '../../utils/request';
import {ADMIN_HOME, SECTION_R} from "../../constants/routers";
const _ = require('lodash');

export function* goHome(payload) {
  // const {catId} = payload;
  // if (catId) {
  //   yield put(push(`${SECTION_R}/${catId}`));
  // } else {
  //   yield put(push(SECTION_R));
  // }

  yield put(push(ADMIN_HOME));
}

export function* fetchExam() {
  try {
    const res = yield call(request, REPORTS);
    const {data} = res;
    yield put(loadExamsSuccess(data));
  } catch (err) {
    yield put(requestError());
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* questionsData() {
  yield takeLatest(LOAD_EXAMS, fetchExam);
  yield takeLatest(GO_HOME, goHome);
}
