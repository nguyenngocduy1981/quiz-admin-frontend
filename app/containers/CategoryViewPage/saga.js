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
import {ADMIN_HOME, CATEGORY} from "../../constants/routers";
import {post} from "../../utils/request-method";
import notify from "../../utils/notify";

const _ = require('lodash');

export function* goHome() {
  yield put(push(ADMIN_HOME));
}

export function* fetchCategories(pl) {
  try {
    const res = yield call(request, CATEGORIES);
    yield put(loadCategoriesSuccess(res.data));
    if (pl.id) {
      const {children} = res.data.find(c => c.id === parseInt(pl.id, 0));
      yield put(loadChildCategoriesSuccess(children));
    }
  } catch (err) {
    yield put(requestError());
  }
}

export function* fetchChildCategories(pl) {
  try {
    yield put(push(`${CATEGORY}/${pl.id}`));
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
