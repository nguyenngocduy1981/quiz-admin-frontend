import React from 'react';
import {ABC_LIST} from "../../constants/questions";

class PossibleAnswerViewOnly extends React.Component {
  constructor(props) {
    super(props);
  }

  renderPos = (p, idx) => {
    return (
      <div key={idx} className={'col-md-3'}>
        <span className={'m-l-15'}>{ABC_LIST[idx]}</span><span>{p}</span>
      </div>
    );
  }

  render() {
    const {idx, ques} = this.props;
    return (
      <div className={'q-container'}>
        <div className={'row q-row'}>
          <div className={'col-md-12'}>
            <span dangerouslySetInnerHTML={{__html: ques.text}}/>
          </div>
        </div>
        <div className={'row q-row'}>
          {ques.possibleAnswers.map(this.renderPos)}
        </div>
      </div>
    );
  }
}

export default PossibleAnswerViewOnly;
