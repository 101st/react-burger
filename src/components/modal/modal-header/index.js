import {
  CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import Styles from './style.module.scss';

function ModalHeader({ onClose, children }) {
  return (
    <div className={`${Styles.container}`}>
      <h3>{children}</h3>
      <div>
        <CloseIcon type="primary" onClick={onClose} />
      </div>
    </div>
  )
}

export default ModalHeader;