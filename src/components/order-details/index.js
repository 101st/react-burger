import Modal from '../modal';
import Done from '../../images/done.svg';

import Styles from './style.module.scss';

function IngredientOrderModal({ orderId, status, onClose, name }) {
  return (
    <Modal header={name} onClose={onClose}>
      <div className={`${Styles['order-id']} mt-16 text text_type_main-large`}>{orderId}</div>
      <div className={`${Styles['sub-title']} mt-8 text text_type_main-default`}>идентификатор заказа</div>
      <div className={`${Styles['sub-title']} mt-15`}>
        <img alt={'Готово'} width={120} height={120} src={Done} />
      </div>
      <div className={`${Styles['sub-title']} mt-15 text text_type_main-default`}>{status}</div>
      <div className={`${Styles['sub-title']} mt-2 text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</div>
    </Modal>
  )
}

export default IngredientOrderModal;