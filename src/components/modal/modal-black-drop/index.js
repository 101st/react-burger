import Styles from './style.module.scss';

function BlackDropModal({ onClose }) {
  return (<div
    onClick={onClose}
    className={`${Styles.container}`}></div>)
}

export default BlackDropModal;