export const LOAD_EXAM_LIST = '[Examiner-HomePage] Load exam list';
export const LOAD_EXAM_LIST_SUCCESS = '[Examiner-HomePage] Load exam list SUCCESS';
export const LOAD_EXAM_LIST_FAIL = '[Examiner-HomePage] Load exam list fail';

export const TAKE_EXAM = '[Examiner-HomePage] take exam';


export function takeExam(id) {
  return {
    type: TAKE_EXAM,
    id
  };
}
export function loadExamList() {
  return {
    type: LOAD_EXAM_LIST,
  };
}

export function examListLoaded(payload) {
  return {
    type: LOAD_EXAM_LIST_SUCCESS,
    payload,
  };
}

export function examListLoadingError(error) {
  return {
    type: LOAD_EXAM_LIST_FAIL,
    error,
  };
}
