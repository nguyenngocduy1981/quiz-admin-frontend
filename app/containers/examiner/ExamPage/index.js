import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import injectSaga from 'utils/injectSaga';
import LoadingIndicator from 'components/LoadingIndicator';
import {
  makeSelectExam,
  makeSelectLoading,
  makeSelectError,
} from './selectors';
import {answer, goHome, lamLaiBai, loadExam, nopBai} from './actions';
import saga from './saga';

import './style.scss';
import {Helmet} from 'react-helmet';
import Error from "components/Error";
import {
  ABC_LIST,
  OPTION_FROM_GIVEN, PASSAGE_OPTION,
  PASSAGE_OPTION_FROM_GIVEN,
  PASSAGE_TYPES,
  QUESTION_OPTION_TYPES
} from "../../../constants/constants";

const _ = require('lodash');

const OPTIONS_FROM = [PASSAGE_OPTION_FROM_GIVEN, PASSAGE_OPTION];

class ExamPage extends React.Component {
  // collapse: {"sec_"+value: true/false}
  constructor(props) {
    super(props);
    this.state = {
      posAnsId: 0,
      textAns: '',
      quesId: 0,
      currentExam: '',
      collapse: {}
    };
  }

  componentDidMount() {
    const {id} = this.props.match.params;
    this.setState({currentExam: id}, () => {
      this.props.loadExam(id);
    });
  }

  onPassageInputChange = (ques, idx) => evt => {
    ques.passages[idx].answered = evt.target.value;
    this.props.answer(ques);
  }

  saveAnswer = (section, ques, val) => {
    ques.answered = val;
    this.props.answer({ques, sectionId: section.id});
  }

  onTextboxInputChange = (section, ques) => evt => {
    this.saveAnswer(section, ques, evt.target.value);
  }

  onPosAnswerChange = (section, ques, val) => evt => {
    this.saveAnswer(section, ques, val);
  }

  renderSections = () => {
    const {
      loading, error, exam,
    } = this.props;

    if (loading) {
      return <LoadingIndicator/>;
    }
    if (error) {
      return <Error err={error}/>
    }
    if (!exam) {
      return (
        <section><h3>Khong co cau hoi nao</h3></section>
      );
    }

    return exam.map(this.renderQuestions);
  }

  renderAnsweredQuestion = () => {
    let total = 0;
    let answered = 0;
    const {exam} = this.props;
    if (!exam) return `${answered} / ${total}`;

    exam.forEach(item => {
      const {questions} = item;
      total += questions.length;
      answered += questions.filter(q => q.answered && q.answered.length).length;
    });

    return `${answered} / ${total}`;
  }

  renderAnsweredQuestionInSection = (questions) => {
    const total = questions.length;
    const answered = questions.filter(q => q.answered && q.answered.length).length;
    return `${answered} / ${total}`;
  }

  collapseToggle = (secId) => (evt) => {
    const collapse = this.state;
    collapse[`sec_${secId}`] = !collapse[`sec_${secId}`];
    this.setState({collapse});
  }

  renderExpandCollap = (secId) => (this.checkCollapse(secId) ? '➕' : '➖');

  checkCollapse = (secId) => this.state.collapse[`sec_${secId}`];

  renderOption = (op, idx) => {
    return (<span key={idx}>{op}</span>)
  }

  renderSectionOptions = (sec) => {
    const {type, options} = sec;
    if (type !== OPTION_FROM_GIVEN) return '';

    return (<div className={'options'}>{options.map(this.renderOption)}</div>);
  }

  renderAnswer(section, ques) {
    if (QUESTION_OPTION_TYPES.includes(section.questionType)) {
      return this.renderPossibleAnswer(section, ques);
    }

    return this.renderTextBoxAnswer(section, ques);
  }

  renderTextBoxAnswer(section, ques) {
    return (
      <span className={'pos_an'}>
        <input type='text' className={'text-control'}
               value={ques.answered}
               onChange={this.onTextboxInputChange(section, ques)}/>
      </span>
    );
  }

  renderPossibleAnswer(section, ques) {
    const {possibleAnswers} = ques;
    if (!possibleAnswers) {
      return null;
    }

    return possibleAnswers.map((p, idx) =>
      <span onClick={this.onPosAnswerChange(section, ques, p)}
            key={`post_${idx}`}
            className={`pos_an ${ques.answered === p ? 'selected' : ''}`}
            dangerouslySetInnerHTML={{__html: this.renderHtml(p, idx)}}
      />,
    );
  }

  renderHtml = (text, idx) => {
    return ABC_LIST[idx] + text
      .replace('#START#', '<span style="text-decoration: underline;">')
      .replace('#END#', '</span>');
  };

  renderQuestionOptionFromGiven = (section, ques, idx) => {
    return (
      <div className="list-item-wrapper" key={idx}>
        <div className={'posible_answer'}>
          {ques.text}: &nbsp; {this.renderAnswer(section, ques)}
        </div>
      </div>
    );
  }

  renderQuestion = (section, ques, idx) => {
    return (
      <div className="list-item-wrapper" key={idx}>
        <h3 className={'question-name-view-only'}>Question {idx + 1} - {ques.text}</h3>
        <div className={'posible_answer'}>
          {this.renderAnswer(section, ques)}
        </div>
      </div>
    );
  }

  renderPASSAGE_OPTION_FROM_GIVEN = (options) => {
    return (
      <div className={'op'}>
        {options.map((o, idx) => <span key={`op_${idx}`}>{o}</span>)}
      </div>
    );
  }
  renderPASSAGE_TYPES = (passage, type) => {
    return (
      <section>
        {type === PASSAGE_OPTION_FROM_GIVEN && this.renderPASSAGE_OPTION_FROM_GIVEN(passage.options)}

        <div dangerouslySetInnerHTML={{__html: passage.text}}/>
      </section>
    )
  }
  renderQuestions = (examItem, idx) => {
    const {section, passage, questions} = examItem;
    const type = section.questionType;
    const isFromGiven = OPTIONS_FROM.includes(type);
    const secId = section.id;
    return (
      <section key={`sec_${idx}`} className={'section'}>
        <section className={'section-header'}>
          <h3>{section.text}</h3>
          <h3 onClick={this.collapseToggle(secId)}>
            {this.renderAnsweredQuestionInSection(questions)}
            &nbsp;&nbsp;
            {this.renderExpandCollap(secId)}
          </h3>
        </section>
        {OPTION_FROM_GIVEN === type && this.renderSectionOptions(section)}
        {PASSAGE_TYPES.includes(type) && this.renderPASSAGE_TYPES(passage, type)}
        {
          this.checkCollapse(secId) || (
            <div className={'section_options'}>
              {!isFromGiven && questions.map((q, idx) => this.renderQuestion(section, q, idx))}
              {isFromGiven && questions.map((q, idx) => this.renderQuestionOptionFromGiven(section, q, idx))}
            </div>
          )
        }
      </section>
    );
  };

  renderSummary = () => {
    const {id} = this.props.match.params;
    const {exam,} = this.props;
    const payload = {
      id,
      questions: exam
    }
    return (
      <div className={'summary'}>
        <div>
          <span className={'btn'} onClick={this.props.goHome}>Về trang danh sách bài thi</span>
        </div>
        <div>
          <span className={'btn'} onClick={e => this.props.nopBai(payload)}>Nộp bài</span>
          <span className={'btn'} onClick={this.props.lamLaiBai}>Làm lại</span>
        </div>
        <div>{this.renderAnsweredQuestion()}</div>
      </div>
    );
  }

  render() {
    return (
      <article>
        <Helmet>
          <title>Examiner-ExamPage</title>
          <meta name="description" content="yyyyy"/>
        </Helmet>
        <div className="exam-page-examiner">
          {this.renderSummary()}
          {this.renderSections()}
        </div>
      </article>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  loadExam: (payload) => dispatch(loadExam(payload)),
  answer: (payload) => dispatch(answer(payload)),
  nopBai: (payload) => dispatch(nopBai(payload)),
  lamLaiBai: () => dispatch(lamLaiBai()),
  goHome: () => dispatch(goHome()),
});

const mapStateToProps = createStructuredSelector({
  exam: makeSelectExam(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({
  key: 'exam-page-examiner',
  saga,
});

export default compose(
  withSaga,
  withConnect,
)(ExamPage);
