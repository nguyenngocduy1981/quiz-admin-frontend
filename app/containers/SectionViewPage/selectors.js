import {createSelector} from 'reselect';
import {initialState} from './reducer';

const selectGlobal = (state) => state.sectionView || initialState;

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.loading
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.error
);

const makeSelectSections = () => createSelector(
  selectGlobal,
  (globalState) => globalState.sections
);
const makeSelectCategories = () => createSelector(
  selectGlobal,
  (globalState) => globalState.categories
);
const makeSelectChildCategories = () => createSelector(
  selectGlobal,
  (globalState) => globalState.childCategories
);
const makeSelectSelectedCat = () => createSelector(
  selectGlobal,
  (globalState) => globalState.selectedCat
);
const makeSelectSelectedChildCat = () => createSelector(
  selectGlobal,
  (globalState) => globalState.selectedChildCat
);
const makeSelectExam = () => createSelector(
  selectGlobal,
  (globalState) => globalState.exam
);


export {
  selectGlobal,
  makeSelectLoading,
  makeSelectError,
  makeSelectSections,
  makeSelectCategories,
  makeSelectSelectedCat,
  makeSelectSelectedChildCat,
  makeSelectExam,
  makeSelectChildCategories
};
