export const LOAD_EXAMS = '[ExamReportViewPage] LOAD_EXAMS';
export const LOAD_EXAMS_SUCCESS = '[ExamReportViewPage] LOAD_EXAMS_SUCCESS';

export const ERROR = '[ExamReportViewPage] ERROR';
export const GO_HOME = '[ExamReportViewPage] GO_HOME';

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
