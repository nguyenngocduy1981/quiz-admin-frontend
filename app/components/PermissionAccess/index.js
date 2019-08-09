import React from 'react'
import {getLoginRole} from "../../utils/local-storage";
import {_403, LOGIN} from "../../constants/routers";

const Authorization = (allowedRoles) =>
  (WrappedComponent) => {
    return class WithAuthorization extends React.Component {
      componentWillMount() {
        const role = getLoginRole();
        if (!role) {
          this.props.history.push(LOGIN);
        } else if (!allowedRoles.includes(role)) {
          this.props.history.push(_403);
        }
      }

      componentWillUpdate(nextProps) {
        const role = getLoginRole();
        if (!role) {
          this.props.history.push(LOGIN);
        } else if (!allowedRoles.includes(role)) {
          this.props.history.push(_403);
        }
      }

      render() {
        return <WrappedComponent {...this.props} />
      }
    }
  }

export default Authorization;
