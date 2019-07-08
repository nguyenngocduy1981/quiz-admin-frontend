/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import sectionViewReducer from 'containers/SectionViewPage/reducer';
import sectionAddReducer from 'containers/SectionAddPage/reducer';
import addQuestionReducer from 'containers/QuestionAddPage/reducer';
import viewQuestionInSectionReducer from 'containers/QuestionViewPage/reducer';
import examPreviewReducer from 'containers/ExamViewPage/reducer';
import examsReportReducer from 'containers/ExamReportViewPage/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    sectionView: sectionViewReducer,
    sectionAdd: sectionAddReducer,
    addQuestionsInSec: addQuestionReducer,
    viewQuestionsInSec: viewQuestionInSectionReducer,
    examPreview: examPreviewReducer,
    examsReport: examsReportReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
