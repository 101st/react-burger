import * as ReactDOM from 'react-dom';
import { func, string, node, bool } from 'prop-types';
import ModalHeader from './modal-header/modal-header';
import ModalBackDrop from '../modal-overlay/modal-overlay';

import Styles from './style.module.scss';
import { useEffect } from 'react';

function Modal({ title, isOpen, onClose, children }) {

  useEffect(() => {
    function closeByEscape(e) {
      if (e.key === 'Escape') onClose();
    }

    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);

      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen, onClose])

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
  title: string,
  onClose: func.isRequired,
  isOpen: bool.isRequired,
  children: node.isRequired
}

export default Modal;