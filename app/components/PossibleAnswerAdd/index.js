import React from 'react';
import {ACTION, ERROR_MSG, MAX_CHARS_TO_BE_SEARCHED, PLACE_HOLDER} from '../../constants/questions';

const _ = require('lodash');

class PossibleAnswerAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quesText: ''
    }
  }

  onQuestionInputChange = (evt) => {
    this.saveTemp('q', '', evt.target.value);
  }

  saveTemp = (key, field, val) => {
    const {ques} = this.props;
    if (key === 'q') {
      ques.text = val;
    } else {
      ques.pos[field] = val;
    }

    this.props.onDataOutput({action: ACTION.TEMP_SAVE, data: ques});
  }

  onQuestionInputBlur = evt => {
    const {quesText} = this.state;
    const {ques} = this.props;
    const text = ques.text;

    if (quesText === text || text.length <= MAX_CHARS_TO_BE_SEARCHED) {
      return;
    }

    this.setState({quesText: text}, () => {
      this.props.onDataOutput({action: ACTION.CHECK_QUES, data: ques});
    });
  }

  hasError = () => {
    const {ques} = this.props;
    const pos = ques.pos;
    return ques.text === '' || pos.length === 0
      || pos.a === '' || pos.b === '' || pos.c === '' || pos.d === '';
  }

  onPosInputChange = p => evt => {
    this.saveTemp('ans', p, evt.target.value);
  }

  newQuestion = (evt) => {
    if (evt.keyCode !== 13) {
      return;
    }
    this.props.onDataOutput({action: ACTION.NEW});
  }

  onCorrectSelect = val => evt => {
    if (val.length === 0) return;

    const {ques} = this.props;
    ques.ans = val;
    this.props.onDataOutput({action: ACTION.TEMP_SAVE, data: ques});
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
            onChange={this.onPosInputChange(name)}
            onKeyUp={this.newQuestion}
          />
          <span className={'icon-l'} onClick={this.pasteFromClipboard(name)}>
            <i className="fa fa-paste"></i>
          </span>
          <span className={`icon-r ${val === ques.ans ? 'checked' : ''}`} onClick={this.onCorrectSelect(val)}>
            <i className="fa fa-check"></i>
          </span>
        </div>
      </div>
    )
  }

  removeQues = evt => {
    const {ques} = this.props;
    this.props.onDataOutput({action: ACTION.REMOVE_QUES, data: ques.id});
  }

  pasteFromClipboard = name => evt => {
    // navigator.clipboard.readText()
    //   .then(text => {
    //     if (name === 'q') {
    //       this.saveQuesChangeIntoState(text)
    //     } else {
    //       this.savePosChangeIntoState(name, text);
    //     }
    //   });
    console.log('not implemented');
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
              <span className={'q-remove-icon'} onClick={this.removeQues}><i className="fa fa-times"
                                                                             aria-hidden="true"></i></span>
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
                <span className={'icon-l'} onClick={this.pasteFromClipboard('q')}><i
                  className="fa fa-paste"></i></span>
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

export default PossibleAnswerAdd;
