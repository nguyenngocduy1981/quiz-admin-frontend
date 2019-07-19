import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import injectSaga from 'utils/injectSaga';
import LoadingIndicator from 'components/LoadingIndicator';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectSections,
  makeSelectCategories,
  makeSelectSelectedCat,
  makeSelectExam,
  makeSelectChildCategories, makeSelectSelectedChildCat, makeSelectToggleChildCategories,
} from './selectors';
import {
  cancelExam,
  createExam,
  deleteSection,
  goHome,
  loadCategories,
  loadChildCategories,
  loadExamFromLocalStorage,
  loadSections,
  resetSections,
  toggleSection,
} from './actions';
import saga from './saga';

import './style.scss';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {QUESTIONS_NEW, SECTION_NEW_R, QUESTIONS_VIEW, EXAM_PREVIEW} from '../../constants/routers';
import {CONFIRM_ACTION, LINKS, VELOCITY} from '../../constants/questions';
import Error from '../../components/Error';
import ConfirmModal from '../../components/ConfirmModal';
import {countQuesInExam, getExam} from "../../utils/local-storage";
import {defaultCatId} from "../SectionAddPage/constants";
import NoData from "../../components/NoData";
import SubCategoriesView from "../../components/SubCategoriesView";

const _ = require('lodash');
const $ = require('jquery');

const CONFIRM_MODAL_ID = 'confirmModal';
const ACTIONS_ID = 'actions-pop';

class SectionViewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actionShown: false,
      sectionId4Delete: -1
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);

    $(`#${ACTIONS_ID}`).hide();

    const {catId, childCatId} = this.props.match.params;
    // if (catId) {
    //   this.loadSections(catId);
    // } else {

    // }

    if (catId && childCatId) {
      const payload = {parentId: catId, childId: childCatId};
      this.props.loadCategories(payload);
    } else {
      // this.props.resetSections();
      this.props.loadCategories();
    }
    this.props.loadExamFromLocalStorage();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  escFunction = (event) => {
    if (event.keyCode === 27) {
      if (!this.state.actionShown) {
        this.props.goHome();
      } else {
        this.saveStateAndHideAction();
      }
    }
  }

  selectSection = (sec) => (evt) => {
    this.setState({id: sec.id});
  }

  renderSection = (sec, idx) => {
    const quesListInExam = this.props.exam[sec.id];
    const lenInExam = quesListInExam ? quesListInExam.length : 0;
    const {catId, childCatId} = this.props.match.params;
    return (
      <tr
        key={`sec_${idx}`}
        onClick={this.selectSection(sec)}
        className={`${childCatId === sec.id ? 'active' : ''}`}
      >
        <td>{sec.id}</td>
        <td>
          <span dangerouslySetInnerHTML={{__html: sec.text}}/>
          <span className={'m-l-10 badge badge-secondary'}>{sec.questionCount}</span>
        </td>
        <td>{sec.questionType}</td>
        <td className={'action'}>
        <span className={'q-remove-icon'} onClick={this.confirmDelete(sec.id)} title={LINKS.xoa_dm}>
          <i className="fa fa-times hover" aria-hidden="true"></i>
        </span>
          {/*<Link className="router-link m-r-5" to={`${QUESTIONS_VIEW}/${sec.id}`} title={LINKS.chi_tiet_q}>*/}
          {/*<i className="fa fa-bars" aria-hidden="true"></i>*/}
          {/*</Link>*/}
          <Link className="router-link m-r-5" to={`${QUESTIONS_VIEW}/${sec.id}/${catId}/${childCatId}`}
                title={LINKS.chi_tiet_q}>
            <i className="fa fa-bars" aria-hidden="true"></i>
          </Link>
          <Link className="router-link m-l-5" to={`${QUESTIONS_NEW}/${sec.id}/${catId}/${childCatId}`}
                title={LINKS.them_q}>
            <i className="fa fa-question-circle" aria-hidden="true"></i>
          </Link>
          <span className={'m-l-10 m-r-10 badge badge-secondary'}
                title={`${lenInExam} câu hỏi trong bài thi`}>{lenInExam}</span>
        </td>
      </tr>
    )
  }

  isActive = (id, selectedCat) => {
    return `${id}` === `${selectedCat}`;
  }

  viewChildren = (id) => (evt) => {
    const payload = {parentId: id, isNavigate: true}
    this.props.loadChildCategories(payload);
  }

  renderCategories = () => {
    const {categories, selectedCat} = this.props;
    if (!categories) return '';

    return categories.map((c, idx) => (
      <span
        className={`btn ${this.isActive(c.id, selectedCat) ? 'active-link' : ''}`}
        key={idx}
        onClick={this.viewChildren(c.id)}
      >{c.catName}
      </span>
    ));
  }

  saveStateAndHideAction = () => {
    this.setState({actionShown: false}, () => {
      this.hideAction();
    });
  }

  hideAction = () => {
    $(`#${ACTIONS_ID}`).hide();
  }

  toggleActions = evt => {
    const actionShown = !this.state.actionShown
    this.setState({actionShown}, () => {
      if (actionShown) {
        $(`#${ACTIONS_ID}`).fadeIn('slow');
      } else {
        this.hideAction();
      }
    });
  }

  cancelExam = () => {
    this.props.cancelExam();
    this.saveStateAndHideAction();
  }

  createExam = () => {
    this.props.createExam();
  }

  showQuesInExamCount = () => {
    return `${countQuesInExam()} câu hỏi trong bài thi`;
  }

  loadSections = (parentId, childId) => {
    const payload = {parentId, childId};
    this.props.loadSections(payload);
  }
  onChildCategoryChange = id => {
    const {catId} = this.props.match.params;
    this.loadSections(catId, id);
  }
  renderSections = () => {
    const {
      loading, error, sections,
    } = this.props;

    if (loading) {
      return <LoadingIndicator/>;
    }
    if (error) {
      return <Error/>;
    }
    if (!sections) {
      return (<NoData/>);
    }

    return (
      <table className={'table table-hover'}>
        <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Type</th>
          <th>{this.showQuesInExamCount()}</th>
        </tr>
        </thead>
        <tbody>{sections.map(this.renderSection)}</tbody>
      </table>
    );
  }

  toggleChildren = evt => {
    this.props.toggleSection();
  }

  renderFullActionList = () => {

  }
  renderActions = () => {
    const {exam} = this.props;
    const keys = Object.keys(exam);
    const len = keys.length === 0 ? 0 : keys.map(k => exam[k].length).reduce((a, b) => a + b);

    // const catId = this.state.catId;
    let {catId, childCatId} = this.props.match.params;
    catId = catId === undefined ? defaultCatId : catId;
    return (
      <div id={ACTIONS_ID}>
        {len > 0 && this.renderFullActionList()}
        <ul className="list-group">
          {len > 0 &&
          <li className="list-group-item">
            {
              catId === defaultCatId &&
              <Link className="router-link" to={EXAM_PREVIEW}>{LINKS.preview_exam}</Link>
            }
            {
              catId !== defaultCatId &&
              <Link className="router-link" to={`${EXAM_PREVIEW}/${catId}`}>{LINKS.preview_exam}</Link>
            }
          </li>
          }
          {len > 0 &&
          <li className="list-group-item">
            <span onClick={this.cancelExam}>{LINKS.cancel_exam}</span>
          </li>
          }
          {len > 0 &&
          <li className="list-group-item">
            <span onClick={this.createExam}>{LINKS.create_exam}</span>
            <span className={'m-l-10 m-r-10 badge badge-secondary'}>{len}</span>
          </li>
          }
          {childCatId &&
          <li className="list-group-item">
            <Link className="router-link" to={`${SECTION_NEW_R}/${catId}/${childCatId}`}>{LINKS.them_sec}</Link>
          </li>
          }
        </ul>
      </div>
    )
  }
  renderSummary = () => {
    return (
      <div className={'summary'}>
        <div className={'col-8 col-sm-6 col-md-6 col-lg-7 summary'}>
          <h5 className={'p-t-5'}>
            <span className={'btn'} onClick={this.props.goHome}>&lt;&lt;</span>
          </h5>
          <h5 className={'p-t-5'}>
            {this.renderCategories()}
            <span className={'btn'}
                  onClick={this.toggleChildren}
            >Ẩn/Hiện</span>
          </h5>
        </div>
        <div className={'col-4 col-sm-6 col-md-6 col-lg-5  actions'}>
          <span className="main btn" onClick={this.toggleActions}>
            <i className="fa fa-align-justify"></i>
          </span>
          {this.renderActions()}
        </div>
      </div>
    )
  }

  confirmDelete = sectionId4Delete => evt => {
    this.setState({sectionId4Delete, actionShown: true}, () => {
      $(`#${CONFIRM_MODAL_ID}`).fadeIn(VELOCITY);
    });
  }

  onModalConfirm = (action) => {
    if (action === CONFIRM_ACTION.YES) {
      this.props.deleteSection(this.state.sectionId4Delete);
    }
    $(`#${CONFIRM_MODAL_ID}`).fadeOut(VELOCITY);
  }

  render() {
    const {toggleChildCategories, childCategories, selectedChildCat} = this.props;
    return (
      <article>
        <Helmet>
          <title>SectionViewPage</title>
        </Helmet>
        <div className="section-view-page">
          {this.renderSummary()}
          {toggleChildCategories &&
          <SubCategoriesView categories={childCategories}
                             current={selectedChildCat}
                             onChange={this.onChildCategoryChange}/>
          }
          {this.renderSections()}
          <ConfirmModal id={CONFIRM_MODAL_ID} onConfirm={this.onModalConfirm}/>
        </div>
      </article>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadExamFromLocalStorage: () => dispatch(loadExamFromLocalStorage()),
  loadCategories: (payload) => dispatch(loadCategories(payload)),
  loadChildCategories: (payload) => dispatch(loadChildCategories(payload)),
  loadSections: (payload) => dispatch(loadSections(payload)),
  toggleSection: () => dispatch(toggleSection()),
  resetSections: (payload) => dispatch(resetSections(payload)),
  deleteSection: (payload) => dispatch(deleteSection(payload)),
  cancelExam: () => dispatch(cancelExam()),
  createExam: () => dispatch(createExam()),
  goHome: () => dispatch(goHome()),
});

const mapStateToProps = createStructuredSelector({
  toggleChildCategories: makeSelectToggleChildCategories(),
  categories: makeSelectCategories(),
  childCategories: makeSelectChildCategories(),
  sections: makeSelectSections(),
  selectedCat: makeSelectSelectedCat(),
  selectedChildCat: makeSelectSelectedChildCat(),
  exam: makeSelectExam(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({
  key: 'section-view-page',
  saga,
});

export default compose(
  withSaga,
  withConnect,
)(SectionViewPage);
