import {createSelector} from 'reselect';
import {initialState} from './reducer';

const selectGlobal = (state) => state.examsResult || initialState;

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.loading
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.error
);

const makeSelectExams = () => createSelector(
  selectGlobal,
  (globalState) => globalState.exams
);

export {
  selectGlobal,
  makeSelectLoading,
  makeSelectError,
  makeSelectExams
};
