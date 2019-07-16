import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectLoading,
  makeSelectError, makeSelectCategories, makeSelectSelectedCat, makeSelectChildCategories, makeSelectNewCatName
} from './selectors';
import {
  goHome, loadCategories, loadChildCategories, saveNewChild, saveTempNewCategory
} from './actions';
import saga from './saga';

import './style.scss';
import {Helmet} from 'react-helmet';
import {
  CONFIRM_ACTION, ENTER_KEY, LINKS, VELOCITY
} from '../../constants/questions';
import ConfirmModal from '../../components/ConfirmModal';
import {Link} from 'react-router-dom';
import {SECTION_R} from '../../constants/routers';

const _ = require('lodash');
const $ = require('jquery');

const CONFIRM_MODAL_ID = 'confirmModal';

class CategoryViewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actionShown: false,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);

    const {id} = this.props.match.params;
    if (id) {
      this.props.loadChildCategories(id);
    }

    this.props.loadCategories(id); // after load parent, load children as well
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  escFunction = (event) => {
    if (event.keyCode === 27 && !this.state.actionShown) {
      this.props.goHome();
    }
  }

  onNewCategoryChange = (evt) => {
    this.props.saveTempNewCategory(evt.target.value);
  }

  onNewCategorySave = (evt) => {
    if (evt.keyCode === ENTER_KEY) {
      const {id} = this.props.match.params;
      this.props.saveNewChild({id, category: this.props.newCatName});
    }
  }

  viewChildren = (id) => (evt) => {
    this.props.loadChildCategories(id);
  }

  renderCategory = (cat, idx) => {
    const {selectedCat} = this.props;
    const isActive = `${cat.id}` === `${selectedCat}`;
    return (
      <li
        className={`list-group-item cat-item ${isActive ? 'active-link' : ''}`}
        key={idx}
        onClick={this.viewChildren(cat.id)}>
        <span>{cat.catName}</span>
      </li>
    );
  }
  renderChildCategory = (cat, idx) => {
    const {id} = this.props.match.params;
    return (
      <li
        className={'list-group-item'}
        key={idx}>
        <Link className="m-l-10 router-link" to={`${SECTION_R}/${id}/${cat.id}`}>
          {cat.catName}
        </Link>
      </li>
    );
  }

  renderChildCategories = () => {
    const {childCategories} = this.props;
    if (!childCategories) return '';

    return (
      <ul className="list-group">
        {childCategories.map(this.renderChildCategory)}
      </ul>
    );
  }

  renderCategories = () => {
    const {categories} = this.props;
    if (!categories) return '';

    return (
      <ul className="list-group">
        {categories.map(this.renderCategory)}
      </ul>
    );
  }

  renderSummary = () => (
    <div className={'summary'}>
      <div className={'col-8 col-sm-6 col-md-6 col-lg-7 summary'}>
        <h5 className={'p-t-5'}>
          <span className={'btn'} onClick={this.props.goHome}>&lt;&lt;</span>
        </h5>
      </div>
    </div>
  )

  render() {
    const {newCatName} = this.props;
    return (
      <article>
        <Helmet>
          <title>CategoryViewPage</title>
        </Helmet>
        <div className="category-view-page">
          {this.renderSummary()}
          <div className={'row'}>
            <div className={'col-md-2'}>
              {this.renderCategories()}
            </div>
            <div className={'col-md-10'}>
              <input
                type={'text'}
                className={'form-control'}
                value={newCatName}
                placeholder={LINKS.them_sec}
                onChange={this.onNewCategoryChange}
                onKeyUp={this.onNewCategorySave}
              />
              {this.renderChildCategories()}
            </div>
          </div>
        </div>
      </article>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadCategories: (payload) => dispatch(loadCategories(payload)),
  loadChildCategories: (payload) => dispatch(loadChildCategories(payload)),
  saveNewChild: (payload) => dispatch(saveNewChild(payload)),
  saveTempNewCategory: (payload) => dispatch(saveTempNewCategory(payload)),
  goHome: () => dispatch(goHome()),
});

const mapStateToProps = createStructuredSelector({
  categories: makeSelectCategories(),
  childCategories: makeSelectChildCategories(),
  selectedCat: makeSelectSelectedCat(),
  newCatName: makeSelectNewCatName(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({
  key: 'category-view-page',
  saga,
});

export default compose(
  withSaga,
  withConnect,
)(CategoryViewPage);
