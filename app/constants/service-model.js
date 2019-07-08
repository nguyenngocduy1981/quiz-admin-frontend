export const ROOT = 'http://localhost:8080/api/v1';

export const CATEGORIES = `${ROOT}/categories`;
export const SECTIONS = `${ROOT}/sections`;
export const SECTIONS_BY_CAT = `${ROOT}/sections/by-cat/{id}`;
export const SECTION_CHECK = `${SECTIONS}/check`;
export const SECTION_QUESTIONS = `${ROOT}/sections/{id}/questions?p={p}`;
export const QUESTIONS = `${ROOT}/questions`;
export const GENERATE_EXAM = `${QUESTIONS}/gen-exam`;
export const PREVIEW_EXAM = `${QUESTIONS}/preview-exam`;
export const DEL_QUESTIONS = `${ROOT}/questions/del/`;
export const QUESTIONS_BULK = `${ROOT}/questions/bulk`;
export const REPORTS = `${ROOT}/reports`;
