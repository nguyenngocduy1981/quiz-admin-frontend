import {
  call, put, takeLatest,
} from 'redux-saga/effects';

import {push} from 'react-router-redux';

import {
  CANCEL_EXAM,
  CREATE_EXAM,
  GO_HOME, LOAD_EXAM_BY_ID,
  LOAD_EXAM_PREVIEW, loadExamPreviewSuccess,
  requestError, viewExamSuccess,
} from './actions';
import {GENERATE_EXAM, PREVIEW_EXAM, EXAM} from '../../constants/service-model';
import request from '../../utils/request';
import {EXAM_RESULTS, SECTION_R} from "../../constants/routers";
import {post} from "../../utils/request-method";
import {getExam} from "../../utils/local-storage";
import FileSaver from "file-saver";
import notify from "../../utils/notify";

const _ = require('lodash');

export function* goHome(req) {
  const {catId, exam} = req.payload;

  if (exam) {
    yield put(push(EXAM_RESULTS));
  } else {
    if (catId) {
      yield put(push(`${SECTION_R}/${catId}`));
    } else {
      yield put(push(SECTION_R));
    }
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

export function* fetchExam() {
  try {
    const res = yield call(request, PREVIEW_EXAM, post(getExam()));
    const {data} = res;
    yield put(loadExamPreviewSuccess(data));
  } catch (err) {
    yield put(requestError());
  }
}

export function* cancelExam() {
  yield put(push(SECTION_R));
}

export function* generateExam(payload) {
  try {
    const req = {
      title: payload.title,
      payload: getExam()
    }
    const res = yield call(request, GENERATE_EXAM, post(req));
    const {error} = res;
    if (error) {
      notify(error.message);
    } else {
      const {title} = req;

      const myBlob = new Blob([JSON.stringify(res.data)], {encoding: 'UTF-8', type: 'application/json'});
      FileSaver.saveAs(myBlob, title);
    }
  } catch (err) {
    yield put(requestError());
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* questionsData() {
  yield takeLatest(LOAD_EXAM_BY_ID, viewExam);
  yield takeLatest(LOAD_EXAM_PREVIEW, fetchExam);
  yield takeLatest(CREATE_EXAM, generateExam);
  yield takeLatest(CANCEL_EXAM, cancelExam);
  yield takeLatest(GO_HOME, goHome);
}
