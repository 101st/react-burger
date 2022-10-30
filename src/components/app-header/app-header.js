import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, Link } from 'react-router-dom';

import Styles from './app-header.module.scss';

function AppHeader() {
  const { pathname } = useLocation();
  const isActive = (path) => {
    console.log(pathname.indexOf('profile'));
    if (pathname.indexOf('profile') !== -1) {
      if (path === '/profile')
        return Styles['text_color_active'];
    } else {
      if (pathname === path)
        return Styles['text_color_active'];
    }
    return 'text_color_inactive';
  }

  return (
    <header className={`${Styles.container} text text_type_main-default`}>
      <div className='mt-4 mb-4'>
        <nav className='pl-5 pr-5 mr-2'>
          <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'} />
          <Link to='/' className={`ml-2 ${isActive('/')}`}>Конструктор</Link>
        </nav>
        <nav className='pl-5 pr-5 mr-2'>
          <ListIcon type={pathname === '/orders-feed' ? 'primary' : 'secondary'} />
          <Link to='/orders-feed' className={`ml-2 ${isActive('/orders-feed')}`}>Лента заказов</Link>
        </nav>
      </div>
      <div className={Styles.logo}>
        <Logo />
      </div>
      <div className='mt-4 mb-4'>
        <nav className='pl-5 pr-5 mr-2'>
          <ProfileIcon type={pathname.indexOf('profile') !== -1 ? 'primary' : 'secondary'} />
          <Link to='/profile' className={`ml-2 ${isActive('/profile')}`}>Личный кабинет</Link>
        </nav>
      </div>
    </header>
  )
}

export default AppHeader;