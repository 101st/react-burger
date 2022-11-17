import { MouseEventHandler } from 'react';
import Styles from './modal-overlay.module.scss';

function ModalOverlay({ onClose }: { onClose: MouseEventHandler }) {
  return (
    <div
      onClick={onClose}
      className={`${Styles.container}`}></div>
  )
}

export default ModalOverlay;