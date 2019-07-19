import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import injectSaga from 'utils/injectSaga';
import LoadingIndicator from 'components/LoadingIndicator';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectSection, makeSelectQuestions, makeSelectExam, makeSelectPassage, makeSelectPageCount, makeSelectCurrentPage,
} from './selectors';
import {add2Exam, add2ExamBulk, getQuestions, goHome, loadExamFromLocalStorage, removeQuestion} from './actions';
import saga from './saga';

import './style.scss';
import {Helmet} from 'react-helmet';
import PossibleAnswerView from "../../components/PossibleAnswerView";
import Error from "../../components/Error";
import {
  CONFIRM_ACTION,
  ERROR_MSG,
  LINKS, PASSAGE_OPTION_FROM_GIVEN,
  PASSAGE_TEXT, PASSAGE_TYPES,
  QUES_ACTION,
  QUESTION_TEXT_TYPES,
  VELOCITY
} from "../../constants/questions";
import TextAnswerView from "../../components/TextAnswerView";
import AddQuesLink from "../../components/AddQuesLink";
import AddSectionLink from "../../components/AddSectionLink";
import SectionView from "../../components/SectionView";
import {getExam} from "../../utils/local-storage";
import ConfirmModal from "../../components/ConfirmModal";
import PassageAnswerView from "../../components/PassageAnswerView";
import Pager from "../../components/Pager";

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
      this.props.getQuestions({sectionId: id, page: 1});
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

  renderQuestion = (section, q, idx) => {
    const payload = {sectionId: section.id, quesId: q.id};
    const inExam = this.checkInExam(payload)
    if (PASSAGE_TYPES.includes(q.type)) {
      return (<PassageAnswerView key={idx} idx={idx + 1} section={section}
                                 ques={q} inExam={inExam}
                                 onDoAction={this.onDoAction}/>);
    }

    if (QUESTION_TEXT_TYPES.includes(q.type)) {
      return (<TextAnswerView key={idx} idx={idx + 1} ques={q} inExam={inExam}
                              onDoAction={this.onDoAction}/>);
    }

    return (<PossibleAnswerView key={idx} idx={idx + 1} ques={q} inExam={inExam}
                                onDoAction={this.onDoAction}/>);
  }
  goHome = () => {
    const {id, catId, childCatId} = this.props.match.params;
    this.props.goHome({catId, childCatId});
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

  renderSummary = () => {
    const {section, questions} = this.props;
    const len = questions.length;

    const {sectionId} = this.state;
    const quesListInExam = getExam()[sectionId];
    const lenInExam = quesListInExam ? quesListInExam.length : 0;

    const {catId, childCatId} = this.props.match.params;
    return (
      <div className={'row q-container'}>
        <div className={'col-sm-12 col-md-12 col-lg-12 summary'}>
          <h5 className={'p-t-5'}>
            <span className={'btn m-r-10'} onClick={this.goHome}>&lt;&lt;</span>
            <span className={'m-l-10 active'}>{section.text}</span>
            <span className={'m-l-10 m-r-10 badge badge-secondary'}>{lenInExam}/{len}</span>
            <AddQuesLink sectionId={sectionId} catId={catId} childCatId={childCatId}/>
            <AddSectionLink catId={catId} childCatId={childCatId}/>
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

  renderPASSAGE_OPTION_FROM_GIVEN(passage) {
    const {options} = passage;
    return (
      <div className={'row q-container'}>
        <div className={'col-md-12 op'}>
          {options.map((o, idx) => <span key={idx}>{o}</span>)}
        </div>
      </div>
    );
  }

  renderPassageTextHeader() {
    const {passage} = this.props;
    return (
      <div className={'row q-container'}>
        <div className={'col-md-12'} dangerouslySetInnerHTML={{__html: passage.text}}/>
      </div>
    );
  }

  onPagerChange = page => {
    const {id} = this.props.match.params;
    this.props.getQuestions({sectionId: id, page});
  }
  render() {
    const {
      loading, error, section, passage, questions, pageCount, currentPage
    } = this.props;

    if (loading) {
      return <LoadingIndicator/>;
    }
    if (error) {
      return <Error/>;
    }
    const type = section.questionType;
    return (
      <article>
        <Helmet>
          <title>QuestionViewPage</title>
        </Helmet>
        <div className="ques-view-page">
          {this.renderSummary()}
          {type === PASSAGE_OPTION_FROM_GIVEN && this.renderPASSAGE_OPTION_FROM_GIVEN(passage)}
          {PASSAGE_TYPES.includes(type) && this.renderPassageTextHeader()}

          {section && <SectionView section={section}/>}
          {questions && questions.map((q, idx) => this.renderQuestion(section, q, idx))}
          <Pager pageCount={pageCount} current={currentPage} onChange={this.onPagerChange}/>

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
    pageCount: makeSelectPageCount(),
    questions: makeSelectQuestions(),
    currentPage: makeSelectCurrentPage(),
    passage: makeSelectPassage(),
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

