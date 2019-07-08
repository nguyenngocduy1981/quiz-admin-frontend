import React from 'react';
import {Helmet} from 'react-helmet';
import {Switch, Route} from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import SectionViewPage from 'containers/SectionViewPage/Loadable';
import SectionAddPage from 'containers/SectionAddPage/Loadable';
import QuestionAddPage from 'containers/QuestionAddPage/Loadable';
import QuestionViewPage from 'containers/QuestionViewPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import ExamViewPage from 'containers/ExamViewPage/Loadable';
import ExamReportViewPage from 'containers/ExamReportViewPage/Loadable';

import './style.scss';
import {QUESTIONS_NEW, SECTION_NEW_R, QUESTIONS_VIEW, SECTION_R, EXAM_PREVIEW, REPORT} from '../../constants/routers';

const App = () => (
  <div className="app-wrapper">
    <Helmet titleTemplate="%s" defaultTitle="Exam App">
      <meta name="description" content="Exam App"/>
    </Helmet>
    <Switch>
      <Route exact path="/" component={HomePage}/>
      <Route exact path={SECTION_R} component={SectionViewPage}/>
      <Route exact path={`${SECTION_R}/:catId/`} component={SectionViewPage}/>
      <Route exact path={SECTION_NEW_R} component={SectionAddPage}/>
      <Route exact path={`${SECTION_NEW_R}/:cat`} component={SectionAddPage}/>
      <Route exact path={`${QUESTIONS_NEW}/:id/:catId`} component={QuestionAddPage}/>
      <Route exact path={`${QUESTIONS_VIEW}/:id`} component={QuestionViewPage}/>
      <Route exact path={`${QUESTIONS_VIEW}/:id/:catId`} component={QuestionViewPage}/>
      <Route exact path={EXAM_PREVIEW} component={ExamViewPage}/>
      <Route exact path={`${EXAM_PREVIEW}/:catId`} component={ExamViewPage}/>
      <Route exact path={REPORT} component={ExamReportViewPage}/>
      <Route path="" component={NotFoundPage}/>
    </Switch>
  </div>
);

export default App;
