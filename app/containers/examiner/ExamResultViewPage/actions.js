export const LOAD_EXAM_BY_ID = '[Examiner-ExamResultViewPage] LOAD_EXAM_BY_ID';
export const LOAD_EXAM_BY_ID_SUCCESS = '[Examiner-ExamResultViewPage] LOAD_EXAM_BY_ID_SUCCESS';

export const SAVE_EXAM = '[Examiner-ExamResultViewPage] SAVE_EXAM';
export const SAVE_EXAM_SUCCESS = '[Examiner-ExamResultViewPage] SAVE_EXAM_SUCCESS';

export const APPROVE_QUES = '[Examiner-ExamResultViewPage] APPROVE_QUES';
export const GO_HOME = '[Examiner-ExamResultViewPage] GO_HOME';

export const RESET_ERROR = '[Examiner-ExamResultViewPage] RESET_ERROR';
export const ERROR = '[Examiner-ExamResultViewPage] save questions ERROR';

export function resetError() {
  return {
    type: RESET_ERROR,
  };
}
export function viewExamResult(id) {
  return {
    type: LOAD_EXAM_BY_ID,
    id
  };
}
export function viewExamSuccess(payload) {
  return {
    type: LOAD_EXAM_BY_ID_SUCCESS,
    payload
  };
}
export function saveExam(payload) {
  return {
    type: SAVE_EXAM,
    payload
  };
}
export function saveExamSuccess() {
  return {
    type: SAVE_EXAM_SUCCESS,
  };
}
export function goHome() {
  return {
    type: GO_HOME
  };
}
export function approveQuestion(payload) {
  return {
    type: APPROVE_QUES,
    payload
  };
}

export function requestError() {
  return {
    type: ERROR,
  };
}
