import {
  call, put, takeLatest,
} from 'redux-saga/effects';

import {push} from 'react-router-redux';

import request from 'utils/request';
import {
  DELETE_SECTION,
  deleteSectionSuccess,
  GO_HOME,
  LOAD_SECTIONS,
  LOAD_CATEGORIES, loadCategoriesSuccess,
  loadedSections,
  requestError, CREATE_EXAM
} from './actions';
import {
  CATEGORIES, GENERATE_EXAM, SECTIONS, SECTIONS_BY_CAT
} from '../../constants/service-model';
import {del, post} from '../../utils/request-method';
import notify from '../../utils/notify';
import {} from '../SectionAddPage/actions';
import {getExam} from '../../utils/local-storage';
import { SECTION_R} from '../../constants/routers';
import FileSaver from 'file-saver';

const _ = require('lodash');

export function* goHome() {
  yield put(push('/'));
}


export function* removeSection(payload) {
  try {
    const {id} = payload;
    const res = yield call(request, `${SECTIONS}/${id}`, del());
    const {error} = res;
    if (error) {
      notify(error.message);
    } else {
      yield put(deleteSectionSuccess(id));
    }
  } catch (err) {
    yield put(requestError());
  }
}

export function* fetchSections(payload) {
  try {
    const url = SECTIONS_BY_CAT.replace('{id}', payload.catId);
    const res = yield call(request, url);
    yield put(loadedSections(res.data));
    yield put(push(`${SECTION_R}/${payload.catId}`));
  } catch (err) {
    yield put(requestError());
  }
}

export function* fetchCategories() {
  try {
    const res = yield call(request, CATEGORIES);
    yield put(loadCategoriesSuccess(res.data));
  } catch (err) {
    yield put(requestError());
  }
}

export function* generateExam() {
  try {
    const res = yield call(request, GENERATE_EXAM, post(getExam()));
    const {filename, data} = res;

    const myBlob = new Blob([JSON.stringify(data)], {encoding: 'UTF-8', type: 'application/json'});
    FileSaver.saveAs(myBlob, filename);
  } catch (err) {
    yield put(requestError());
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* questionsData() {
  // Watches for LOAD_EXAM actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_CATEGORIES, fetchCategories);
  yield takeLatest(LOAD_SECTIONS, fetchSections);
  yield takeLatest(DELETE_SECTION, removeSection);
  yield takeLatest(CREATE_EXAM, generateExam);
  yield takeLatest(GO_HOME, goHome);
}
