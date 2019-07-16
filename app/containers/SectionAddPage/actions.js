export const SELECT_CATEGORY = '[SectionAddPage] Load SELECT_CATEGORY';
export const LOAD_CATEGORIES = '[SectionAddPage] Load LOAD_CATEGORIES';
export const LOAD_CATEGORIES_SUCCESS = '[SectionAddPage] Load LOAD_CATEGORIES SUCCESS';

export const LOAD_CATEGORY = '[SectionAddPage] Load LOAD_CATEGORY';
export const LOAD_CATEGORY_SUCCESS = '[SectionAddPage] Load LOAD_CATEGORIES LOAD_CATEGORY_SUCCESS';

export const DELETE_SECTION = '[SectionAddPage] DELETE_SECTION';
export const NEW_SECTION = '[SectionAddPage] NEW_SECTION';
export const TEMP_SAVE_SECTION = '[SectionAddPage] TEMP_SAVE_SECTION';
export const SAVE_SECTION = '[SectionAddPage] SAVE_SECTION';
export const SAVE_SECTION_SUCCESS = '[SectionAddPage] SAVE_SECTION success';

export const CHECK_EXISTED_SECTION = '[SectionAddPage] CHECK_EXISTED_SECTION';
export const MARK_EXISTED_SECTION = '[SectionAddPage] MARK_EXISTED_SECTION';

export const REQ_ERROR = '[SectionAddPageREQ_ERROR';

export const GO_HOME = '[SectionAddPage] GO_HOME';

export function goHome(payload) {
  return {
    type: GO_HOME,
    payload
  };
}

export function selectCategory(id) {
  return {
    type: SELECT_CATEGORY,
    id
  };
}

export function loadCategory(id) {
  return {
    type: LOAD_CATEGORY,
    id
  };
}
export function loadCategorySuccess(payload) {
  return {
    type: LOAD_CATEGORY_SUCCESS,
    payload
  };
}

export function validateExistedSection(payload) {
  return {
    type: CHECK_EXISTED_SECTION,
    payload
  };
}

export function markExistedSection(id) {
  return {
    type: MARK_EXISTED_SECTION,
    id
  };
}

export function newSection(questionType) {
  return {
    type: NEW_SECTION,
    questionType
  };
}

export function tempSaveSection(payload) {
  return {
    type: TEMP_SAVE_SECTION,
    payload
  };
}

export function saveSection(payload) {
  return {
    type: SAVE_SECTION,
    payload
  };
}

export function saveSectionSuccess(payload) {
  return {
    type: SAVE_SECTION_SUCCESS,
    payload
  };
}

export function deleteSection(id) {
  return {
    type: DELETE_SECTION,
    id
  };
}

export function loadCategories() {
  return {
    type: LOAD_CATEGORIES
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
    type: REQ_ERROR,
  };
}
