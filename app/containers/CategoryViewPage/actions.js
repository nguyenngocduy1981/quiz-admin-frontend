export const REQUEST_ERROR = '[CategoryViewPage] REQUEST_ERROR';

export const SAVE_TEMP_NEW_CAT = '[CategoryViewPage] Load SAVE_TEMP_NEW_CAT';

export const LOAD_CATEGORIES = '[CategoryViewPage] Load LOAD_CATEGORIES';
export const LOAD_CATEGORIES_SUCCESS = '[CategoryViewPage] Load LOAD_CATEGORIES SUCCESS';

export const LOAD_CHILD_CATEGORIES = '[CategoryViewPage] Load LOAD_CHILD_CATEGORIES';
export const LOAD_CHILD_CATEGORIES_SUCCESS = '[CategoryViewPage] Load LOAD_CHILD_CATEGORIES SUCCESS';

export const SAVE_NEW_CHILD = '[CategoryViewPage] Load SAVE_NEW_CHILD';
export const SAVE_NEW_CHILD_SUCCESS = '[CategoryViewPage] Load SAVE_NEW_CHILD_SUCCESS SUCCESS';


export const GO_HOME = '[CategoryViewPage] GO_HOME';

export function goHome() {
  return {
    type: GO_HOME
  };
}

export function saveTempNewCategory(catName) {
  return {
    type: SAVE_TEMP_NEW_CAT,
    catName
  };
}
export function saveNewChild(payload) {
  return {
    type: SAVE_NEW_CHILD,
    payload
  };
}
export function saveNewChildSuccess() {
  return {
    type: SAVE_NEW_CHILD_SUCCESS,
  };
}
export function loadCategories(id) {
  return {
    type: LOAD_CATEGORIES,
    id
  };
}

export function loadChildCategories(id) {
  return {
    type: LOAD_CHILD_CATEGORIES,
    id
  };
}

export function loadChildCategoriesSuccess(payload) {
  return {
    type: LOAD_CHILD_CATEGORIES_SUCCESS,
    payload,
  };
}

export function loadCategoriesSuccess(payload) {
  return {
    type: LOAD_CATEGORIES_SUCCESS,
    payload,
  };
}

export function requestError() {
  return {
    type: REQUEST_ERROR,
  };
}
