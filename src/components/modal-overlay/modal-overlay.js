import { func } from 'prop-types';
import Styles from './modal-overlay.module.scss';

function ModalOverlay({ onClose }) {
  return (
    <div
      onClick={onClose}
      className={`${Styles.container}`}></div>
  )
}

ModalOverlay.propTypes = {
  onClose: func.isRequired
}

export default ModalOverlay;