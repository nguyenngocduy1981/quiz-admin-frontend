import {
  call, put, takeLatest,
} from 'redux-saga/effects';

import {push} from 'react-router-redux';

import {
  LOAD_EXAMS, GO_HOME, loadExamsSuccess, completeUploadExam,
  requestError, UPLOAD_EXAM, loadExams,
} from './actions';
import {EXAMS, UPLOAD_EXAM_RESULT} from '../../constants/service-model';
import {SECTION_R} from "../../constants/routers";
import request from '../../utils/request';
import {upload} from '../../utils/request-method';
import notify from "../../utils/notify";

const _ = require('lodash');

export function* goHome(payload) {
  // const {catId} = payload;
  // if (catId) {
  //   yield put(push(`${SECTION_R}/${catId}`));
  // } else {
  //   yield put(push(SECTION_R));
  // }

  yield put(push('/'));
}

export function* uploadExam(payload) {
  try {
    const {file} = payload;
    const data = new FormData();
    data.append('file', file);
    data.append('name', file.name);

    const res = yield call(request, UPLOAD_EXAM_RESULT, upload(data));

    if (res.error) {
      notify(res.error.message);
      yield put(completeUploadExam());
    } else {
      yield put(completeUploadExam());
      yield put(loadExams());
    }
  } catch (err) {
    yield put(requestError());
  }
}

export function* fetchExam() {
  try {
    const res = yield call(request, EXAMS);
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
  yield takeLatest(UPLOAD_EXAM, uploadExam);
  yield takeLatest(GO_HOME, goHome);
}
