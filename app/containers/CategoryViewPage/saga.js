import {
  call, put, takeLatest,
} from 'redux-saga/effects';

import {push} from 'react-router-redux';

import request from 'utils/request';
import {
  GO_HOME,
  LOAD_CATEGORIES, LOAD_CHILD_CATEGORIES, loadCategoriesSuccess, loadChildCategories, loadChildCategoriesSuccess,
  requestError, SAVE_NEW_CHILD, saveNewChildSuccess
} from './actions';
import {
  CATEGORIES,
} from '../../constants/service-model';
import {CATEGORY} from "../../constants/routers";
import {post} from "../../utils/request-method";
import notify from "../../utils/notify";

const _ = require('lodash');

export function* goHome() {
  yield put(push('/'));
}

export function* fetchCategories() {
  try {
    const res = yield call(request, CATEGORIES);
    yield put(loadCategoriesSuccess(res.data));
  } catch (err) {
    yield put(requestError());
  }
}

export function* fetchChildCategories(pl) {
  try {
    const id = pl.id;
    const res = yield call(request, `${CATEGORIES}/${id}`);
    yield put(loadChildCategoriesSuccess(res.data));
    yield put(push(`${CATEGORY}/${id}`));
  } catch (err) {
    yield put(requestError());
  }
}

export function* saveNewChild(pl) {
  try {
    const {id, category} = pl.payload;
    const payload = {parentId: id, catName: category};
    const res = yield call(request, CATEGORIES, post(payload));
    if (res.error) {
      notify(res.error.message);
    } else {
      yield put(saveNewChildSuccess(res.data));
      yield put(loadChildCategories(id));
      yield put(push(`${CATEGORY}/${id}`));
    }
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
  yield takeLatest(SAVE_NEW_CHILD, saveNewChild);
  yield takeLatest(GO_HOME, goHome);
}
