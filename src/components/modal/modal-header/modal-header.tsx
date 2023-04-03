import {
  CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import Styles from './modal-header.module.scss';

interface IModalHeader {
  onClose: () => void;
  children: string;
}

function ModalHeader({ onClose, children }: IModalHeader) {
  return (
    <div className={`${Styles.container}`}>
      <h3>{children}</h3>
      <div  data-cy="modal-close">
        <CloseIcon type='primary' onClick={onClose} />
      </div>
    </div>
  )
}

export default ModalHeader;