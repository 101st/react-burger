import { func } from 'prop-types';
import Styles from './style.module.scss';

function BlackDropModal({ onClose }) {
  return (<div
    onClick={onClose}
    className={`${Styles.container}`}></div>)
}

BlackDropModal.propTypes = {
  onClose: func
}

export default BlackDropModal;