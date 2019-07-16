import React from 'react';
import './style.scss';
import {
  QUES_ACTION,
  PASSAGE_OPTION,
  ABC_ANS
} from "../../constants/questions";


class PassageAnswerView extends React.Component {
  constructor(props) {
    super(props);
  }

  renderPassageOption = (pos, idx) => {
    return (
      <span key={idx} className={'pos-an'}>{ABC_ANS[idx]}. {pos}</span>
    );
  }

  renderActions() {
    const {ques, inExam} = this.props;

    const rm = {action: QUES_ACTION.REMOVE, ques};
    const add2Exam = {action: QUES_ACTION.ADD_2_EXAM, ques};
    return (
      <span className={'acts'}>
          <span className={'q-remove-icon'} onClick={e => this.props.onDoAction(rm)}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </span>
          <span className={'q-check-icon'} onClick={e => this.props.onDoAction(add2Exam)}>
            {inExam ?
              <i className="fa fa-check-square check-color"></i> :
              <i className="fa fa-minus-square"></i>}
          </span>
      </span>
    );
  }

  renderPASSAGE_OPTION() {
    const {ques, inExam, idx} = this.props;
    const {possibleAnswers} = ques;
    return (
      <div className={`q-container ${ques.error ? 'q-error' : ''}`}>
        <div className={'row q-row'}>
          <div className={`col-md-12 ${inExam ? 'selected-q' : ''}`}>
            <b>{idx} - </b>
            {possibleAnswers.map(this.renderPassageOption)}
            {this.renderActions()}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {section, ques, idx, inExam} = this.props;
    const type = section.questionType;

    if (type === PASSAGE_OPTION) return this.renderPASSAGE_OPTION();
    // PASSAGE_TEXT_TYPES --> answer = text
    return (
      <div className={`q-container ${ques.error ? 'q-error' : ''}`}>
        <div className={'row q-row'}>
          <div className={'col-md-12'}>
            <h4 className={`${inExam ? 'selected-q' : ''}`}>
              {ques.text}
              {this.renderActions()}
            </h4>
            <div className={'an'}>{ques.answer}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default PassageAnswerView;


