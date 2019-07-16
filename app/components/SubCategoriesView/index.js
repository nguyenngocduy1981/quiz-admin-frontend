import React from 'react';
import './style.scss';

class SubCategoriesView extends React.Component {
  constructor(props) {
    super(props);
  }

  onChange = id => evt => {
    this.props.onChange(id);
  }

  isActive = (id, selectedCat) => {
    return `${id}` === `${selectedCat}`;
  }

  renderCategory = (c, idx) => {
    const {current} = this.props;
    return (
      <span key={idx}
            className={`${this.isActive(current, c.id) ? 'active' : ''}`}
            onClick={this.onChange(c.id)}>{c.catName}</span>
    )
  }

  render() {
    const {categories} = this.props;
    if (!categories) return '';

    return (
      <div className={'row hehehe'}>
        {categories.map(this.renderCategory)}
      </div>
    );
  }
}

export default SubCategoriesView;
