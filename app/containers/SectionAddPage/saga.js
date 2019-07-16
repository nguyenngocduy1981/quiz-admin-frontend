import {
  call, put, takeLatest,
} from 'redux-saga/effects';

import {push} from 'react-router-redux';

import request from 'utils/request';
import {
  CATEGORIES, CHILD_CATEGORY, SECTION_CHECK, SECTIONS
} from '../../constants/service-model';
import {
  CHECK_EXISTED_SECTION,
  GO_HOME,
  LOAD_CATEGORIES, LOAD_CATEGORY,
  loadCategoriesSuccess, loadCategorySuccess, markExistedSection,
  requestError,
  SAVE_SECTION,
  saveSectionSuccess,
  SELECT_CATEGORY
} from './actions';
import {SECTION_NEW_R, SECTION_R} from '../../constants/routers';
import {post} from '../../utils/request-method';
import notify from '../../utils/notify';
import {checkBeforeSave} from './utils';
import {ERROR_MSG, OPTION_FROM_GIVEN, PASSAGE_TYPES} from '../../constants/questions';

const _ = require('lodash');

export function* goHome(pl) {
  const {parentId, childId} = pl.payload;
  yield put(push(`${SECTION_R}/${parentId}/${childId}`));
}

// export function* changeCategory(payload) {
//   yield put(push(SECTION_NEW_R + '/' + payload.id));
// }

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

export function* fetchCategory(payload) {
  try {
    const {id} = payload;
    const res = yield call(request, `${CHILD_CATEGORY}/${id}`);
    yield put(loadCategorySuccess(res.data));
  } catch (err) {
    yield put(requestError());
  }
}

function convertSection(sec, categoryId) {
  const {
    text, questionType, sectionOptions, passageText, passageOptions
  } = sec;
  const type = sec.questionType;
  if (type === OPTION_FROM_GIVEN) {
    return {
      text, questionType, categoryId, sectionOptions
    };
  }
  if (PASSAGE_TYPES.includes(type)) {
    return {
      text, questionType, categoryId, passageText, passageOptions
    };
  }

  return {text, questionType, categoryId};
}

function convert2Save(sections, cat) {
  return sections.map((sec) => convertSection(sec, cat));
}

export function* saveSections(req) {
  try {
    const {sections, catId} = req.payload;

    let hasError;
    if (hasError = !checkBeforeSave(sections)) {
      notify(ERROR_MSG.ERR_MANDATORY);
    } else {
      const res = yield call(request, SECTIONS, post(convert2Save(sections, catId)));
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
  yield takeLatest(LOAD_CATEGORY, fetchCategory);
  yield takeLatest(SAVE_SECTION, saveSections);
  // yield takeLatest(SELECT_CATEGORY, changeCategory);
  yield takeLatest(CHECK_EXISTED_SECTION, checkExistedSection);
  yield takeLatest(GO_HOME, goHome);
}
