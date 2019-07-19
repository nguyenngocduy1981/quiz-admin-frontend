import React from 'react';
import './style.scss';

const noOfItemInPage = 10;

class SubCategoriesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
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
      <div key={idx}
            className={`item col-md-2 ${this.isActive(current, c.id) ? 'active' : ''}`}
            onClick={this.onChange(c.id)}>{c.catName}</div>
    )
  }

  render() {
    const {categories} = this.props;
    if (!categories) return '';

    return (
      <div className={'row'}>
        {categories.map(this.renderCategory)}
      </div>
    );
  }
}

export default SubCategoriesView;
