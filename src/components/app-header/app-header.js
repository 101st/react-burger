import { useState } from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeaderItem from './app-header-item';

import Styles from './style.module.scss';

function AppHeader() {
  const [activeMenuItem, setActiveMenuItem] = useState('BurgerIcon');

  return (
    <header className={`${Styles.container} text text_type_main-default`}>
      <div className='mt-4 mb-4'>
        <AppHeaderItem id={'BurgerIcon'} name='Конструктор' activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem} />
        <AppHeaderItem id={'ListIcon'} name='Лента заказов' activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem} />
      </div>
      <div className={Styles.logo}>
        <Logo />
      </div>
      <div className='mt-4 mb-4'>
        <AppHeaderItem id={'ProfileIcon'} name='Личный кабинет' activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem} />
      </div>
    </header>
  )
}

export default AppHeader;