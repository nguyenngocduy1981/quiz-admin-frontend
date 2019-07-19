export const LOAD_EXAMS = '[ExamResultListViewPage] LOAD_EXAMS';
export const LOAD_EXAMS_SUCCESS = '[ExamResultListViewPage] LOAD_EXAMS_SUCCESS';

export const UPLOAD_EXAM = '[ExamResultListViewPage] UPLOAD_EXAM';
export const UPLOAD_EXAM_DONE= '[ExamResultListViewPage] UPLOAD_EXAM_DONE';

export const ERROR = '[ExamResultListViewPage] ERROR';
export const GO_HOME = '[ExamResultListViewPage] GO_HOME';

export function upLoadExam(file) {
  return {
    type: UPLOAD_EXAM,
    file
  };
}
export function completeUploadExam() {
  return {
    type: UPLOAD_EXAM_DONE,
  };
}
export function loadExams() {
  return {
    type: LOAD_EXAMS
  };
}

export function loadExamsSuccess(payload) {
  return {
    type: LOAD_EXAMS_SUCCESS,
    payload
  };
}

export function requestError() {
  return {
    type: ERROR,
  };
}

export function goHome() {
  return {
    type: GO_HOME,
  };
}
