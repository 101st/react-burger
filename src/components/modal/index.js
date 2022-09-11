import * as ReactDOM from 'react-dom';
import ModalHeader from './modal-header';
import ModalBackDrop from '../modal-overlay';

import Styles from './style.module.scss';
import { useEffect } from 'react';

function Modal({ onClose, header, setModalVisible, children }) {

  useEffect(() => {
    const onEscClose = document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setModalVisible(false);
    });
    return () => {
      document.removeEventListener(onEscClose, () => { });
    }
  }, [onClose, setModalVisible])

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