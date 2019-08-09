import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = (state) => state.examList_Examiner || initialState;

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.loading
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.error
);

const makeSelectExamList = () => createSelector(
  selectGlobal,
  (globalState) => globalState.examList
);


export {
  selectGlobal,
  makeSelectLoading,
  makeSelectError,
  makeSelectExamList,
};
