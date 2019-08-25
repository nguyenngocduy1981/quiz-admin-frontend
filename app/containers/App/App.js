import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, Redirect } from 'react-router-dom';

import LoginPage from 'containers/LoginPage/Loadable';
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
import NoPermissionPage from 'containers/NoPermissionPage/Loadable';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import PermissionAccess from 'components/PermissionAccess';

import ExamPageExaminer from 'containers/examiner/ExamPage/Loadable';
import HomePageExaminer from 'containers/examiner/HomePage/Loadable';
import ExamResultViewPageExaminer from 'containers/examiner/ExamResultViewPage/Loadable';


import './style.scss';
import {
  QUESTIONS_NEW,
  SECTION_NEW_R,
  QUESTIONS_VIEW,
  SECTION_R,
  EXAM_PREVIEW,
  REPORT,
  EXAM_RESULTS, CATEGORY, LOGIN, _403, EXAM, EXAM_RS, ADMIN_HOME, EXAM_HOME
} from '../../constants/routers';
import { getLogin } from '../../utils/local-storage';
import { ADMIN_ROLE, EXAM_ROLE } from '../../constants/roles';

const ProtectedRoute = ({ isAllowed, ...props }) => (isAllowed
  ? <Route {...props} />
  : <Redirect to="/login" />);

function isAllowed(json, role) {
  if (!json) return false;

  return json.role === role;
}

const App = () => {
  const ExamRole = PermissionAccess([EXAM_ROLE]);
  const AdminRole = PermissionAccess([ADMIN_ROLE]);
  return (
    <div className="app-wrapper">
      <Helmet titleTemplate="%s" defaultTitle="Exam App">
        <meta name="description" content="Exam App" />
      </Helmet>
      <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_RIGHT} />
      <Switch>
        <Route path={LOGIN} component={LoginPage} />
        <Route path={_403} component={NoPermissionPage} />
        <Route exact path={ADMIN_HOME} component={AdminRole(HomePage)} />
        <Route exact path={CATEGORY} component={AdminRole(CategoryViewPage)} />
        <Route exact path={`${CATEGORY}/:id`} component={AdminRole(CategoryViewPage)} />
        <Route exact path={SECTION_R} component={AdminRole(SectionViewPage)} />
        <Route exact path={`${SECTION_R}/:catId/`} component={AdminRole(SectionViewPage)} />

        <Route exact path={SECTION_NEW_R} component={AdminRole(SectionAddPage)} />
        <Route exact path={`${SECTION_NEW_R}/:catId`} component={AdminRole(SectionAddPage)} />
        <Route exact path={`${SECTION_NEW_R}/:catId/:childCatId`} component={AdminRole(SectionAddPage)} />

        <Route exact path={`${QUESTIONS_NEW}/:id/:catId/:childCatId`} component={AdminRole(QuestionAddPage)} />
        <Route exact path={`${QUESTIONS_VIEW}/:id`} component={AdminRole(QuestionViewPage)} />
        <Route exact path={`${QUESTIONS_VIEW}/:id/:catId/:childCatId`} component={AdminRole(QuestionViewPage)} />

        <Route exact path={EXAM_PREVIEW} component={AdminRole(ExamPreviewViewPage)} />
        <Route exact path={`${EXAM_PREVIEW}/:catId`} component={AdminRole(ExamPreviewViewPage)} />
        <Route exact path={`${EXAM_RESULTS}/:examId`} component={AdminRole(ExamResultViewPage)} />

        <Route exact path={`${EXAM_RESULTS}`} component={AdminRole(ExamResultListViewPage)} />
        <Route exact path={REPORT} component={AdminRole(ExamReportViewPage)} />

        <Route exact path={EXAM_HOME} component={ExamRole(HomePageExaminer)} />
        <Route exact path={`${EXAM}/:id`} component={ExamRole(ExamPageExaminer)} />
        <Route exact path={`${EXAM_RS}/:id`} component={ExamRole(ExamResultViewPageExaminer)} />

        <Route path="" component={NotFoundPage} />
      </Switch>
    </div>
  );
};

export default App;
