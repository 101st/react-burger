import React, { useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import ModalHeader from './modal-header/modal-header';
import ModalBackDrop from '../modal-overlay/modal-overlay';

import Styles from './modal.module.scss';

interface IModal {
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ title, onClose, children }: IModal) {

  useEffect(() => {
    function closeByEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', closeByEscape);

    return () => {
      document.removeEventListener('keydown', closeByEscape);
    }
  }, [onClose])

  return ReactDOM.createPortal(
    <div className={`${Styles.container}`}>
      <div className={`${Styles.modal} pr-10 pl-10`} data-cy="modal">
        {title && <ModalHeader onClose={onClose}>{title}</ModalHeader>}
        {children}
      </div>
      <ModalBackDrop onClose={onClose} />
    </div>,
    document.getElementById('react-modals') as HTMLElement
  );
}

export default Modal;