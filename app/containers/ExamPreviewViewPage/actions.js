export const LOAD_EXAM_PREVIEW = '[ExamPreviewViewPage] LOAD_EXAM_PREVIEW';
export const LOAD_EXAM_PREVIEW_SUCCESS = '[ExamPreviewViewPage] LOAD_EXAM_PREVIEW_SUCCESS';

export const GO_HOME = '[ExamPreviewViewPage] GO_HOME';

export const CANCEL_EXAM = '[ExamPreviewViewPage] CANCEL_EXAM';
export const CREATE_EXAM = '[ExamPreviewViewPage] CREATE_EXAM';

export const ERROR = '[ExamPreviewViewPage] save questions ERROR';

export function cancelExam() {
  return {
    type: CANCEL_EXAM
  };
}

export function createExam(title) {
  return {
    type: CREATE_EXAM,
    title
  };
}

export function goHome(payload) {
  return {
    type: GO_HOME,
    payload
  };
}

export function loadExamPreview() {
  return {
    type: LOAD_EXAM_PREVIEW,
  };
}

export function loadExamPreviewSuccess(payload) {
  return {
    type: LOAD_EXAM_PREVIEW_SUCCESS,
    payload
  };
}

export function requestError() {
  return {
    type: ERROR,
  };
}
