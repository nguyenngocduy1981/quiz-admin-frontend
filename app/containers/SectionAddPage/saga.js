import {
  call, put, takeLatest,
} from 'redux-saga/effects';

import {push} from 'react-router-redux';

import request from 'utils/request';
import {CATEGORIES, SECTION_CHECK, SECTIONS} from '../../constants/service-model';
import {
  CHECK_EXISTED_SECTION,
  GO_HOME,
  LOAD_CATEGORIES,
  loadCategoriesSuccess, markExistedSection,
  requestError,
  SAVE_SECTION,
  saveSectionSuccess,
  SELECT_CATEGORY
} from "./actions";
import {SECTION_NEW_R} from "../../constants/routers";
import {post} from "../../utils/request-method";
import notify from "../../utils/notify";
import {checkBeforeSave} from "./utils";
import {ERROR_MSG} from "../../constants/questions";

const _ = require('lodash');

export function* goHome() {
  yield put(push('/'));
}

export function* changeCategory(payload) {
  yield put(push(SECTION_NEW_R + '/' + payload.id));
}

export function* checkExistedSection(req) {
  try {
    const {id, text, questionType} = req.payload;
    const res = yield call(request, SECTION_CHECK, post({text, questionType}));
    if (res.data) {
      notify(ERROR_MSG.ERR_EXISTED_S);
      yield put(markExistedSection(id));
    }

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

function convertSection(sec, cat) {
  const {text, questionType, options} = sec;
  return {text, questionType, categoryIds: [cat], options};
}

function convert2Save(sections, cat) {
  return sections.map(sec => convertSection(sec, cat));
}

export function* saveSections(req) {
  try {
    const {sections, cat} = req.payload;

    let hasError;
    if (hasError = !checkBeforeSave(sections)) {
      notify(ERROR_MSG.ERR_MANDATORY);
    } else {
      const res = yield call(request, SECTIONS, post(convert2Save(sections, cat)));
      if (res.error) {
        hasError = true;
        notify(res.error.message);
      }
    }
    yield put(saveSectionSuccess({sections, hasError}));
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
  yield takeLatest(SAVE_SECTION, saveSections);
  yield takeLatest(SELECT_CATEGORY, changeCategory);
  yield takeLatest(CHECK_EXISTED_SECTION, checkExistedSection);
  yield takeLatest(GO_HOME, goHome);
}
