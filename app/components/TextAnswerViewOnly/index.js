import React from 'react';
import {PASSAGE_OPTION_FROM_GIVEN, PLACE_HOLDER} from "../../constants/questions";

class TextAnswerViewOnly extends React.Component {
  constructor(props) {
    super(props);
  }

  renderPASSAGE_OPTION_FROM_GIVEN() {
    const {ques, onClick} = this.props;
    return (
      <div className={'q-container'}>
        <div className={'row q-row'}>
          <div className={'col-md-12'}>
            <span className={'ques'} dangerouslySetInnerHTML={{__html: ques.text}}
                  title={`${PLACE_HOLDER.ans2}${ques.answered}`}
                  onClick={e => onClick ? onClick(ques.id) : ''}/>
            {ques.correct && this.renderCorrect()}
            {!ques.correct && this.renderInCorrect()}
            <span>)&nbsp;{ques.answer}</span>
          </div>
        </div>
      </div>
    );
  }

  renderCorrect = () => {
    const {preview} = this.props;
    if (preview) return '';

    return (
      <i className="fa fa-check tick"></i>
    )
  }
  renderInCorrect = () => {
    return (
      <i className="fa fa-remove incorrect"></i>
    )
  }

  render() {
    const {ques, idx, onClick, preview} = this.props;
    const {type, answer, answered} = ques;
    const isCorrect = ques.correct;

    if (type === PASSAGE_OPTION_FROM_GIVEN) return this.renderPASSAGE_OPTION_FROM_GIVEN();

    return (
      <div className={'q-container'}>
        <div className={'row q-row'}>
          <div className={'col-md-12'}>
            {idx}) <span className={'ques'} dangerouslySetInnerHTML={{__html: ques.text}}
                         title={`${PLACE_HOLDER.ans2}${ques.answered}`}
                         onClick={e => onClick ? onClick(ques.id) : ''}/>
            {isCorrect && this.renderCorrect()}
            {!isCorrect && this.renderInCorrect()}
          </div>
        </div>
        <div className={'row q-row'}>
          {preview && <div className={'col-md-12'}><span className={'m-l-15'}>{answer}</span></div>}
          {!preview &&
          <div className={'col-md-12'}>
            <div className={'exam-view-result'}><b>{PLACE_HOLDER.ans}:</b>
              <span className={'m-l-15'}>{answer}</span>
            </div>
            <div className={'exam-view-result'}><b>{PLACE_HOLDER.result}:</b>
              <span className={`m-l-15 ${isCorrect ? 'correct' : 'wrong'}`}>{answered}</span>
            </div>
          </div>
          }
        </div>
      </div>
    );
  }
}

export default TextAnswerViewOnly;
