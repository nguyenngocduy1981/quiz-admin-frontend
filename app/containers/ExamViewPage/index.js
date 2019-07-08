import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import injectSaga from 'utils/injectSaga';
import LoadingIndicator from 'components/LoadingIndicator';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectExam,
} from './selectors';
import {cancelExam, createExam, goHome, loadExamPreview} from './actions';
import saga from './saga';

import './style.scss';
import {Helmet} from 'react-helmet';
import Error from "../../components/Error";
import {CONFIRM_ACTION, LINKS, QUESTION_TEXT_TYPES, VELOCITY} from "../../constants/questions";
import NoData from "../../components/NoData";
import TextAnswerViewOnly from "../../components/TextAnswerViewOnly";
import PossibleAnswerViewOnly from "../../components/PossibleAnswerViewOnly";
import InputModal from "../../components/InputModal";

const _ = require('lodash');
const $ = require('jquery');
const INPUT_MODAL_ID = 'title_input';

class ExamViewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShown: false,
      sectionId: 0,
      flag: {}
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);

    this.props.loadExamPreview();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  escFunction = (event) => {
    if (event.keyCode !== 27) return;

    if (this.state.modalShown) {
      this.hideModal();
    } else {
      this.goHome();
    }
  }

  renderQuestion = (q, idx) => {
    if (QUESTION_TEXT_TYPES.includes(q.type)) {
      return (<TextAnswerViewOnly key={idx} idx={idx + 1} ques={q}/>);
    }
    return (<PossibleAnswerViewOnly key={idx} idx={idx + 1} ques={q}/>);
  }

  cancelExam = () => {
    this.props.cancelExam();
  }

  createExam = () => {
    this.setState({modalShown: true}, () => {
      $(`#${INPUT_MODAL_ID}`).fadeIn(VELOCITY);
      $(`#id_${INPUT_MODAL_ID}`).val('').focus();
    });
  }

  goHome = () => {
    const {catId} = this.props.match.params;
    this.props.goHome(catId);
  }

  toggleShow = (idx) => {
    const {flag} = this.state;
    flag[idx] = !flag[idx];
    this.setState({flag});
  }
  renderSection = (k, exam, idx) => {
    const questions = exam[k];
    const len = questions.length;
    const sec = questions[0];
    const {flag} = this.state;

    return (
      <div className={'q-container'} key={idx}>
        <div className={'row q-row'}>
          <div className={'col-md-12 selected-q sec-header-toggle'} onClick={e => this.toggleShow(idx)}>
            <span dangerouslySetInnerHTML={{__html: sec.sectionName}}/>
            <span className={'m-l-10 m-r-10 badge badge-secondary'}>{len}</span>
          </div>
        </div>
        {!flag[idx] && questions.map(this.renderQuestion)}
      </div>
    );
  }
  renderSummary = () => {
    const {exam} = this.props;
    const keys = Object.keys(exam);
    const len = keys.length === 0 ? 0 : keys.map(k => exam[k].length).reduce((a, b) => a + b);

    return (
      <div className={'row q-container'}>
        <div className={'col-sm-12 col-md-12 col-lg-12 summary'}>
          <h5 className={'p-t-5'}>
            <span className={'btn m-r-10'} onClick={this.goHome}>&lt;&lt;</span>
            <span className={'btn'} onClick={this.cancelExam}>{LINKS.cancel_exam}</span>
            <span className={'btn'} onClick={this.createExam}>
              {LINKS.create_exam}
              <span className={'m-l-10 m-r-10 badge badge-secondary'}>{len}</span>
            </span>
          </h5>
        </div>
      </div>
    );
  }

  hideModal = () => {
    this.setState({modalShown: false}, () => {
      $(`#${INPUT_MODAL_ID}`).fadeOut(VELOCITY);
    });
  }
  onInputModalSubmit = evt => {
    this.hideModal();

    const {action, val} = evt;
    if (val.length === 0) return;

    switch (action) {
      case CONFIRM_ACTION.YES:
        this.props.createExam(val);
        break;
    }
  }

  render() {
    const {
      loading, error, exam
    } = this.props;

    if (loading) {
      return <LoadingIndicator/>;
    }
    if (error) {
      return <Error/>;
    }

    if (!exam) {
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
          <title>ExamViewPage</title>
        </Helmet>
        <div className="exam-view-page">
          {this.renderSummary()}
          {Object.keys(exam).map((k, idx) => this.renderSection(k, exam, idx))}
          <InputModal id={INPUT_MODAL_ID} placeholder={'dd-mm-yyyy_name'}
                      onSubmit={this.onInputModalSubmit} shown={this.state.modalShown}/>
        </div>
      </article>
    );
  }
}

const
  mapDispatchToProps = (dispatch) => ({
    loadExamPreview: () => dispatch(loadExamPreview()),
    cancelExam: () => dispatch(cancelExam()),
    createExam: (payload) => dispatch(createExam(payload)),
    goHome: (payload) => dispatch(goHome(payload)),
  });

const
  mapStateToProps = createStructuredSelector({
    exam: makeSelectExam(),
    loading: makeSelectLoading(),
    error: makeSelectError(),
  });

const
  withConnect = connect(mapStateToProps, mapDispatchToProps);

const
  withSaga = injectSaga({
    key: 'exam-view-page',
    saga,
  });

export default compose(
  withSaga,
  withConnect,
)(ExamViewPage);
