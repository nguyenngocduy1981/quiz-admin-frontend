import {createSelector} from 'reselect';
import {initialState} from './reducer';

const selectGlobal = (state) => state.viewQuestionsInSec || initialState;

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.loading
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.error
);


const makeSelectSection = () => createSelector(
  selectGlobal,
  (globalState) => globalState.section
);

const makeSelectQuestions = () => createSelector(
  selectGlobal,
  (globalState) => globalState.questions
);
const makeSelectPassage = () => createSelector(
  selectGlobal,
  (globalState) => globalState.passage
);
const makeSelectExam = () => createSelector(
  selectGlobal,
  (globalState) => globalState.exam
);
const makeSelectPageCount = () => createSelector(
  selectGlobal,
  (globalState) => globalState.pageCount
);
const makeSelectCurrentPage = () => createSelector(
  selectGlobal,
  (globalState) => globalState.currentPage
);

export {
  selectGlobal,
  makeSelectLoading,
  makeSelectError,
  makeSelectSection,
  makeSelectQuestions,
  makeSelectPassage,
  makeSelectExam,
  makeSelectPageCount,
  makeSelectCurrentPage,
};
