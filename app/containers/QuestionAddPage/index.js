import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import injectSaga from 'utils/injectSaga';
import LoadingIndicator from 'components/LoadingIndicator';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectSection, makeSelectQuestions, makeSelectRequiredPickFromGiven,
} from './selectors';
import {
  saveTempQuestion,
  getSection,
  goHome,
  newQuestion,
  saveQuestions,
  checkExistedQuestion,
  removeQuestion, markAnswerPickedFromGiven
} from './actions';
import saga from './saga';

import './style.scss';
import {Helmet} from 'react-helmet';
import PossibleAnswerAdd from "../../components/PossibleAnswerAdd";
import {
  ACTION,
  LINKS,
  OPTION_FROM_GIVEN,
  QUESTION_TEXT_TYPES,
  QUESTION_OPTION_TYPES
} from "../../constants/questions";
import Error from "../../components/Error";
import TextAnswerAdd from "../../components/TextAnswerAdd";

import {
  checkQuesOPTION_FROM_GIVENWithAnswerMustInGiven,
  isEmptyQuestions,
  isQuestionsExisted,
  posAnsHasError,
} from "./utils";
import {QUESTIONS_VIEW} from "../../constants/routers";
import {Link} from "react-router-dom";
import SectionTypeOptionFromGivenView from "../../components/SectionTypeOptionFromGivenView";
import NoData from "../../components/NoData";

const _ = require('lodash');

class QuestionAddPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionId: 0
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);

    const {id} = this.props.match.params;
    this.setState({sectionId: id}, () => {
      this.props.getSection(id);
    });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  escFunction = (event) => {
    if (event.keyCode === 27) {
      this.goHome();
    }
  }

  onQuestionDataOutput = section => evt => {
    const {questions} = this.props;
    const {action, data} = evt;
    switch (action) {
      case ACTION.NEW:
        this.props.newQuestion(section.questionType);

        break;
      case ACTION.TEMP_SAVE:
        this.props.saveTempQuestion(data);

        break;
      case ACTION.REMOVE_QUES:
        this.props.removeQuestion({data});
        break;
      case ACTION.CHECK_QUES:
        const {sectionId} = this.state;
        this.props.checkExistedQuestion({data, sectionId});

        break;
    }
  }

  renderQuestion = (section, q, idx) => {
    if (QUESTION_TEXT_TYPES.includes(q.questionType)) {
      return (<TextAnswerAdd key={idx} idx={idx + 1} ques={q} onDataOutput={this.onQuestionDataOutput(section)}/>);
    }
    return (
      <PossibleAnswerAdd key={idx} idx={idx + 1} ques={q}
                         onDataOutput={this.onQuestionDataOutput(section)}/>
    );
  }

  renderQuestions = () => {
    const {section, questions} = this.props;
    return questions.map((q, idx) => this.renderQuestion(section, q, idx));
  }

  newQuestion = questionType => evt => {
    this.props.newQuestion(questionType);
  }

  goHome = () => {
    const {catId} = this.props.match.params;
    this.props.goHome(catId);
  }
  saveQuestions = evt => {
    let {questions} = this.props;
    if (questions.length === 0) return;

    const {requiredPickFromGiven, section} = this.props;

    // TODO chú ý, update logic check ở đây thì cũng cần update "NEW_QUESTION" trong reducer.js
    const type = section.questionType;

    // TODO co mot so section, khong nhat thiet phai check pos = trong list. Nen check lai de update biz cho on
    if (isEmptyQuestions(questions, type) ||
      isQuestionsExisted(questions) ||
      (QUESTION_OPTION_TYPES.includes(type) && posAnsHasError(questions)) ||
      (requiredPickFromGiven && !checkQuesOPTION_FROM_GIVENWithAnswerMustInGiven(section, questions))) {
      this.props.newQuestion(type);
      return;
    }

    const {catId} = this.props.match.params;
    this.props.saveQuestions({section, questions, catId});
  }

  renderSummary = () => {
    const {section, questions} = this.props;
    const len = questions.length;
    return (
      <div className={'row q-container'}>
        <div className={'col-md-10 summary'}>
          <h5 className={'p-t-5'}>
            <span className={'btn m-r-10'} onClick={this.goHome}>&lt;&lt;</span>
            <Link className="m-l-10 router-link" to={`${QUESTIONS_VIEW}/${section.id}`}
                  title={section.questionType}
                  dangerouslySetInnerHTML={{__html: section.text}}/>
            <span className={'m-l-10 m-r-10 badge badge-secondary'} title={section.questionType}>{len}</span>
          </h5>
        </div>
        <div className={'col-md-2 summary'}>
          <h5 className={'p-t-5'}>
            <span className={'btn'}
                  onClick={this.newQuestion(section.questionType)}>{LINKS.them_moi}</span>
            {
              len > 0 ?
                (<span className={'btn'}
                       onClick={this.saveQuestions}>{LINKS.luu}</span>) : ''
            }
          </h5>
        </div>
      </div>
    );
  }

  render() {
    const {
      loading, error, section, requiredPickFromGiven
    } = this.props;

    if (loading) {
      return <LoadingIndicator/>;
    }
    if (error) {
      return <Error/>;
    }
    if (!section) {
      return (
        <div className={'row q-container'}>
          <div className={'col-md-1 summary'}>
            <span className={'btn'} onClick={this.props.goHome}>&lt;&lt;</span>
          </div>
          <div className={'col-md-11'}>
            <NoData/>
          </div>
        </div>
      );
    }

    return (
      <article>
        <Helmet>
          <title>QuestionAddPage</title>
        </Helmet>
        <div className="ques-add-page">
          {this.renderSummary()}
          <SectionTypeOptionFromGivenView section={section} requiredPickFromGiven={requiredPickFromGiven}
                                          onRequiredPickFromGivenChange={e => this.props.markAnswerPickedFromGiven(e)}
          />
          {this.renderQuestions()}
        </div>
      </article>
    );
  }
}

const
  mapDispatchToProps = (dispatch) => ({
    getSection: (payload) => dispatch(getSection(payload)),
    goHome: (payload) => dispatch(goHome(payload)),
    newQuestion: (payload) => dispatch(newQuestion(payload)),
    saveTempQuestion: (payload) => dispatch(saveTempQuestion(payload)),
    saveQuestions: (payload) => dispatch(saveQuestions(payload)),
    checkExistedQuestion: (payload) => dispatch(checkExistedQuestion(payload)),
    removeQuestion: (payload) => dispatch(removeQuestion(payload)),
    markAnswerPickedFromGiven: (payload) => dispatch(markAnswerPickedFromGiven(payload)),
  });

const
  mapStateToProps = createStructuredSelector({
    requiredPickFromGiven: makeSelectRequiredPickFromGiven(),
    questions: makeSelectQuestions(),
    section: makeSelectSection(),
    loading: makeSelectLoading(),
    error: makeSelectError(),
  });

const
  withConnect = connect(mapStateToProps, mapDispatchToProps);

const
  withSaga = injectSaga({
    key: 'question-add-page',
    saga,
  });

export default compose(
  withSaga,
  withConnect,
)(QuestionAddPage);
