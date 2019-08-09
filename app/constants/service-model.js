export const ROOT = 'http://http://35.202.4.202/api/v1';
// export const ROOT = 'http://localhost:8080/api/v1';

export const CATEGORIES = `${ROOT}/categories`;
export const CHILD_CATEGORY = `${ROOT}/categories/child`;
export const SECTIONS = `${ROOT}/sections`;
export const SECTIONS_BY_CAT = `${ROOT}/sections/by-cat/{id}`;
export const SECTION_CHECK = `${SECTIONS}/check`;
export const SECTION_QUESTIONS = `${ROOT}/sections/{id}/questions?p={p}`;
export const QUESTIONS = `${ROOT}/questions`;

export const EXAMS = `${ROOT}/exams`;
export const EXAM = `${ROOT}/exams/{id}`;
export const GENERATE_EXAM = `${EXAMS}/generate`;
export const UPLOAD_EXAM_RESULT = `${EXAMS}/upload`;
export const PREVIEW_EXAM = `${EXAMS}/preview`;

export const DEL_QUESTIONS = `${ROOT}/questions/del/`;
export const QUESTIONS_BULK = `${ROOT}/questions/bulk`;
export const REPORTS = `${ROOT}/reports`;
export const REPORTS_PDF = `${ROOT}/reports/pdf`;
export const REPORTS_JSON = `${ROOT}/reports/json`;
export const LOGIN_URL = `${ROOT}/authentication`;
