import React from 'react';
import {OPTION_FROM_GIVEN} from '../../constants/questions';

const _ = require('lodash');

class SectionView extends React.Component {
  constructor(props) {
    super(props);
  }

  onOptionClick = (op) => (evt) => {
    document.execCommand('copy');
  }

  renderOption = (op, idx) => (
    <span key={idx} className={'sec-option'} onDoubleClick={this.onOptionClick(op)}>{op}</span>
  )

  render() {
    const {section, requiredPickFromGiven, onRequiredPickFromGivenChange} = this.props;

    const type = section.questionType;
    if (type !== OPTION_FROM_GIVEN) return '';

    if (section.options.length === 0) return (<h5>Error, no option for OPTION_FROM_GIVEN</h5>);

    return (
      <div className={'row q-container'}>
        <div className={'col-md-12'}>
          <div className={'sec-options'}>
            <span title={'Câu trả lời từ danh sách này'} className={'ck-inline'}>
              <input className={'form-control'} type={'checkbox'}
                     value={requiredPickFromGiven} checked={requiredPickFromGiven}
                     onChange={onRequiredPickFromGivenChange}
              />
            </span>

            {section.options.map(this.renderOption)}
          </div>
        </div>
      </div>
    );
  }
}

export default SectionView;
