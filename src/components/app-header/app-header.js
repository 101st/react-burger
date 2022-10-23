import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, Link } from "react-router-dom";

import Styles from './app-header.module.scss';

function AppHeader() {
  const { pathname } = useLocation();

  return (
    <header className={`${Styles.container} text text_type_main-default`}>
      <div className='mt-4 mb-4'>
        <nav className='pl-5 pr-5 mr-2'>
          <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'} />
          <Link to='/' className={`ml-2 ${pathname !== '/' && 'text_color_inactive'}`}>Конструктор</Link>
        </nav>
        <nav className='pl-5 pr-5 mr-2'>
          <ListIcon type={pathname === '/feed' ? 'primary' : 'secondary'} />
          <Link to='/feed' className={`ml-2 ${pathname !== '/feed' && 'text_color_inactive'}`}>Лента заказов</Link>
        </nav>
      </div>
      <div className={Styles.logo}>
        <Logo />
      </div>
      <div className='mt-4 mb-4'>
        <nav className='pl-5 pr-5 mr-2'>
          <ProfileIcon type={pathname === '/profile' ? 'primary' : 'secondary'} />
          <Link to='/profile' className={`ml-2 ${pathname !== '/profile' && 'text_color_inactive'}`}>Личный кабинет</Link>
        </nav>
      </div>
    </header>
  )
}

export default AppHeader;