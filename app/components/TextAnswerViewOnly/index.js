import React from 'react';

class TextAnswerViewOnly extends React.Component {
  constructor(props) {
    super(props);
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
          <div className={'col-md-12'}>
            <span className={'m-l-15'}>{ques.answer}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default TextAnswerViewOnly;
