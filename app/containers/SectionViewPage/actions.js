export const RESET_SECTIONS = '[SectionViewPage] RESET_SECTIONS';
export const LOAD_SECTIONS = '[SectionViewPage] Load sections';
export const LOAD_SECTIONS_SUCCESS = '[SectionViewPage] Load sections SUCCESS';
export const LOAD_SECTIONS_ERROR = '[SectionViewPage] Load sections ERROR';
export const DELETE_SECTION = '[SectionViewPage] DELETE_SECTION';
export const DELETE_SECTION_SUCCESS = '[SectionViewPage] DELETE_SECTION_SUCCESS';

export const LOAD_CATEGORIES = '[SectionViewPage] Load LOAD_CATEGORIES';
export const LOAD_CATEGORIES_SUCCESS = '[SectionViewPage] Load LOAD_CATEGORIES SUCCESS';

export const CANCEL_EXAM = '[SectionViewPage] CANCEL_EXAM';
export const CREATE_EXAM = '[SectionViewPage] CREATE_EXAM';

export const LOAD_EXAM_FROM_LOCAL_STORAGE = '[SectionViewPage] LOAD_EXAM_FROM_LOCAL_STORAGE';

export function loadExamFromLocalStorage() {
  return {
    type: LOAD_EXAM_FROM_LOCAL_STORAGE,
  };
}

export const GO_HOME = '[SectionViewPage] GO_HOME';

export function cancelExam() {
  return {
    type: CANCEL_EXAM
  };
}

export function createExam() {
  return {
    type: CREATE_EXAM
  };
}

export function goHome() {
  return {
    type: GO_HOME
  };
}

export function deleteSection(id) {
  return {
    type: DELETE_SECTION,
    id
  };
}

export function deleteSectionSuccess(id) {
  return {
    type: DELETE_SECTION_SUCCESS,
    id
  };
}

export function resetSections(catId) {
  return {
    type: RESET_SECTIONS,
    catId
  };
}

export function loadSections(catId) {
  return {
    type: LOAD_SECTIONS,
    catId
  };
}

export function loadedSections(payload) {
  return {
    type: LOAD_SECTIONS_SUCCESS,
    payload,
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
    type: LOAD_SECTIONS_ERROR,
  };
}
