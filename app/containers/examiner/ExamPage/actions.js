export const LOAD_EXAM = '[Examiner-ExamPage] Load exam';
export const LOAD_EXAM_SUCCESS = '[Examiner-ExamPage] Load exam SUCCESS';
export const LOAD_REPOS_ERROR = '[Examiner-ExamPage] Load exam ERROR';

export const ANSWER = '[Examiner-ExamPage] ANSWER';
export const GO_HOME = '[Examiner-ExamPage] go home';
export const LAM_LAI_BAI = '[Examiner-ExamPage] lam lai bai';
export const NOP_BAI = '[Examiner-ExamPage] nop bai';


export function goHome() {
  return {
    type: GO_HOME
  };
}

export function nopBai(payload) {
  return {
    type: NOP_BAI,
    payload
  };
}
export function lamLaiBai() {
  return {
    type: LAM_LAI_BAI
  };
}

export function answer(payload) {
  return {
    type: ANSWER,
    payload,
  };
}

export function loadExam(id) {
  return {
    type: LOAD_EXAM,
    id
  };
}

export function examLoaded(exam) {
  return {
    type: LOAD_EXAM_SUCCESS,
    exam,
  };
}

export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}
