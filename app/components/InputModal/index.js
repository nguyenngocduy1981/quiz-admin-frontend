import React from 'react';
import {CONFIRM_ACTION} from '../../constants/questions';
import './style.scss';

class InputModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  escFunction = (event) => {
    if (event.keyCode === 27 && this.props.shown) {
      const action = CONFIRM_ACTION.NO;
      this.props.onSubmit({action, val: this.state.value});

      event.stopImmediatePropagation();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  onKeyUp = evt => {
    if (evt.keyCode !== 13) return;

    const action = CONFIRM_ACTION.YES;
    this.props.onSubmit({action, val: evt.target.value});
  }
  onBlur = evt => {
    const value = evt.target.value;
    this.setState({value});
  }

  submit = (action) => {
    this.props.onSubmit({action, val: this.state.value});
  }

  render() {
    const {id, placeholder} = this.props;
    return (
      <div className={'q-modal'}>
        <div className="modal" tabIndex="-1" role="dialog" id={id}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Nhập thông tin</h5>
              </div>
              <div className="modal-body">
                <input type={'text'} className={'form-control'}
                       id={`id_${id}`}
                       placeholder={placeholder}
                       onKeyUp={this.onKeyUp}
                       onBlur={this.onBlur}/>
              </div>
              <div className="modal-footer">
                <div className={'summary'}>
                  <span className={'btn'} onClick={e => this.submit(CONFIRM_ACTION.YES)}>Nhập</span>
                  <span className={'btn'} onClick={e => this.submit(CONFIRM_ACTION.NO)}>Hủy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InputModal;
