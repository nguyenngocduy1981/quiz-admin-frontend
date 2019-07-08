import {
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_SECTIONS,
  LOAD_SECTIONS_SUCCESS,
  LOAD_SECTIONS_ERROR,
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
  selectedCat: false,
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
    case LOAD_CATEGORIES: {
      return {...state, categories: false};
    }
    case LOAD_CATEGORIES_SUCCESS: {
      return {...state, categories: action.payload};
    }

    case LOAD_SECTIONS: {
      const newState = {
        ...state,
        loading: true,
        error: false,
        sections: false,
        selectedCat: action.catId
      };

      return newState;
    }
    case LOAD_SECTIONS_SUCCESS: {
      const newState = {
        ...state,
        loading: false,
        sections: action.payload,
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
