import {createSelector} from 'reselect';
import {initialState} from './reducer';

const selectGlobal = (state) => state.addQuestionsInSec || initialState;

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
const makeSelectRequiredPickFromGiven = () => createSelector(
  selectGlobal,
  (globalState) => globalState.requiredPickFromGiven
);

export {
  selectGlobal,
  makeSelectLoading,
  makeSelectError,
  makeSelectSection,
  makeSelectQuestions,
  makeSelectRequiredPickFromGiven
};
