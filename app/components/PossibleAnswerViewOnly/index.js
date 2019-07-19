import React from 'react';
import {ABC_LIST, PASSAGE_OPTION, PLACE_HOLDER} from "../../constants/questions";

class PossibleAnswerViewOnly extends React.Component {
  constructor(props) {
    super(props);
  }

  renderCorrect = () => {
    const {preview} = this.props;
    if (preview) return '';
    return (
      <i className="fa fa-check tick"></i>
    )
  }
  renderInCorrect = () => {
    const {preview} = this.props;
    if (preview) return '';
    return (
      <i className="fa fa-remove incorrect"></i>
    )
  }
  renderPASSAGE_OPTIONPos = (answer, p, idx) => {
    return (
      <span key={idx} className={`col-md-3 ${answer === p ? 'correct' : ''}`}>
        {ABC_LIST[idx]} {p}
      </span>
    );
  }

  renderPASSAGE_OPTION = () => {
    const {ques, onClick} = this.props;
    const {answer} = ques;
    return (
      <div className={'q-container'}>
        <div className={'row q-row'}>
          <div className={'col-md-12 ques'} title={`${PLACE_HOLDER.ans2}${ques.answered}`}
               onClick={e => onClick ? onClick(ques.id) : ''}>
            <span dangerouslySetInnerHTML={{__html: ques.text}}/>
            {ques.correct && this.renderCorrect()}
            {!ques.correct && this.renderInCorrect()}
            {ques.possibleAnswers.map((p, idx) => this.renderPASSAGE_OPTIONPos(answer, p, idx))}
          </div>
        </div>
      </div>
    );
  }
  renderPos = (answered, answer, p, idx) => {
    const isCorrect = answer === p ? 'correct' : '';
    const isInCorrect = answer !== answered && answered === p ? 'wrong' : '';
    return (
      <div key={idx} className={`col-md-2 ${isCorrect} ${isInCorrect}`}>
        <span className={'m-l-15'}>{ABC_LIST[idx]}</span><span>{p}</span>
      </div>
    );
  }

  render() {
    const {ques, idx, onClick} = this.props;
    const {type, answer, answered, possibleAnswers} = ques;
    const isCorrect = ques.correct;
    if (type === PASSAGE_OPTION) return this.renderPASSAGE_OPTION();

    return (
      <div className={'q-container'}>
        <div className={'row q-row'}>
          <div className={'col-md-12'}>
            {idx}&nbsp;<span className={'ques'} dangerouslySetInnerHTML={{__html: ques.text}}
                             title={`${PLACE_HOLDER.ans2}${ques.answered}`}
                             onClick={e => onClick ? onClick(ques.id) : ''}/>
            {isCorrect && this.renderCorrect()}
            {!isCorrect && this.renderInCorrect()}
          </div>
        </div>
        <div className={'row q-row'}>
          {possibleAnswers.map((p, idx) => this.renderPos(answered, answer, p, idx))}
        </div>
      </div>
    );
  }
}

export default PossibleAnswerViewOnly;
