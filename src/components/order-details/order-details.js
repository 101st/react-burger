import { string, number, oneOfType } from 'prop-types';
import Done from '../../images/done.svg';

import Styles from './order-details.module.scss';

function OrderDetails({ orderId, status }) {
  return (
    <>
      <div className={`${Styles['order-id']} mt-16 text text_type_main-large`}>{orderId}</div>
      <div className={`${Styles['sub-title']} mt-8 text text_type_main-default`}>идентификатор заказа</div>
      <div className={`${Styles['sub-title']} mt-15`}>
        <img alt={'Готово'} width={120} height={120} src={Done} />
      </div>
      <div className={`${Styles['sub-title']} mt-15 text text_type_main-default`}>{status}</div>
      <div className={`${Styles['sub-title']} mt-2 text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</div>
    </>
  )
}

OrderDetails.propTypes = {
  orderId: oneOfType([string, number]).isRequired,
  status: string,
};

export default OrderDetails;