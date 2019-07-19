import {
  call, put, takeLatest,
} from 'redux-saga/effects';

import {push} from 'react-router-redux';

import {
  GO_HOME, LOAD_EXAM_BY_ID,
  requestError, resetError, SAVE_EXAM, saveExamSuccess, viewExamSuccess,
} from './actions';
import {GENERATE_EXAM, PREVIEW_EXAM, EXAM, EXAMS} from '../../constants/service-model';
import request from '../../utils/request';
import {EXAM_RESULTS, SECTION_R} from "../../constants/routers";
import {post} from "../../utils/request-method";
import notify from "../../utils/notify";

const _ = require('lodash');

export function* goHome(req) {
  yield put(push(EXAM_RESULTS));
}

export function* approveExam(pl) {
  try {
    const {payload} = pl;
    const res = yield call(request, EXAMS, post(payload));
    if (res.error) {
      notify(res.error.message);
      yield put(resetError());
    } else {
      yield put(saveExamSuccess());
    }
  } catch (err) {
    yield put(requestError());
  }
}

export function* viewExam(payload) {
  try {
    const {id} = payload;

    const url = EXAM.replace('{id}', id)
    const res = yield call(request, url);
    const {questions} = res.data;
    yield put(viewExamSuccess(JSON.parse(questions)));
  } catch (err) {
    yield put(requestError());
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* questionsData() {
  yield takeLatest(LOAD_EXAM_BY_ID, viewExam);
  yield takeLatest(SAVE_EXAM, approveExam);
  yield takeLatest(GO_HOME, goHome);
}
