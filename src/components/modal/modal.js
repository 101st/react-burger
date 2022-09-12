import * as ReactDOM from 'react-dom';
import { func, string, node } from 'prop-types';
import ModalHeader from './ModalHeader/modalHeader';
import ModalBackDrop from '../ModalOverlay/modalOverlay';

import Styles from './style.module.scss';
import { useEffect } from 'react';

function Modal({ title, onClose, isOpen, children }) {

  useEffect(() => {
    function closeByEscape(e) {
      if (e.key === 'Escape') onClose(false);
    }

    document.addEventListener('keydown', closeByEscape);

    return () => {
      document.removeEventListener('keydown', closeByEscape);
    }
  }, [onClose])

  if (isOpen)
    return ReactDOM.createPortal(
      <div className={`${Styles.container}`}>
        <div className={`${Styles.modal} pt-10 pr-10 pl-10 pb-15`}>
          <ModalHeader onClose={onClose}>{title}</ModalHeader>
          {children}
        </div>
        <ModalBackDrop onClose={onClose} />
      </div>,
      document.getElementById("react-modals")
    );
  return;
}

Modal.propTypes = {
  onClose: func.isRequired,
  isOpen: func.isRequired,
  header: string,
  children: node
}

export default Modal;