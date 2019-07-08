import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import injectSaga from 'utils/injectSaga';
import LoadingIndicator from 'components/LoadingIndicator';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectExams,
} from './selectors';
import {goHome, loadExams} from './actions';
import saga from './saga';

import './style.scss';
import {Helmet} from 'react-helmet';
import Error from "../../components/Error";
import NoData from "../../components/NoData";
import {REPORTS} from "../../constants/service-model";

const _ = require('lodash');
const $ = require('jquery');

class ExamReportViewPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);

    this.props.loadExams();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  escFunction = (event) => {
    if (event.keyCode !== 27) return;

    this.goHome();
  }


  goHome = () => {
    this.props.goHome();
  }

  renderSummary = () => {
    return (
      <div className={'row q-container'}>
        <div className={'col-sm-12 col-md-12 col-lg-12 summary'}>
          <h5 className={'p-t-5'}>
            <span className={'btn m-r-10'} onClick={this.goHome}>&lt;&lt;</span>
            <span className={'btn'}>xxxxx</span>
          </h5>
        </div>
      </div>
    );
  }

  renderExam = (e, idx) => {
    return (
      <div key={idx} className={'item'}><a href={`${REPORTS}/${e.id}`}>{e.id} - {e.title}</a></div>
    );
  }

  render() {
    const {
      loading, error, exams
    } = this.props;

    if (loading) {
      return <LoadingIndicator/>;
    }
    if (error) {
      return <Error/>;
    }

    if (!exams) {
      return (
        <div className={'row q-container'}>
          <div className={'col-md-1 summary'}>
            <span className={'btn'} onClick={this.goHome}>&lt;&lt;</span>
          </div>
          <div className={'col-md-5 summary'}>
            <NoData/>
          </div>
        </div>
      );
    }

    return (
      <article>
        <Helmet>
          <title>ExamReportViewPage</title>
        </Helmet>
        <div className="exam-report-view-page">
          {this.renderSummary()}
          <div className={'exams'}>{exams.map(this.renderExam)}</div>
        </div>
      </article>
    );
  }
}

const
  mapDispatchToProps = (dispatch) => ({
    loadExams: () => dispatch(loadExams()),
    goHome: (payload) => dispatch(goHome(payload)),
  });

const
  mapStateToProps = createStructuredSelector({
    exams: makeSelectExams(),
    loading: makeSelectLoading(),
    error: makeSelectError(),
  });

const
  withConnect = connect(mapStateToProps, mapDispatchToProps);

const
  withSaga = injectSaga({
    key: 'exam-report-view-page',
    saga,
  });

export default compose(
  withSaga,
  withConnect,
)(ExamReportViewPage);
