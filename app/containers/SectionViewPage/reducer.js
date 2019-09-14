import {
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_SECTIONS,
  LOAD_SECTIONS_SUCCESS,
  LOAD_SECTIONS_ERROR,
  LOAD_CHILD_CATEGORIES, LOAD_CHILD_CATEGORIES_SUCCESS,
  DELETE_SECTION_SUCCESS, LOAD_EXAM_FROM_LOCAL_STORAGE, CANCEL_EXAM, RESET_SECTIONS, TOGGLE_SECTION,
} from './actions';
import {clearExam, getExam} from "../../utils/local-storage";


const _ = require('lodash');

function toSections(state) {
  return Object.assign([], state.sections);
}

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  sections: false,
  categories: false,
  childCategories: false,
  toggleChildCategories: true,
  selectedCat: false,
  selectedChildCat: false,
  exam: {}
};

function sectionViewReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SECTION: {
      const toggleChildCategories = !state.toggleChildCategories;
      return {...state, toggleChildCategories};
    }
    case RESET_SECTIONS: {
      // return {...state, sections: false, selectedCat: false};
      return {...state, sections: false, selectedCat: action.catId};
    }
    case LOAD_EXAM_FROM_LOCAL_STORAGE: {
      return {...state, exam: getExam()};
    }
    case CANCEL_EXAM: {
      clearExam();
      return {...state, exam: {}};
    }
    case LOAD_CATEGORIES: {
      return {
        ...state,
        categories: false,
        childCategories: false,
        selectedCat: action.payload.parentId,
        selectedChildCat: false,
        loading: true
      };
    }
    case LOAD_CATEGORIES_SUCCESS: {
      return {...state, categories: action.payload, loading: false};
    }
    case LOAD_CHILD_CATEGORIES: {
      const {children} = state.categories.find(c => c.id === action.payload.parentId);
      const newState = {
        ...state,
        childCategories: children,
        selectedChildCat: false,
        selectedCat: action.payload.parentId
      };
      return newState;
    }
    case LOAD_CHILD_CATEGORIES_SUCCESS: {
      return {...state, childCategories: action.payload, loading: false};
    }
    case LOAD_SECTIONS: {
      const {parentId, childId} = action.payload;
      const newState = {
        ...state,
        loading: true,
        error: false,
        sections: false,
        selectedChildCat: childId,
        selectedCat: parentId
      };
      return newState;
    }
    case LOAD_SECTIONS_SUCCESS: {
      const {parentId, childId, data} = action.payload;
      const newState = {
        ...state,
        loading: false,
        selectedChildCat: childId,
        selectedCat: parentId,
        sections: data,
      };
      return newState;
    }
    case DELETE_SECTION_SUCCESS: {
      let sections = toSections(state);
      sections = sections.filter(s => s.id !== action.id);
      const newState = {
        ...state,
        loading: false,
        sections,
      };
      return newState;
    }

    case LOAD_SECTIONS_ERROR: {
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

export default sectionViewReducer;
