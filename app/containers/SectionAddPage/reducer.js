import {
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  REQ_ERROR,
  NEW_SECTION,
  TEMP_SAVE_SECTION,
  SAVE_SECTION,
  SAVE_SECTION_SUCCESS, SELECT_CATEGORY, MARK_EXISTED_SECTION, CHECK_EXISTED_SECTION, DELETE_SECTION
} from './actions';
import getId from "../../utils/datetime";
import {TEXT} from "../../constants/questions";
import {checkSectionRequired, setSectionError} from "./utils";

const _ = require('lodash');

function toSections(state) {
  return Object.assign([], state.sections);
}

function markExistedSec(state, id, status) {
  let sections = toSections(state);
  const oldSec = _.find(sections, ['id', id]);
  oldSec.error = status;

  return sections;
}

function createNew() {
  const newSec = {
    id: getId(),
    text: '',
    questionType: TEXT,
    categoryIds: [],
    options: ['']
  };

  return newSec;
}

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  sections: false,
  categories: false,
  selectedCat: false
};

function sectionAddReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CATEGORIES: {
      const newState = {
        ...state,
        loading: true,
        error: false,
        categories: false,
      };

      return newState;
    }
    case LOAD_CATEGORIES_SUCCESS: {
      const newState = {
        ...state,
        loading: false,
        categories: action.payload,
      };
      return newState;
    }

    case NEW_SECTION: {
      let sections = toSections(state);
      sections = setSectionError(sections);

      if (!checkSectionRequired(sections)) {
        return {...state, sections};
      }

      if (sections) {
        sections = toSections(state);
        sections.push(createNew());
      } else {
        sections = [createNew()];
      }

      return {...state, sections};
    }
    case TEMP_SAVE_SECTION: {
      const sec = action.payload;
      const sections = toSections(state);
      const oldSec = _.find(sections, ['id', sec.id]);
      oldSec.text = sec.text;
      oldSec.questionType = sec.questionType;

      return {...state, sections};
    }
    case DELETE_SECTION: {
      let sections = toSections(state);
      sections = sections.filter(s => s.id !== action.id);

      return {...state, sections};
    }
    case CHECK_EXISTED_SECTION: {
      const sections = markExistedSec(state, action.payload.id, false);
      return {...state, sections};
    }

    case MARK_EXISTED_SECTION: {
      const sections = markExistedSec(state, action.id, true);
      return {...state, sections};
    }

    case SELECT_CATEGORY: {
      return {
        ...state,
        sections: false,
        selectedCat: action.id
      };
    }

    case SAVE_SECTION: {
      return {
        ...state,
        loading: true
      };
    }

    case SAVE_SECTION_SUCCESS: {
      let {sections} = action.payload
      if (!action.payload.hasError) {
        sections = [createNew()];
      } else {
        sections = setSectionError(sections);
      }

      return {
        ...state,
        loading: false,
        sections
      };
    }

    case REQ_ERROR: {
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

export default sectionAddReducer;
