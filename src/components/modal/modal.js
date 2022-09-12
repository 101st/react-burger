import * as ReactDOM from 'react-dom';
import { func, string, node } from 'prop-types';
import ModalHeader from './modal-header/modal-header';
import ModalBackDrop from '../modal-overlay/modal-overlay';

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

Modal.propTypes = {
  onClose: func,
  header: string,
  setModalVisible: func,
  children: node
}

export default Modal;