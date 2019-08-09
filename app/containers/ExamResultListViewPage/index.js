import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import LoadingIndicator from 'components/LoadingIndicator';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectExams,
} from './selectors';
import { goHome, loadExams, upLoadExam } from './actions';
import saga from './saga';

import './style.scss';
import { Helmet } from 'react-helmet';
import Error from '../../components/Error';
import NoData from '../../components/NoData';
import { REPORTS } from '../../constants/service-model';
import { CONFIRM_ACTION, LINKS, VELOCITY } from '../../constants/questions';
import ConfirmModal from '../SectionViewPage';
import FileUploadModal from '../../components/FileUploadModal';
import { EXAM_RESULTS, SECTION_R } from '../../constants/routers';
import { Link } from 'react-router-dom';

const _ = require('lodash');
const $ = require('jquery');

const UPLOAD_MODAL_ID = 'exam_result_upload';

class ExamResultListViewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadShown: false
    };
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

    if (this.state.uploadShown) {
      this.saveUploadStatusAndHide();
      return;
    }
    this.goHome();
  }


  saveUploadStatusAndHide = () => {
    this.setState({ uploadShown: false }, () => {
      $(`#${UPLOAD_MODAL_ID}`).fadeOut(VELOCITY);
    });
  }

  goHome = () => {
    this.props.goHome();
  }

  uploadResult = () => {
    this.setState({ uploadShown: true }, () => {
      $(`#${UPLOAD_MODAL_ID}`).fadeIn(VELOCITY);
    });
  }

  onModalConfirm = (payload) => {
    const { action, selectedFile } = payload;
    if (action === CONFIRM_ACTION.YES) {
      this.props.upLoadExam(selectedFile);
    }
    $(`#${UPLOAD_MODAL_ID}`).fadeOut(VELOCITY);
  }

  renderSummary = () => (
    <div className={'row q-container'}>
      <div className={'col-sm-12 col-md-12 col-lg-12 summary'}>
        <h5 className={'p-t-5'}>
          <span className={'btn m-r-10'} onClick={this.goHome}>&lt;&lt;</span>
          <span className={'btn m-r-10'} onClick={this.uploadResult}>{LINKS.upload_result}</span>
        </h5>
      </div>
    </div>
  )

  renderExam = (e, idx) => (
    <div key={idx} className={'item'}>
      <Link className="router-link" to={`${EXAM_RESULTS}/${e.id}`}>{e.title}
        {e.approve && <i className="fa fa-check tick"></i>}
      </Link>
    </div>
  )

  render() {
    const {
      loading, error, exams
    } = this.props;

    if (loading) {
      return <LoadingIndicator />;
    }
    if (error) {
      return <Error />;
    }

    if (!exams) {
      return (
        <div className={'row q-container'}>
          <div className={'col-md-1 summary'}>
            <span className={'btn'} onClick={this.goHome}>&lt;&lt;</span>
          </div>
          <div className={'col-md-5 summary'}>
            <NoData />
          </div>
        </div>
      );
    }

    return (
      <article>
        <Helmet>
          <title>ExamResultListViewPage</title>
        </Helmet>
        <div className="exam-result-view-page">
          {this.renderSummary()}
          <div className={'exams'}>
            {exams.map(this.renderExam)}
          </div>
          <FileUploadModal id={UPLOAD_MODAL_ID} onConfirm={this.onModalConfirm} />
        </div>
      </article>
    );
  }
}

const
  mapDispatchToProps = (dispatch) => ({
    loadExams: () => dispatch(loadExams()),
    upLoadExam: (payload) => dispatch(upLoadExam(payload)),
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
    key: 'exam-result-view-page',
    saga,
  });

export default compose(
  withSaga,
  withConnect,
)(ExamResultListViewPage);
