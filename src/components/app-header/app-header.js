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
    if (pathname !== path)
      return 'text_color_inactive';
    else
      return Styles['text_color_active'];
  }

  return (
    <header className={`${Styles.container} text text_type_main-default`}>
      <div className='mt-4 mb-4'>
        <nav className='pl-5 pr-5 mr-2'>
          <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'} />
          <Link to='/' className={`ml-2 ${isActive('/')}`}>Конструктор</Link>
        </nav>
        <nav className='pl-5 pr-5 mr-2'>
          <ListIcon type={pathname === '/profile/orders' ? 'primary' : 'secondary'} />
          <Link to='/profile/orders' className={`ml-2 ${isActive('/profile/orders')}`}>Лента заказов</Link>
        </nav>
      </div>
      <div className={Styles.logo}>
        <Logo />
      </div>
      <div className='mt-4 mb-4'>
        <nav className='pl-5 pr-5 mr-2'>
          <ProfileIcon type={pathname === '/profile' ? 'primary' : 'secondary'} />
          <Link to='/profile' className={`ml-2 ${isActive('/profile')}`}>Личный кабинет</Link>
        </nav>
      </div>
    </header>
  )
}

export default AppHeader;