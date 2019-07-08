import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import injectSaga from 'utils/injectSaga';
import LoadingIndicator from 'components/LoadingIndicator';
import {
  makeSelectLoading,
  makeSelectError, makeSelectSections, makeSelectCategories, makeSelectSelectedCategory,
} from './selectors';
import {
  tempSaveSection,
  goHome,
  loadCategories,
  newSection,
  selectCategory,
  saveSection,
  validateExistedSection, deleteSection
} from './actions';
import saga from './saga';

import './style.scss';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {SECTION_NEW_R, QUESTIONS_VIEW, SECTION_R} from "../../constants/routers";
import {ACTION, ERROR_MSG, LINKS, OPTION_FROM_GIVEN, PLACE_HOLDER, QUESTION_TYPES} from "../../constants/questions";
import ViewSectionLink from "../../components/ViewSectionLink";
import notify from "../../utils/notify";
import {defaultCatId} from "./constants";
import Error from "../../components/Error";
import {checkExistedInLocal} from "./utils";
import NoData from "../../components/NoData";

const _ = require('lodash');

class SectionAddPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cat: defaultCatId
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);
    const {cat} = this.props.match.params;
    if (cat) {
      this.setState({cat});
      this.props.selectCategory(cat);
      this.props.newSection();
    } else {
      this.props.selectCategory(defaultCatId);
    }

    this.props.loadCategories();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  escFunction = (event) => {
    if (event.keyCode === 27) {
      this.props.goHome();
    }
  }

  tempSaveSection = (sec) => {
    this.props.tempSaveSection(sec);
  }

  onOptionChange = sec => evt => {
    sec.questionType = evt.target.value;
    this.tempSaveSection(sec);
  }

  onInputBlur = sec => evt => {
    const {sections} = this.props;
    if (checkExistedInLocal(sections, sec)) {
      notify(ERROR_MSG.ERR_EXISTED_S);
      return;
    }

    this.props.validateExistedSection(sec);
  }
  onInputChange = sec => evt => {
    sec.text = evt.target.value;
    this.tempSaveSection(sec);
  }

  pasteFromClipboard = sec => evt => {
    navigator.clipboard.readText()
      .then(text => {
        sec.text = text;
        this.tempSaveSection(sec);
      });
  }

  onValueOptionFromGivenChange = (sec, idx) => evt => {
    sec.options[idx] = evt.target.value;
    this.props.tempSaveSection(sec);
  }

  onOptionFromGivenAdd = (sec) => {
    sec.options.push('')
    this.props.tempSaveSection(sec);
  }
  renderOptionFromGiven = (sec, op, idx, secLen) => {
    return (
      <div className={'col-md-3'} key={idx}>
        <div className={'icon-container'}>
          <input
            type={'text'}
            className={'form-control'}
            placeholder={op}
            value={op}
            onChange={this.onValueOptionFromGivenChange(sec, idx)}
          />
          <span className={'icon-l'}><i className="fa fa-paste"></i></span>
          {idx === secLen - 1 &&
          <span className={'icon-r'} onClick={e => this.onOptionFromGivenAdd(sec)}>
            <i className="fa fa-plus"></i>
          </span>}
        </div>
      </div>
    );
  }

  renderSections = () => {
    const {
      loading, error, sections
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

    return sections.map((sec, idx) => {
      const secLen = sec.options.length;
      return (
        <div key={idx} className={`${sec.error ? 'q-error' : ''}`}>
          <div className={'row'}>
            <div className={'col-md-9'}>
              <div className="form-group">
                {idx === 0 && <h5>Tên loại câu hỏi</h5>}
                <div className={'icon-container'}>
                  <input
                    className={'form-control rounded-0 question-input'}
                    placeholder={PLACE_HOLDER.sec}
                    onChange={this.onInputChange(sec)}
                    onBlur={this.onInputBlur(sec)}
                    value={sec.text}/>
                  <span className={'icon-l q-remove-icon'} onClick={e => this.props.deleteSection(sec.id)}>
                <i className="fa fa-times" aria-hidden="true"></i>
              </span>
                  <span className={'icon-r'} onClick={this.pasteFromClipboard(sec)}><i
                    className="fa fa-paste"></i></span>
                </div>
              </div>
            </div>
            <div className={'col-md-3'}>
              <div className="form-group">
                {idx === 0 && <h5>Thể loại</h5>}
                <select className={'form-control question-input'}
                        onChange={this.onOptionChange(sec)}
                        defaultValue={sec.questionType}>
                  {QUESTION_TYPES.map((t, tidx) => <option key={tidx}>{t}</option>)}
                </select>
              </div>
            </div>
          </div>
          {
            sec.questionType === OPTION_FROM_GIVEN &&
            <div className={'row q-row'}>
              {sec.options.map((op, idx) => this.renderOptionFromGiven(sec, op, idx, secLen))}
            </div>
          }
        </div>
      );
    });
  }

  changeCategory = id => evt => {
    this.setState({cat: id}, () => {
      this.props.selectCategory(id);
      this.props.newSection();
    });
  }

  renderCategories = () => {
    const {categories, selectedCat} = this.props;
    if (!categories) return '';

    return categories.map((c, idx) => {
      return (
        <span className={`btn ${c.id === selectedCat ? 'active-link' : ''}`} key={idx}
              onClick={this.changeCategory(c.id)}>{c.catName}</span>
      )
    });
  }

  newSection = () => {
    if (this.state.cat === defaultCatId) {
      notify(ERROR_MSG.ERR_NO_SEC_CHOOSEN);
      return;
    }
    this.props.newSection();
  }

  saveSection = () => {
    const {cat} = this.state;
    if (cat === defaultCatId) {
      notify(ERROR_MSG.ERR_NO_SEC_CHOOSEN);
      return;
    }
    const {sections} = this.props;
    if (sections.length === 0) return;

    this.props.saveSection({sections, cat});
  }

  renderSummary = () => {
    return (
      <div className={'row q-container'}>
        <div className={'col-3 col-sm-3 col-md-2 col-lg-2 summary'}>
          <h5 className={'p-t-5'}>
            <span className={'btn m-r-10'} onClick={this.props.goHome}>&lt;&lt;</span>
            <ViewSectionLink catId={this.state.cat}/>
          </h5>
        </div>
        <div className={'col-8 col-sm-6 col-md-6 col-lg-7 summary'}>
          <h5 className={'p-t-5'}>
            {this.renderCategories()}
          </h5>
        </div>
        <div className={'col-1 col-sm-3 col-md-4 col-lg-3 summary'}>
          <h5 className={'p-t-5'}>
            <span className={'btn'} onClick={this.newSection}>{LINKS.them_moi}</span>
            <span className={'btn'} onClick={this.saveSection}>&nbsp;&nbsp;{LINKS.luu}&nbsp;&nbsp;</span>
          </h5>
        </div>
      </div>
    );
  }

  render() {
    return (
      <article>
        <Helmet>
          <title>SectionAddPage</title>
        </Helmet>
        <div className="section-add-page">
          {this.renderSummary()}
          {this.renderSections()}
        </div>
      </article>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadCategories: () => dispatch(loadCategories()),
  deleteSection: (payload) => dispatch(deleteSection(payload)),
  newSection: (payload) => dispatch(newSection(payload)),
  saveSection: (payload) => dispatch(saveSection(payload)),
  tempSaveSection: (payload) => dispatch(tempSaveSection(payload)),
  selectCategory: (payload) => dispatch(selectCategory(payload)),
  validateExistedSection: (payload) => dispatch(validateExistedSection(payload)),
  goHome: () => dispatch(goHome()),
});

const mapStateToProps = createStructuredSelector({
  sections: makeSelectSections(),
  categories: makeSelectCategories(),
  selectedCat: makeSelectSelectedCategory(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({
  key: 'section-add-page',
  saga,
});

export default compose(
  withSaga,
  withConnect,
)(SectionAddPage);
