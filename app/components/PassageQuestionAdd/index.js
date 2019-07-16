import React from 'react';
import {
  ACTION,
  PASSAGE_OPTION_TYPES,
  PASSAGE_OPTION_FROM_GIVEN,
  PLACE_HOLDER, MAX_CHARS_TO_BE_SEARCHED
} from '../../constants/questions';
import './style.scss';

const _ = require('lodash');

class PassageQuestionAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quesText: ''
    }
  }

  saveTemp = (ques) => {
    this.props.onDataOutput({action: ACTION.TEMP_SAVE, data: ques});
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

  onPosInputChange = (ques, name) => evt => {
    ques.pos[name] = evt.target.value;
    this.saveTemp(ques);
  }


  onCorrectSelect = val => evt => {
    if (val.length === 0) return;

    const {ques} = this.props;
    ques.ans = val;
    this.props.onDataOutput({action: ACTION.TEMP_SAVE, data: ques});
  }

  onQuestionInputChange = (evt) => {
    const {ques} = this.props;
    ques.text = evt.target.value;
    this.saveTemp(ques);
  }
  onQuestionInputBlur = evt => {
    const {quesText} = this.state;
    const {ques} = this.props;
    const text = ques.text;

    if (quesText === text) {
      return;
    }

    this.setState({quesText: text}, () => {
      this.props.onDataOutput({action: ACTION.CHECK_QUES, data: ques});
    });
  }

  renderPosible = (ques, val, label, name) => {
    return (
      <div className={'col-md-3'}>
        <div className={'icon-container'}>
          <input
            type={'text'}
            className={'form-control'}
            placeholder={label}
            value={val}
            onChange={this.onPosInputChange(ques, name)}
            onKeyUp={this.newQuestion}
          />
          <span className={`icon-r ${val === ques.ans ? 'checked' : ''}`} onClick={this.onCorrectSelect(val)}>
            <i className="fa fa-check"></i>
          </span>
        </div>
      </div>
    )
  }

  render() {
    const {ques, idx} = this.props;
    if (!ques.pos) {
      return '';
    }
    const {a, b, c, d} = ques.pos;

    return (
      <div className={`q-container ${ques.error ? 'q-error' : ''}`}>
        <div className={'row q-row'}>
          <div className={'col-md-12'}>
            <div className="form-group">
              <label htmlFor={`q_${idx}`}><h4>Câu hỏi {idx}</h4></label>
              <span className={'q-remove-icon'} onClick={this.removeQues}>
                <i className="fa fa-times" aria-hidden="true"></i>
              </span>
              <div className={'icon-container'}>
                <input
                  id={`q_${idx}`}
                  type={'text'}
                  className={'form-control question-input'}
                  placeholder={PLACE_HOLDER.q}
                  value={ques.text}
                  onChange={this.onQuestionInputChange}
                  onBlur={this.onQuestionInputBlur}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={'row q-row'}>
          {this.renderPosible(ques, a, PLACE_HOLDER.ans_a, 'a')}
          {this.renderPosible(ques, b, PLACE_HOLDER.ans_b, 'b')}
          {this.renderPosible(ques, c, PLACE_HOLDER.ans_c, 'c')}
          {this.renderPosible(ques, d, PLACE_HOLDER.ans_d, 'd')}
        </div>
      </div>
    );
  }
}

export default PassageQuestionAdd;


