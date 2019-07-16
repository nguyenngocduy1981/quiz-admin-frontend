import React from 'react';
import './style.scss';

class PassageAnswerViewOnly extends React.Component {
  constructor(props) {
    super(props);
  }

  renderPassage = (ques, pa, idx) => {
    return (
      <div className={'col-md-2'} key={idx}>
        <span>({pa.questionNo})</span>
        <span>{pa.answer}</span>
      </div>
    );
  }

  render() {
    const {ques, idx} = this.props;
    const {passages} = ques;
    return (
      <div className={`q-container ${ques.error ? 'q-error' : ''}`}>
        <div className={'row q-row'}>
          <div className={'col-md-12'}>
            <div className={'passage'} dangerouslySetInnerHTML={{__html: ques.text}}/>
          </div>
        </div>
        <div className={'row q-row'}>
          {passages.map((pa, pa_idx) => this.renderPassage(ques, pa, pa_idx))}
        </div>
      </div>
    );
  }
}

export default PassageAnswerViewOnly;


