import * as ReactDOM from 'react-dom';
import ModalHeader from './modal-header';
import ModalBackDrop from './modal-black-drop';

import Styles from './style.module.scss';

function Modal({ onClose, header, children }) {
  return ReactDOM.createPortal(
    <div className={`${Styles.container}`}>
      <div className={`${Styles.modal} pt-10 pr-10 pl-10 pb-15`}>
        <ModalHeader onClose={onClose}>{header}</ModalHeader>
        {children}
      </div>
      <ModalBackDrop onClose={onClose} />
    </div>,
    document.getElementById("react-modals")
  );
}

export default Modal;