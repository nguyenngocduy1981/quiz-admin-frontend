export const LOAD_EXAMS = '[ExamResultViewPage] LOAD_EXAMS';
export const LOAD_EXAMS_SUCCESS = '[ExamResultViewPage] LOAD_EXAMS_SUCCESS';

export const UPLOAD_EXAM = '[ExamResultViewPage] UPLOAD_EXAM';
export const UPLOAD_EXAM_DONE= '[ExamResultViewPage] UPLOAD_EXAM_DONE';

export const ERROR = '[ExamResultViewPage] ERROR';
export const GO_HOME = '[ExamResultViewPage] GO_HOME';

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
