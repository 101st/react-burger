import React, { useEffect } from 'react';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import Styles from './style.module.scss';

function AppHeader() {
  const [activeMenuItem, setActiveMenuItem] = React.useState('BurgerIcon');

  const onClickMenuHandler = React.useCallback((e) => {
    setActiveMenuItem(e.currentTarget.getAttribute("data-name"));
  }, []);

  useEffect(() => {
    document.querySelectorAll('div.pl-5.pr-5').forEach(element => {
      element.addEventListener('click', onClickMenuHandler);
    })
  }, [onClickMenuHandler]);

  return <nav className={`${Styles.container} text text_type_main-default`}>
    <div className='mt-4 mb-4'>
      <div className='pl-5 pr-5 mr-2' data-name='BurgerIcon'>
        <BurgerIcon type={activeMenuItem === 'BurgerIcon' ? 'primary' : 'secondary'} />
        <a className={`ml-2 ${activeMenuItem !== 'BurgerIcon' && 'text_color_inactive'}`} href='/#'>Конструктор</a>
      </div>
      <div className='pl-5 pr-5' data-name='ListIcon'>
        <ListIcon type={activeMenuItem === 'ListIcon' ? 'primary' : 'secondary'} />
        <a className={`ml-2 ${activeMenuItem !== 'ListIcon' && 'text_color_inactive'}`} href='/#'>Лента заказов</a>
      </div>
    </div>
    <div className={Styles.logo}>
      <Logo />
    </div>
    <div className='mt-4 mb-4'>
      <div className='pl-5 pr-5' data-name='ProfileIcon'>
        <ProfileIcon type={activeMenuItem === 'ProfileIcon' ? 'primary' : 'secondary'} />
        <a className={`ml-2 ${activeMenuItem !== 'ProfileIcon' && 'text_color_inactive'}`} href='/#'>Личный кабинет</a>
      </div>
    </div>
  </nav>
}

export default AppHeader;