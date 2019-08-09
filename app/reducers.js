/**
 * Combine all reducers in this file and export the combined reducers.
 */

import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

import history from 'utils/history';
import sectionViewReducer from 'containers/SectionViewPage/reducer';
import sectionAddReducer from 'containers/SectionAddPage/reducer';
import addQuestionReducer from 'containers/QuestionAddPage/reducer';
import viewQuestionInSectionReducer from 'containers/QuestionViewPage/reducer';
import examPreviewReducer from 'containers/ExamPreviewViewPage/reducer';
import examsReportReducer from 'containers/ExamReportViewPage/reducer';
import examResultReducer from 'containers/ExamResultViewPage/reducer';
import examsResultReducer from 'containers/ExamResultListViewPage/reducer';
import categoryViewReducer from 'containers/CategoryViewPage/reducer';
import loginResultReducer from 'containers/LoginPage/reducer';

import examReducer_Examiner from 'containers/examiner/ExamPage/reducer';
import examResultReducer_Examiner from 'containers/examiner/ExamResultViewPage/reducer';
import homeReducer_Examiner from 'containers/examiner/HomePage/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    categoryView: categoryViewReducer,
    sectionView: sectionViewReducer,
    sectionAdd: sectionAddReducer,
    addQuestionsInSec: addQuestionReducer,
    viewQuestionsInSec: viewQuestionInSectionReducer,
    examPreview: examPreviewReducer,
    examsReport: examsReportReducer,
    examsResult: examsResultReducer,
    examResult: examResultReducer,
    loginResult: loginResultReducer,

    exam_Examiner: examReducer_Examiner,
    examResult_Examiner: examResultReducer_Examiner,
    examList_Examiner: homeReducer_Examiner,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
