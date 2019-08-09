import React from 'react';
import './style.scss';
import {Helmet} from 'react-helmet';
import LoadingIndicator from "../../components/LoadingIndicator";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {compose} from "redux";
import injectSaga from "../../utils/injectSaga";
import {login} from "./actions";
import {makeSelectError, makeSelectLoading} from "./selectors";
import saga from "./saga";
import {CONFIRM_ACTION} from "../../constants/questions";

class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      loading: false
    };
  }

  onChange = evt => {
    this.setState({user: evt.target.value})
  }
  doLogin = () => {
    const {user} = this.state;
    this.props.login(user);
  }
  onClick = evt => {
    this.doLogin();
  }

  onKeyUp = evt => {
    if (evt.keyCode !== 13) return;

    this.doLogin();
  }

  render() {
    const {user} = this.state;
    const {error, loading} = this.props;
    if (loading) {
      return <LoadingIndicator/>;
    }

    return (
      <article>
        <Helmet>
          <title>LoginPage</title>
        </Helmet>
        <div className="login-page">
          {error && <h1>{error}</h1>}
          <input type={'text'} className={'form-control'}
                 placeholder={'ten dang nhap'}
                 value={user}
                 onKeyUp={this.onKeyUp}
                 onChange={this.onChange}
          />
          <button onClick={this.onClick}>Login</button>
        </div>
      </article>
    );
  }
}


const
  mapDispatchToProps = (dispatch) => ({
    login: (payload) => dispatch(login(payload)),
  });

const
  mapStateToProps = createStructuredSelector({
    loading: makeSelectLoading(),
    error: makeSelectError(),
  });

const
  withConnect = connect(mapStateToProps, mapDispatchToProps);

const
  withSaga = injectSaga({
    key: 'login-view-page',
    saga,
  });

export default compose(
  withSaga,
  withConnect,
)(LoginPage);
