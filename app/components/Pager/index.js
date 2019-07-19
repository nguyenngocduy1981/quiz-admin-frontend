import React from 'react';
import './style.scss';

const _ = require('lodash');

class Pager extends React.Component {
  constructor(props) {
    super(props);
  }

  onChange = p => evt => {
    this.props.onChange(p);
  }

  renderPageItem = () => {
    const {pageCount, current} = this.props;
    return _.range(1, pageCount + 1).map(v => {
      return <li className={'page-item'} key={v}>
        <span className={`p page-link ${current === v ? 'active' : ''}`}
              onClick={this.onChange(v)}>
          {v}
        </span>
      </li>
    });
  }

  render() {
    const {pageCount} = this.props;
    if (pageCount === 0) return '';

    return (
      <ul className="pagination">
        <li className={'page-item'}>
          <span className={'p page-link'} onClick={this.onChange(1)}>&lt;&lt;</span>
        </li>
        {this.renderPageItem()}
        <li className={'page-item'}>
          <span className={'p page-link'} onClick={this.onChange(pageCount)}>&gt;&gt;</span>
        </li>
      </ul>
    );
  }
}


export default Pager;
