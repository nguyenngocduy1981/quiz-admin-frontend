import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import injectSaga from 'utils/injectSaga';
import LoadingIndicator from 'components/LoadingIndicator';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectSection, makeSelectQuestions, makeSelectExam,
} from './selectors';
import {add2Exam, add2ExamBulk, getQuestions, goHome, loadExamFromLocalStorage, removeQuestion} from './actions';
import saga from './saga';

import './style.scss';
import {Helmet} from 'react-helmet';
import PossibleAnswerView from "../../components/PossibleAnswerView";
import Error from "../../components/Error";
import {CONFIRM_ACTION, ERROR_MSG, LINKS, QUES_ACTION, QUESTION_TEXT_TYPES, VELOCITY} from "../../constants/questions";
import TextAnswerView from "../../components/TextAnswerView";
import AddQuesLink from "../../components/AddQuesLink";
import AddSectionLink from "../../components/AddSectionLink";
import SectionTypeOptionFromGivenView from "../../components/SectionTypeOptionFromGivenView";
import {getExam} from "../../utils/local-storage";
import ConfirmModal from "../../components/ConfirmModal";

const _ = require('lodash');
const $ = require('jquery');
const CONFIRM_MODAL_ID = 'question_del_confirm';
const defaultQuesId4Delete = 0;

class QuestionViewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionId: 0,
      quesId4Delete: defaultQuesId4Delete
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);

    const {id} = this.props.match.params;
    this.setState({sectionId: id}, () => {
      this.props.getQuestions({sectionId: id, page: 0});
    });

    this.props.loadExamFromLocalStorage();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  escFunction = (event) => {
    if (event.keyCode === 27) {
      if (this.state.quesId4Delete > defaultQuesId4Delete) {
        this.saveQues4DelAndHide();
      } else {
        this.goHome();
      }
    }
  }

  saveQues4DelAndHide = () => {
    this.setState({quesId4Delete: defaultQuesId4Delete}, () => {
      $(`#${CONFIRM_MODAL_ID}`).fadeOut(VELOCITY);
    });
  }

  onDoAction = evt => {
    const {action, ques} = evt;
    switch (action) {
      case QUES_ACTION.REMOVE:
        this.setState({quesId4Delete: ques.id}, () => {
          $(`#${CONFIRM_MODAL_ID}`).fadeIn(VELOCITY);
        });
        break;
      case QUES_ACTION.ADD_2_EXAM:
        const payload = {
          sectionId: this.state.sectionId,
          quesId: ques.id
        }
        this.props.add2Exam(payload);
        break;
    }
  }

  onModalConfirm = (action) => {
    if (action === CONFIRM_ACTION.YES) {
      this.props.removeQuestion(this.state.quesId4Delete);
    }
    this.saveQues4DelAndHide();
  }


  checkInExam = payload => {
    const {exam} = this.props;
    const {sectionId, quesId} = payload;
    if (exam) {
      const quesList = exam[sectionId];
      if (quesList) {
        return quesList.includes(quesId);
      }
      return false;
    }

    return false;
  }

  renderQuestion = (q, idx) => {
    const payload = {sectionId: q.sectionId, quesId: q.id};
    const inExam = this.checkInExam(payload)
    if (QUESTION_TEXT_TYPES.includes(q.type)) {
      return (<TextAnswerView key={idx} idx={idx + 1} ques={q} inExam={inExam}
                              onDoAction={this.onDoAction}/>);
    }
    return (<PossibleAnswerView key={idx} idx={idx + 1} ques={q} inExam={inExam}
                                onDoAction={this.onDoAction}/>);
  }
  goHome = () => {
    const {catId} = this.props.match.params;
    this.props.goHome(catId);
  }

  add2ExamBulk = (quesList) => {
    const {sectionId} = this.state;
    this.props.add2ExamBulk({sectionId, quesList});
  }

  deSelectAll = () => {
    this.add2ExamBulk([]);
  }

  selectAll = () => {
    const {questions} = this.props;
    const ids = questions.map(x => x.id);
    this.add2ExamBulk(ids);
  }

  renderSummary = (catId) => {
    const {section, questions} = this.props;
    const len = questions.length;

    const {sectionId} = this.state;
    const quesListInExam = getExam()[sectionId];
    const lenInExam = quesListInExam ? quesListInExam.length : 0;

    return (
      <div className={'row q-container'}>
        <div className={'col-sm-12 col-md-12 col-lg-12 summary'}>
          <h5 className={'p-t-5'}>
            <span className={'btn m-r-10'} onClick={this.goHome}>&lt;&lt;</span>
            <span className={'m-l-10 active'}>{section.text}</span>
            <span className={'m-l-10 m-r-10 badge badge-secondary'}>{lenInExam}/{len}</span>
            <AddQuesLink sectionId={sectionId} catId={catId}/>
            <AddSectionLink/>
            {lenInExam !== len &&
            <span className={'btn m-r-10'} onClick={this.selectAll}>{LINKS.select_all}</span>
            }
            {lenInExam === len &&
            <span className={'btn m-r-10'} onClick={this.deSelectAll}>{LINKS.deselect_all}</span>
            }
          </h5>
        </div>
      </div>
    );
  }

  render() {
    const {
      loading, error, section, questions
    } = this.props;

    if (loading) {
      return <LoadingIndicator/>;
    }
    if (error) {
      return <Error/>;
    }

    const {catId} = this.props.match.params;

    if (!section) {
      return (
        <div className={'row q-container'}>
          <div className={'col-md-1 summary'}>
            <span className={'btn'} onClick={this.props.goHome}>&lt;&lt;</span>
          </div>
          <div className={'col-md-2'}>
            <span>{ERROR_MSG.ERR_NO_SEC_CHOOSEN}</span>
          </div>
          <div className={'col-md-2 summary'}>
            <AddQuesLink sectionId={this.state.sectionId} catId={catId}/>
            <AddSectionLink/>
          </div>
        </div>
      );
    }

    return (
      <article>
        <Helmet>
          <title>QuestionViewPage</title>
        </Helmet>
        <div className="ques-view-page">
          {this.renderSummary(catId)}
          <SectionTypeOptionFromGivenView section={section}/>
          {questions.map(this.renderQuestion)}
          <ConfirmModal id={CONFIRM_MODAL_ID} onConfirm={this.onModalConfirm}/>
        </div>
      </article>
    );
  }
}

const
  mapDispatchToProps = (dispatch) => ({
    getQuestions: (payload) => dispatch(getQuestions(payload)),
    loadExamFromLocalStorage: () => dispatch(loadExamFromLocalStorage()),
    add2Exam: (payload) => dispatch(add2Exam(payload)),
    add2ExamBulk: (payload) => dispatch(add2ExamBulk(payload)),
    goHome: (payload) => dispatch(goHome(payload)),
    removeQuestion: (payload) => dispatch(removeQuestion(payload)),
  });

const
  mapStateToProps = createStructuredSelector({
    questions: makeSelectQuestions(),
    section: makeSelectSection(),
    loading: makeSelectLoading(),
    exam: makeSelectExam(),
    error: makeSelectError(),
  });

const
  withConnect = connect(mapStateToProps, mapDispatchToProps);

const
  withSaga = injectSaga({
    key: 'question-view-page',
    saga,
  });

export default compose(
  withSaga,
  withConnect,
)(QuestionViewPage);

