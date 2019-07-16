import {
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_SECTIONS,
  LOAD_SECTIONS_SUCCESS,
  LOAD_SECTIONS_ERROR,
  LOAD_CHILD_CATEGORIES, LOAD_CHILD_CATEGORIES_SUCCESS,
  DELETE_SECTION_SUCCESS, LOAD_EXAM_FROM_LOCAL_STORAGE, CANCEL_EXAM, RESET_SECTIONS,
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
  selectedCat: false,
  selectedChildCat: false,
  exam: {}
};

function sectionViewReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_SECTIONS: {
      return {...state, sections: false, selectedCat: false};
    }
    case LOAD_EXAM_FROM_LOCAL_STORAGE: {
      return {...state, exam: getExam()};
    }
    case CANCEL_EXAM: {
      clearExam();
      return {...state, exam: {}};
    }
    // TODO
    case LOAD_CATEGORIES: {
      let st = {...state, categories: false};
      if (!action.payload) {
        st.childCategories = false;
        st.sections = false;
        st.selectedCat = false;
        st.selectedChildCat = false;
      }
      return st;
    }
    case LOAD_CATEGORIES_SUCCESS: {
      return {...state, categories: action.payload};
    }
    case LOAD_CHILD_CATEGORIES: {
      const newState = {
        ...state,
        childCategories: false,
        sections: false,
        selectedChildCat: false,
        selectedCat: action.id
      };
      return newState;
    }
    case LOAD_CHILD_CATEGORIES_SUCCESS: {
      return {...state, childCategories: action.payload};
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
