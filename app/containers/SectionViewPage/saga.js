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
  requestError, CREATE_EXAM, loadChildCategories,
  LOAD_CHILD_CATEGORIES, loadChildCategoriesSuccess, loadSections
} from './actions';
import {
  CATEGORIES, GENERATE_EXAM, SECTIONS, SECTIONS_BY_CAT
} from '../../constants/service-model';
import {del, post} from '../../utils/request-method';
import notify from '../../utils/notify';

import {getExam} from '../../utils/local-storage';
import {CATEGORY, SECTION_NEW_R, SECTION_R} from '../../constants/routers';
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

export function* fetchSections(pl) {
  try {
    const {parentId, childId} = pl.payload;
    const url = SECTIONS_BY_CAT.replace('{id}', childId);
    const res = yield call(request, url);

    const payload = {parentId, childId, data: res.data};
    yield put(loadedSections(payload));

    yield put(push(`${SECTION_R}/${parentId}/${childId}`));
  } catch (err) {
    yield put(requestError());
  }
}

export function* fetchCategories(pl) {
  try {
    const res = yield call(request, CATEGORIES);
    yield put(loadCategoriesSuccess(res.data));
    if (pl.payload) {
      const {parentId, childId} = pl.payload;
      yield put(loadChildCategories({parentId, childId, isNavigate: false}));
    }
  } catch (err) {
    yield put(requestError());
  }
}

export function* fetchChildCategories(pl) {
  try {
    const {parentId, childId, isNavigate} = pl.payload;
    const res = yield call(request, `${CATEGORIES}/${parentId}`);
    yield put(loadChildCategoriesSuccess(res.data));

    if (isNavigate) {
      if (childId) {
        yield put(push(`${SECTION_R}/${parentId}/${childId}`));
      } else {
        yield put(push(`${SECTION_R}/${parentId}`));
      }
    } else if (childId) {
      const payload = {parentId, childId};
      yield put(loadSections(payload));
    }
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
  yield takeLatest(LOAD_CHILD_CATEGORIES, fetchChildCategories);
  yield takeLatest(LOAD_SECTIONS, fetchSections);
  yield takeLatest(DELETE_SECTION, removeSection);
  yield takeLatest(CREATE_EXAM, generateExam);
  yield takeLatest(GO_HOME, goHome);
}
