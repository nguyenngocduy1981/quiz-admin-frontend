import {createSelector} from 'reselect';
import {initialState} from './reducer';

const selectGlobal = (state) => state.sectionAdd || initialState;

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
const makeSelectCategory = () => createSelector(
  selectGlobal,
  (globalState) => globalState.category
);
const makeSelectSelectedCategory = () => createSelector(
  selectGlobal,
  (globalState) => globalState.selectedCat
);


export {
  selectGlobal,
  makeSelectLoading,
  makeSelectError,
  makeSelectSections,
  makeSelectCategories,
  makeSelectCategory,
  makeSelectSelectedCategory
};
