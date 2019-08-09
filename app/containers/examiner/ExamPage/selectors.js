import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = (state) => state.exam_Examiner || initialState;

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.loading
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.error
);

const makeSelectExam = () => createSelector(
  selectGlobal,
  (globalState) => globalState.exam
);


export {
  selectGlobal,
  makeSelectLoading,
  makeSelectError,
  makeSelectExam,
};
