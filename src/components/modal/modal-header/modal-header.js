import { func, node } from 'prop-types';
import {
  CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import Styles from './modal-header.module.scss';

function ModalHeader({ onClose, children }) {
  return (
    <div className={`${Styles.container}`}>
      <h3>{children}</h3>
      <div>
        <CloseIcon type='primary' onClick={onClose} />
      </div>
    </div>
  )
}

ModalHeader.propTypes = {
  onClose: func.isRequired,
  children: node.isRequired
}

export default ModalHeader;