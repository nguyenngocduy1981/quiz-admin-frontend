import React from 'react';
import {ACTION, MAX_CHARS_TO_BE_SEARCHED, PLACE_HOLDER} from "../../constants/questions";

class TextAnswerAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quesText: ''
    }
  }

  newQuestion = (evt) => {
    if (evt.keyCode !== 13) {
      return;
    }
    this.props.onDataOutput({action: ACTION.NEW});
  }
  saveTemp = (key, val) => {
    const {ques} = this.props;
    if (key === 'q') {
      ques.text = val;
    } else {
      ques.ans = val;
    }

    this.props.onDataOutput({action: ACTION.TEMP_SAVE, data: ques});
  }

  removeQues = ques => {
    this.props.onDataOutput({action: ACTION.REMOVE_QUES, data: ques.id});
  }

  pasteFromClipboard = q => evt => {
    navigator.clipboard.readText()
      .then(text => this.saveTemp(q, text));
  }

  onInputChange = key => evt => {
    this.saveTemp(key, evt.target.value);
  }

  onInputBlur = evt => {
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

  render() {
    const {ques} = this.props;
    if (!ques) return '';

    const {text, ans} = ques;
    const {idx} = this.props;
    return (
      <div className={`q-container ${ques.error ? 'q-error' : ''}`}>
        <div className={'row q-row'}>
          <div className={'col-md-6'}>
            <div className="form-group">
              <label className={'clipboard'}><h4> Câu hỏi {idx}</h4></label>
              <div className={'icon-container'}>
                <input
                  type={'text'}
                  className={'form-control question-input'}
                  placeholder={PLACE_HOLDER.q}
                  value={text}
                  onChange={this.onInputChange('q')}
                  onBlur={this.onInputBlur}
                  onKeyUp={this.newQuestion}
                />
                <span className={'q-remove-icon icon-l'} onClick={e => this.removeQues(ques)}>
                <i className="fa fa-times" aria-hidden="true"></i></span>

                <span className={'icon-r'} onClick={this.pasteFromClipboard('q')}><i
                  className="fa fa-paste"></i></span>
              </div>
            </div>
          </div>
          <div className={'col-md-6'}>
            <div className="form-group">
              <label className={'clipboard'}><h4>Câu trả lời</h4></label>
              <div className={'icon-container'}>
                <input
                  type={'text'}
                  className={'form-control'}
                  placeholder={PLACE_HOLDER.ans}
                  value={ans}
                  onChange={this.onInputChange('a')}
                  onKeyUp={this.newQuestion}
                />
                <span className={'icon-l'} onClick={this.pasteFromClipboard('a')}><i
                  className="fa fa-paste"></i></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TextAnswerAdd;
