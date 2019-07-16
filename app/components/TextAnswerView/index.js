import React from 'react';
import {QUES_ACTION} from "../../constants/questions";
import './style.scss';

class TextAnswerView extends React.Component {
  constructor(props) {
    super(props);
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
          <div className={'col-md-12'}>
            <span className={'m-l-15'}>{ques.answer}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default TextAnswerView;
