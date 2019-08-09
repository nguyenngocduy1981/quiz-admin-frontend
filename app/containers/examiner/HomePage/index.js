import React from 'react';
import './style.scss';
import {Helmet} from 'react-helmet';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {compose} from 'redux';
import injectSaga from 'utils/injectSaga';
import LoadingIndicator from 'components/LoadingIndicator';
import Error from 'components/Error';
import {Link} from 'react-router-dom';
import {makeSelectError, makeSelectExamList, makeSelectLoading} from './selectors';
import {loadExamList, takeExam} from './actions';
import saga from './saga';

import {getCurrentExamName} from '../../../utils/local-storage';
import {PLACE_HOLDER} from '../../../constants/questions';
import {EXAM_RS} from '../../../constants/routers';

const STATUS = {
  $0: {tooltip: PLACE_HOLDER.need_take, css: ''},
  $1: {tooltip: PLACE_HOLDER.token, css: 'token'},
  $2: {tooltip: PLACE_HOLDER.approve, css: 'approve'}
};

class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadExamList();
  }

  renderSelectedExam = (id) => (getCurrentExamName() === id ? 'current_exam' : '')

  renderExamStatusTooltip = (token, approve) => {
    if (token && !approve) return STATUS.$1;

    if (token && approve) return STATUS.$2;

    return STATUS.$0;
  }

  renderExamItem = (exam, idx) => {
    const {
      id, title, token, approve
    } = exam;
    const status = this.renderExamStatusTooltip(token, approve);

    if (token && approve) {
      return (
        <section
          key={`exm_${idx}`}
          title={status.tooltip}
          className={`${this.renderSelectedExam(id)} ${status.css}`}>
          <Link className="router-link" to={`${EXAM_RS}/${id}`}>
            {title}
            {approve && <i className="fa fa-check tick"></i>}
          </Link>
        </section>
      );
    }

    return (
      <section
        key={`exm_${idx}`}
        title={status.tooltip}
        className={`${this.renderSelectedExam(id)} ${status.css}`}
        onClick={(e) => this.props.takeExam(id)}
      >
        {title}
        {approve && <i className="fa fa-check tick"></i>}
      </section>
    );
  }

  renderPage = () => {
    const {error, examList} = this.props;

    if (error) {
      return <Error err={error}/>;
    }
    if (!examList) {
      return (
        <section><h3>Khong co Exam nao</h3></section>
      );
    }
    return examList.map(this.renderExamItem);
  }

  render() {
    const {loading} = this.props;
    return (
      <article>
        <Helmet>
          <title>Examiner-HomePage</title>
          <meta name="description" content="pp"/>
        </Helmet>
        {loading && <LoadingIndicator/>}

        {!loading
        && (
          <div className="home-page-examiner">
            {this.renderPage()}
          </div>
        )
        }
      </article>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadExamList: () => dispatch(loadExamList()),
  takeExam: (payload) => dispatch(takeExam(payload)),
});

const mapStateToProps = createStructuredSelector({
  examList: makeSelectExamList(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({
  key: 'home-page-examiner',
  saga,
});

export default compose(
  withSaga,
  withConnect,
)(HomePage);
