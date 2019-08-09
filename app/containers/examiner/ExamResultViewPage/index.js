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
import {approveQuestion, goHome, saveExam, viewExamResult} from './actions';
import saga from './saga';

import './style.scss';
import {Helmet} from 'react-helmet';
import Error from "components/Error";
import {
  LINKS,
  PASSAGE_TYPES,
  PASSAGE_OPTION_FROM_GIVEN,
  QUESTION_TEXT_TYPES,
  VELOCITY
} from "../../../constants/questions";
import NoData from "components/NoData";
import TextAnswerViewOnly from "components/TextAnswerViewOnly";
import PossibleAnswerViewOnly from "components/PossibleAnswerViewOnly";

const _ = require('lodash');
const $ = require('jquery');
const INPUT_MODAL_ID = 'title_input';

class ExamResultViewPage extends React.Component {
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

    const {id} = this.props.match.params;
    this.props.viewExamResult(id);
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
      return (<TextAnswerViewOnly key={idx} idx={idx + 1} ques={q} onClick={''}/>);
    }

    return (<PossibleAnswerViewOnly key={idx} idx={idx + 1} ques={q} onClick={''}/>);
  }

  goHome = () => {
    this.props.goHome();
  }

  toggleShow = idx => e => {
    const {flag} = this.state;
    flag[idx] = !flag[idx];
    this.setState({flag});
  }

  renderPassageOption = (options) => {
    return (
      <div className={'row q-row'}>
        <div className={'col-md-12 op'}>
          {options.map((o, idx) => <span key={idx}>{o}</span>)}
        </div>
      </div>
    );
  }
  renderPassage = (passage, type) => {
    if (!PASSAGE_TYPES.includes(type)) return '';

    return (
      <div className={'q-container'}>
        {type === PASSAGE_OPTION_FROM_GIVEN && this.renderPassageOption(passage.options)}
        <div className={'row q-row'}>
          <div className={'col-md-12'} dangerouslySetInnerHTML={{__html: passage.text}}/>
        </div>
      </div>
    );
  }

  renderSection = (exam, idx) => {
    const {section, passage, questions} = exam;
    const type = section.questionType;
    const len = questions.length;
    const correctCount = questions.filter(q => q.correct).length;
    const {flag} = this.state;

    return (
      <div className={'q-container'} key={idx}>
        <div className={'row q-row'}>
          <div className={'col-md-12 selected-q sec-header-toggle'} onClick={this.toggleShow(idx)}>
            <span dangerouslySetInnerHTML={{__html: section.text}}/>
            <span className={'m-l-10 m-r-10 badge badge-secondary'}>{correctCount}/{len}</span>
          </div>
        </div>
        {!flag[idx] && this.renderPassage(passage, type)}
        {!flag[idx] && questions.map((q, indx) => this.renderQuestion(q, indx))}
      </div>
    );
  }
  renderSummary = () => {
    const {exam} = this.props;
    const len = exam.length === 0 ? 0 :
      exam.map(a => a.questions.length).reduce((a, b) => a + b);

    let correctCount = 0;
    let total = 0;
    for (let e of exam) {
      total += e.questions.length;
      correctCount += e.questions.filter(q => q.correct).length;
    }
    const percent = (correctCount * 100 / total).toFixed(0);
    return (
      <div className={'row q-container'}>
        <div className={'col-sm-12 col-md-12 col-lg-12 summary'}>
          <h5 className={'p-t-5'}>
            <span className={'btn m-r-10'} onClick={this.goHome}>&lt;&lt;</span>
            <span className={'rs m-r-10'}>{LINKS.exam_result}: {correctCount}/{total}={percent}%</span>
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
          <title>ExamResultViewPage</title>
        </Helmet>
        <div className="exam-view-page">
          {this.renderSummary()}
          {exam.map(this.renderSection)}
        </div>
      </article>
    );
  }
}

const
  mapDispatchToProps = (dispatch) => ({
    viewExamResult: (payload) => dispatch(viewExamResult(payload)),
    approveQuestion: (payload) => dispatch(approveQuestion(payload)),
    saveExam: (payload) => dispatch(saveExam(payload)),
    goHome: () => dispatch(goHome()),
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
)(ExamResultViewPage);
