import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import injectSaga from 'utils/injectSaga';
import LoadingIndicator from 'components/LoadingIndicator';
import {
  makeSelectLoading,
  makeSelectError, makeSelectSections, makeSelectCategories, makeSelectSelectedCategory, makeSelectCategory,
} from './selectors';
import {
  tempSaveSection,
  goHome,
  loadCategories,
  newSection,
  selectCategory,
  saveSection,
  validateExistedSection, deleteSection, loadCategory
} from './actions';
import saga from './saga';

import './style.scss';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {SECTION_NEW_R, QUESTIONS_VIEW, SECTION_R} from "../../constants/routers";
import {
  ACTION, CONFIRM_ACTION,
  ERROR_MSG,
  LINKS,
  OPTION_FROM_GIVEN,
  OPTION_FROM_GIVEN_TYPE,
  PASSAGE_TYPES,
  PASSAGE_OPTION_FROM_GIVEN,
  PLACE_HOLDER,
  QUESTION_TYPES, PASSAGE_OPTION
} from "../../constants/questions";
import ViewSectionLink from "../../components/ViewSectionLink";
import notify from "../../utils/notify";
import {defaultCatId} from "./constants";
import Error from "../../components/Error";
import {checkExistedInLocal} from "./utils";
import NoData from "../../components/NoData";
import PassageAnswerAdd from "../../components/PassageAnswerAdd";

const _ = require('lodash');

class SectionAddPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasChange: false
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);
    const {catId, childCatId} = this.props.match.params;
    // if (catId) {
    //   this.props.selectCategory(catId);
    this.props.loadCategory(childCatId);
    this.props.newSection();

    // } else {
    //   this.props.selectCategory(defaultCatId);
    // }

    // this.props.loadCategories();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  escFunction = (event) => {
    if (event.keyCode === 27) {
      this.goHome();
    }
  }

  goHome = () => {
    const {catId, childCatId} = this.props.match.params;
    const payload = {parentId: catId, childId: childCatId}
    this.props.goHome(payload);
  }

  tempSaveSection = (sec) => {
    this.props.tempSaveSection(sec);
  }

  saveChange = sec => {
    this.setState({hasChange: true}, () => {
      this.tempSaveSection(sec);
    });
  }

  onOptionChange = sec => evt => {
    const type = evt.target.value;
    sec.questionType = type;
    this.saveChange(sec);
  }

  onInputBlur = sec => evt => {
    if (!this.state.hasChange) return;

    this.setState({hasChange: false});

    const {sections} = this.props;
    if (checkExistedInLocal(sections, sec)) {
      notify(ERROR_MSG.ERR_EXISTED_S);
      return;
    }

    this.props.validateExistedSection(sec);
  }
  onPassageInputChange = sec => evt => {
    sec.passageText = evt.target.value;
    this.saveChange(sec);
  }
  onInputChange = sec => evt => {
    sec.text = evt.target.value;
    this.saveChange(sec);
  }

  pasteFromClipboard = sec => evt => {
    navigator.clipboard.readText()
      .then(text => {
        sec.text = text;
        this.tempSaveSection(sec);
      });
  }

  onKeyUp = sec => evt => {
    if (evt.keyCode !== 13) return;

    this.onOptionFromGivenAdd(sec);
  }

  onValueOptionFromGivenChange = (sec, idx) => evt => {
    if (sec.questionType === PASSAGE_OPTION_FROM_GIVEN) {
      sec.passageOptions[idx] = evt.target.value;
    } else if (sec.questionType === OPTION_FROM_GIVEN) {
      sec.sectionOptions[idx] = evt.target.value;
    }

    this.props.tempSaveSection(sec);
  }

  onOptionFromGivenAdd = (sec) => {
    if (sec.questionType === PASSAGE_OPTION_FROM_GIVEN) {
      sec.passageOptions.push('');
    } else if (sec.questionType === OPTION_FROM_GIVEN) {
      sec.sectionOptions.push('');
    }

    this.props.tempSaveSection(sec);
  }

  renderOptionFromGiven = (sec, op, idx, len) => {
    return (
      <div className={'col-md-3'} key={idx}>
        <div className={'icon-container'}>
          <input
            type={'text'}
            className={'form-control'}
            placeholder={op}
            value={op}
            onKeyUp={this.onKeyUp(sec)}
            onChange={this.onValueOptionFromGivenChange(sec, idx)}
          />
          <span className={'icon-l'}><i className="fa fa-paste"></i></span>
          {idx === len - 1 &&
          <span className={'icon-r'} onClick={e => this.onOptionFromGivenAdd(sec)}>
            <i className="fa fa-plus"></i>
          </span>}
        </div>
      </div>
    );
  }

  onQuestionDataOutput = evt => {
    const {action, data} = evt;
    const {childCatId} = this.props.match.params;
    data.categoryId = childCatId;
    switch (action) {
      case ACTION.TEMP_SAVE:
        this.props.tempSaveSection(data);

        break;
      case ACTION.REMOVE_QUES:
        this.props.removeQuestion({data});
        break;
      case ACTION.CHECK_QUES:
        const {sectionId} = this.state;
        this.props.checkExistedQuestion({data, sectionId});

        break;
    }
  }

  renderInputText = (sec) => {
    return (
      <input
        className={'form-control rounded-0 question-input'}
        placeholder={PLACE_HOLDER.sec}
        onChange={this.onInputChange(sec)}
        onBlur={this.onInputBlur(sec)}
        value={sec.text}/>
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
      const type = sec.questionType;
      const secLen = sec.sectionOptions.length;
      const paLen = sec.passageOptions.length;
      return (
        <div key={idx} className={`${sec.error ? 'q-error' : ''}`}>
          <div className={'row'}>
            <div className={'col-md-9'}>
              <div className="form-group">
                {idx === 0 && <h5>Tên loại câu hỏi</h5>}
                <div className={'icon-container'}>
                  {this.renderInputText(sec)}
                  {/*<span className={'icon-l q-remove-icon'} onClick={e => this.props.deleteSection(sec.id)}>*/}
                  {/*<i className="fa fa-times" aria-hidden="true"></i>*/}
                  {/*</span>*/}
                  {/*<span className={'icon-r'} onClick={this.pasteFromClipboard(sec)}><i*/}
                  {/*className="fa fa-paste"></i></span>*/}
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
          {PASSAGE_TYPES.includes(type) &&
          <PassageAnswerAdd sec={sec} idx={idx}
                            onDataOutput={this.onQuestionDataOutput}/>
          }
          {
            OPTION_FROM_GIVEN === type &&
            <div className={'row q-row'}>
              {sec.sectionOptions.map((sop, sidx) => this.renderOptionFromGiven(sec, sop, sidx, secLen))}
            </div>
          }
        </div>
      );
    });
  }
  //
  // changeCategory = id => evt => {
  //   // this.setState({cat: id}, () => {
  //   this.props.selectCategory(id);
  //   this.props.newSection();
  //   // });
  // }
  //
  // renderCategories = () => {
  //   const {categories, selectedCat} = this.props;
  //   if (!categories) return '';
  //
  //   return categories.map((c, idx) => {
  //     return (
  //       <span className={`btn ${c.id === selectedCat ? 'active-link' : ''}`} key={idx}
  //             onClick={this.changeCategory(c.id)}>{c.catName}</span>
  //     )
  //   });
  // }

  newSection = () => {
    this.props.newSection();
  }

  saveSection = () => {

    // if (cat === defaultCatId) {
    //   notify(ERROR_MSG.ERR_NO_SEC_CHOOSEN);
    //   return;
    // }
    const {sections} = this.props;
    if (sections.length === 0) return;

    const {childCatId} = this.props.match.params;
    this.props.saveSection({sections, catId: childCatId});
  }

  renderCategory = () => {
    const {category} = this.props;
    if (!category) return '';

    return (
      <span>{category.parent.catName}/{category.catName}</span>
    )
  }
  renderSummary = () => {
    const {catId, childCatId} = this.props.match.params;

    return (
      <div className={'row q-container'}>
        <div className={'col-3 col-sm-3 col-md-2 col-lg-2 summary'}>
          <h5 className={'p-t-5'}>
            <span className={'btn m-r-10'} onClick={e => this.goHome()}>&lt;&lt;</span>
            <ViewSectionLink catId={catId} childCatId={childCatId}/>
          </h5>
        </div>
        <div className={'col-8 col-sm-6 col-md-6 col-lg-7 summary'}>
          <h5 className={'p-t-5'}>
            {/*{this.renderCategories()}*/}
            {this.renderCategory()}
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
  newSection: () => dispatch(newSection()),
  saveSection: (payload) => dispatch(saveSection(payload)),
  tempSaveSection: (payload) => dispatch(tempSaveSection(payload)),
  loadCategory: (payload) => dispatch(loadCategory(payload)),
  selectCategory: (payload) => dispatch(selectCategory(payload)),
  validateExistedSection: (payload) => dispatch(validateExistedSection(payload)),
  goHome: (payload) => dispatch(goHome(payload)),
});

const mapStateToProps = createStructuredSelector({
  sections: makeSelectSections(),
  categories: makeSelectCategories(),
  category: makeSelectCategory(),
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
