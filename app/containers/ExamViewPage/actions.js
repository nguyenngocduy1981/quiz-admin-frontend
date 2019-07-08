export const LOAD_EXAM_PREVIEW = '[ExamViewPage] LOAD_EXAM_PREVIEW';
export const LOAD_EXAM_PREVIEW_SUCCESS = '[ExamViewPage] LOAD_EXAM_PREVIEW_SUCCESS';
export const GO_HOME = '[ExamViewPage] GO_HOME';

export const CANCEL_EXAM = '[ExamViewPage] CANCEL_EXAM';
export const CREATE_EXAM = '[ExamViewPage] CREATE_EXAM';

export const ERROR = '[ExamViewPage] save questions ERROR';

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

export function goHome(catId) {
  return {
    type: GO_HOME,
    catId
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
