export const LOAD_EXAM_PREVIEW = '[ExamViewPage] LOAD_EXAM_PREVIEW';
export const LOAD_EXAM_PREVIEW_SUCCESS = '[ExamViewPage] LOAD_EXAM_PREVIEW_SUCCESS';

export const LOAD_EXAM_BY_ID = '[ExamViewPage] LOAD_EXAM_BY_ID';
export const LOAD_EXAM_BY_ID_SUCCESS = '[ExamViewPage] LOAD_EXAM_BY_ID_SUCCESS';

export const GO_HOME = '[ExamViewPage] GO_HOME';

export const CANCEL_EXAM = '[ExamViewPage] CANCEL_EXAM';
export const CREATE_EXAM = '[ExamViewPage] CREATE_EXAM';

export const ERROR = '[ExamViewPage] save questions ERROR';

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
