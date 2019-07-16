import React from 'react';
import {
  ACTION,
  PASSAGE_OPTION_FROM_GIVEN,
  PLACE_HOLDER
} from '../../constants/questions';
import './style.scss';

const _ = require('lodash');

class PassageAnswerAdd extends React.Component {
  constructor(props) {
    super(props);
  }

  saveTemp = (sec) => {
    this.props.onDataOutput({action: ACTION.TEMP_SAVE, data: sec});
  }
  onInputChange = (evt) => {
    const {sec} = this.props;
    sec.passageText = evt.target.value;
    this.saveTemp(sec);
  }

  onNoOfQuesInputChange = sec => evt => {
    const no = evt.target.value;
    sec.noOfQues = no;
    sec.passageOptions = [];
    for (let i = 0; i < no; i++) {
      sec.passageOptions.push('');
    }

    this.saveTemp(sec);
  }

  hasError = () => {
    const {ques} = this.props;
    const pos = ques.pos;
    return ques.text === '' || pos.length === 0
      || pos.a === '' || pos.b === '' || pos.c === '' || pos.d === '';
  }

  onPassageInputChange = (idx) => evt => {
    const {sec} = this.props;
    const {passageOptions} = sec;

    passageOptions[idx] = evt.target.value;
    this.saveTemp(sec);
  }

  renderPassage = (pa, idx) => {
    return (
      <div className={'col-md-3'} key={idx}>
        <div className={'passage'}>
          <span>({idx + 1})</span>
          <input
            className={'answer'}
            type={'text'}
            value={pa}
            onChange={this.onPassageInputChange(idx)}
          />
        </div>
      </div>
    )
  }

  removeQues = evt => {
    const {ques} = this.props;
    this.saveTemp({action: ACTION.REMOVE_QUES, data: ques.id});
  }

  newQuestion = (evt) => {
    if (evt.keyCode !== 13) {
      return;
    }
    this.props.onDataOutput({action: ACTION.NEW});
  }

  render() {
    const {sec, idx} = this.props;
    const {passageOptions} = sec;
    const type = sec.questionType;
    return (
      <div className={`q-container ${sec.error ? 'q-error' : ''}`}>
        <div className={'row q-row'}>
          <div className={'col-md-12'}>
            <label htmlFor={`q_${idx}`}>
              <h4>Nhập đoạn văn &nbsp;&nbsp;
                {type === PASSAGE_OPTION_FROM_GIVEN &&
                <input type={'text'} className={'no-of-ques'} placeholder={PLACE_HOLDER.no_of_ques}
                       onBlur={this.onNoOfQuesInputChange(sec)}
                />
                }
              </h4>
            </label>
            <span className={'q-remove-icon'} onClick={this.removeQues}>
                <i className="fa fa-times" aria-hidden="true"></i>
              </span>
            <div className={'passage'}>
                <textarea
                  id={`q_${idx}`}
                  rows={10}
                  type={'text'}
                  className={'form-control question-input'}
                  placeholder={PLACE_HOLDER.passage}
                  value={sec.passageText}
                  onChange={this.onInputChange}
                ></textarea>
            </div>
          </div>
        </div>
        {PASSAGE_OPTION_FROM_GIVEN === type &&
        <div className={'row q-row'}>
          {passageOptions.map((pa, pa_idx) => this.renderPassage(pa, pa_idx))}
        </div>
        }
      </div>
    );
  }
}

export default PassageAnswerAdd;


