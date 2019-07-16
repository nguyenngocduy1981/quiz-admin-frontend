import React from 'react';
import {CONFIRM_ACTION, LINKS} from '../../constants/questions';
import './style.scss';

const EVENTS = {
  13: CONFIRM_ACTION.YES,
  27: CONFIRM_ACTION.NO,
}

class FileUploadModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    }
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

  onFileSelect = evt => {
    var selectedFile = evt.target.files[0];

    this.setState({selectedFile});
  }

  render() {
    const {id, onConfirm} = this.props;
    const {selectedFile} = this.state;
    const fileName = selectedFile !== null ? selectedFile.name : 'chọn json file';
    return (
      <div className={'q-modal'}>
        <div className="modal" tabIndex="-1" role="dialog" id={id}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{LINKS.upload_result}</h5>
              </div>
              <div className="modal-body">
                <div className="custom-file">
                  <input type="file" className="custom-file-input" id="customFileLang"
                         onChange={this.onFileSelect}/>
                  <label className="custom-file-label" htmlFor="customFileLang">
                    {fileName}
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <div className={'summary'}>
                  <span className={'btn'} onClick={e => onConfirm({action: CONFIRM_ACTION.YES, selectedFile})}>YES</span>
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

export default FileUploadModal;
