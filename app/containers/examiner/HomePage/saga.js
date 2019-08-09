import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import {LOAD_EXAM_LIST, examListLoaded, examListLoadingError, TAKE_EXAM} from './actions';

import {push} from 'react-router-redux';

import request from 'utils/request';
import {EXAMS} from '../../../constants/service-model';
import {EXAM} from "../../../constants/routers";

const _ = require('lodash');

export function* takeExam(payload) {
  const {id} = payload;
  yield put(push(`${EXAM}/${id}`));
}

export function* fetchExamList() {
  try {
    // const res = yield call(request, GET_EXAM_LIST);
    const res = yield call(request, EXAMS);
    if (res.error) {
      yield put(examListLoadingError(res.error.message));
    } else {
      yield put(examListLoaded(res.data));
    }
  } catch (err) {
    yield put(examListLoadingError(err));
  }
}

export default function* questionsData() {
  yield takeLatest(LOAD_EXAM_LIST, fetchExamList);
  yield takeLatest(TAKE_EXAM, takeExam);
}
