import {
  call, put, takeLatest,
} from 'redux-saga/effects';

import { push } from 'react-router-redux';

import {
  LOGIN, loginFail, loginSuccess
} from './actions';

import request from '../../utils/request';
import { post } from '../../utils/request-method';
import { LOGIN_URL } from '../../constants/service-model';
import { saveLogin } from '../../utils/local-storage';
import { ADMIN_HOME, EXAM_HOME } from '../../constants/routers';
import { ADMIN_ROLE } from '../../constants/roles';

const _ = require('lodash');

export function* doLogin(payload) {
  try {
    const username = payload.user;
    const res = yield call(request, LOGIN_URL, post({ username }));
    if (res.error) {
      yield put(loginFail('Không đăng nhập được vì user sai'));
    } else {
      const { data } = res;
      saveLogin(data);
      yield put(loginSuccess());
      console.log('data.role: ', data.role);
      if (data.role === ADMIN_ROLE) {
        yield put(push(ADMIN_HOME));
      } else {
        yield put(push(EXAM_HOME));
      }
    }
  } catch (err) {
    console.log(err);
    yield put(loginFail('huuuu'));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loginData() {
  yield takeLatest(LOGIN, doLogin);
}
