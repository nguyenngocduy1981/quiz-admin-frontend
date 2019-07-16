import {createSelector} from 'reselect';
import {initialState} from './reducer';

const selectGlobal = (state) => state.categoryView || initialState;

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.loading
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.error
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
const makeSelectNewCatName = () => createSelector(
  selectGlobal,
  (globalState) => globalState.newCatName
);

export {
  selectGlobal,
  makeSelectLoading,
  makeSelectError,
  makeSelectCategories,
  makeSelectSelectedCat,
  makeSelectChildCategories,
  makeSelectNewCatName,
};
