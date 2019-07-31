import {
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS, LOAD_CHILD_CATEGORIES, LOAD_CHILD_CATEGORIES_SUCCESS,
  REQUEST_ERROR, SAVE_NEW_CHILD_SUCCESS, SAVE_TEMP_NEW_CAT,
} from './actions';


const _ = require('lodash');

// The initial state of the App
export const initialState = {
  loading: false,
  childLoading: false,
  error: false,
  childCategories: false,
  selectedCat: false,
  newCatName: '',
};

function categoryViewReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_TEMP_NEW_CAT: {
      return {...state, newCatName: action.catName};
    }
    case LOAD_CATEGORIES: {
      const newState = {
        ...state,
        loading: true,
        categories: false,
        childCategories: false,
        selectedCat: action.id
      };
      return newState;
    }
    case LOAD_CATEGORIES_SUCCESS: {
      return {...state, loading: false, categories: action.payload};
    }
    case LOAD_CHILD_CATEGORIES: {
      return {...state, childLoading: true, childCategories: false, selectedCat: action.id};
    }
    case LOAD_CHILD_CATEGORIES_SUCCESS: {
      return {...state, childLoading: false, childCategories: action.payload};
    }
    case SAVE_NEW_CHILD_SUCCESS: {
      return {...state, newCatName: ''};
    }
    case REQUEST_ERROR: {
      return {
        ...state,
        error: true,
        loading: false,
      };
    }

    default:
      return state;
  }
}

export default categoryViewReducer;
