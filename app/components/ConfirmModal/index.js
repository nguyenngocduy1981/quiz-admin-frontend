import React from 'react';
import {CONFIRM_ACTION} from '../../constants/questions';
import './style.scss';

const EVENTS = {
  13: CONFIRM_ACTION.YES,
  27: CONFIRM_ACTION.NO,
}

class ConfirmModal extends React.Component {
  constructor(props) {
    super(props);
  }

  escFunction = (event) => {
    const action = EVENTS[event.keyCode]
    if (action) {
      this.props.onConfirm(action);
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  render() {
    const {id, msg, onConfirm} = this.props;
    return (
      <div className={'q-modal'}>
        <div className="modal" tabIndex="-1" role="dialog" id={id}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Xác nhận</h5>
              </div>
              <div className="modal-body">
                <p>{msg?msg:'Bạn có thực sự muốn xóa không?'}</p>
              </div>
              <div className="modal-footer">
                <div className={'summary'}>
                  <span className={'btn'} onClick={e => onConfirm(CONFIRM_ACTION.YES)}>YES</span>
                  <span className={'btn'} onClick={e => onConfirm(CONFIRM_ACTION.NO)}>NO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmModal;
