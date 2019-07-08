import React from 'react';
import {ABC_LIST, QUES_ACTION} from "../../constants/questions";
import './style.scss';

class PossibleAnswerView extends React.Component {
  constructor(props) {
    super(props);
  }

  renderPos = (ques, p, idx) => {
    return (
      <div key={idx} className={'col-md-2'}>
        <span className={'m-l-15'}>{ABC_LIST[idx]}</span><span className={`${ques.answer === p ? 'answered' : ''}`}>{p}</span>
      </div>
    );
  }

  render() {
    const {ques, inExam} = this.props;
    const rm = {action: QUES_ACTION.REMOVE, ques};
    const add2Exam = {action: QUES_ACTION.ADD_2_EXAM, ques};

    return (
      <div className={'q-container'}>
        <div className={'row q-row'}>
          <div className={`col-md-12 ${inExam ? 'selected-q' : ''}`}>
            <span dangerouslySetInnerHTML={{__html: ques.text}}/>
            <div className={'acts'}>
            <span className={'q-remove-icon'} onClick={e => this.props.onDoAction(rm)}>
                <i className="fa fa-times" aria-hidden="true"></i>
              </span>

              <span className={'q-check-icon'} onClick={e => this.props.onDoAction(add2Exam)}>
              {
                inExam ?
                  <i className="fa fa-check-square check-color"></i> : <i className="fa fa-minus-square"></i>
              }
              </span>
            </div>
          </div>
        </div>
        <div className={'row q-row'}>
          {ques.possibleAnswers.map((p, idx) => this.renderPos(ques, p, idx))}
        </div>
      </div>
    );
  }
}

export default PossibleAnswerView;
