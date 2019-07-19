import React from 'react';
import {Helmet} from 'react-helmet';
import {Switch, Route} from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import CategoryViewPage from 'containers/CategoryViewPage/Loadable';
import SectionViewPage from 'containers/SectionViewPage/Loadable';
import SectionAddPage from 'containers/SectionAddPage/Loadable';
import QuestionAddPage from 'containers/QuestionAddPage/Loadable';
import QuestionViewPage from 'containers/QuestionViewPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import ExamResultViewPage from 'containers/ExamResultViewPage/Loadable';
import ExamPreviewViewPage from 'containers/ExamPreviewViewPage/Loadable';
import ExamResultListViewPage from 'containers/ExamResultListViewPage/Loadable';
import ExamReportViewPage from 'containers/ExamReportViewPage/Loadable';
import {ToastsContainer, ToastsContainerPosition, ToastsStore} from 'react-toasts';

import './style.scss';
import {
  QUESTIONS_NEW,
  SECTION_NEW_R,
  QUESTIONS_VIEW,
  SECTION_R,
  EXAM_PREVIEW,
  REPORT,
  EXAM_RESULTS, CATEGORY
} from '../../constants/routers';

const App = () => (
  <div className="app-wrapper">
    <Helmet titleTemplate="%s" defaultTitle="Exam App">
      <meta name="description" content="Exam App"/>
    </Helmet>
    <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_RIGHT}/>
    <Switch>
      <Route exact path="/" component={HomePage}/>
      <Route exact path={CATEGORY} component={CategoryViewPage}/>
      <Route exact path={`${CATEGORY}/:id`} component={CategoryViewPage}/>
      <Route exact path={SECTION_R} component={SectionViewPage}/>
      <Route exact path={`${SECTION_R}/:catId/`} component={SectionViewPage}/>
      <Route exact path={`${SECTION_R}/:catId/:childCatId`} component={SectionViewPage}/>

      <Route exact path={SECTION_NEW_R} component={SectionAddPage}/>
      <Route exact path={`${SECTION_NEW_R}/:catId`} component={SectionAddPage}/>
      <Route exact path={`${SECTION_NEW_R}/:catId/:childCatId`} component={SectionAddPage}/>

      <Route exact path={`${QUESTIONS_NEW}/:id/:catId/:childCatId`} component={QuestionAddPage}/>
      <Route exact path={`${QUESTIONS_VIEW}/:id`} component={QuestionViewPage}/>
      <Route exact path={`${QUESTIONS_VIEW}/:id/:catId/:childCatId`} component={QuestionViewPage}/>

      <Route exact path={EXAM_PREVIEW} component={ExamPreviewViewPage}/>
      <Route exact path={`${EXAM_PREVIEW}/:catId`} component={ExamPreviewViewPage}/>
      <Route exact path={`${EXAM_RESULTS}/:examId`} component={ExamResultViewPage}/>

      <Route exact path={`${EXAM_RESULTS}`} component={ExamResultListViewPage}/>
      <Route exact path={REPORT} component={ExamReportViewPage}/>
      <Route path="" component={NotFoundPage}/>
    </Switch>
  </div>
);

export default App;
