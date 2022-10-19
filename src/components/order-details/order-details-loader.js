import loader from '../../images/bean-eater-1s-200px.svg';

import Styles from './style.module.scss';

function OrderDetails() {
  return (
    <>
      <div className={`${Styles['sub-title']} mt-20 text text_type_main-default`}><h2>Оформление заказа</h2></div>
      <div className={`${Styles['sub-title']} mt-20`}>
        <img className='mt-5' alt={'Готово'} width={120} height={120} src={loader} />
      </div>
      <div className={`${Styles['sub-title']} mt-15 text text_type_main-default`}>Пожалуйста дождитесь процесса оформления заказа</div>
    </>
  )
}

export default OrderDetails;