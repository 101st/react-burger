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
  const isActive = (path: string) => {
    if ((pathname.indexOf('profile') !== -1 && path === '/profile')
      || (pathname.indexOf('ingredients') !== -1 && path === '/ingredients')) {
      return true;
    } else {
      if (pathname === path)
        return true;
    }
    return false;
  }

  return (
    <header className={Styles.container}>
      <div className={`${Styles.header} text text_type_main-default`}>
        <div>
          <nav className='mr-5'>
            <BurgerIcon type={isActive('/') || isActive('/ingredients') ? 'primary' : 'secondary'} />
            <Link to='/' className={`ml-2 ${isActive('/') || isActive('/ingredients') ? Styles['text_color_active'] : 'text_color_inactive'}`}>Конструктор</Link>
          </nav>
          <nav>
            <ListIcon type={isActive('/feed') ? 'primary' : 'secondary'} />
            <Link to='/feed' className={`ml-2 ${isActive('/feed') ? Styles['text_color_active'] : 'text_color_inactive'}`}>Лента заказов</Link>
          </nav>
        </div>
        <div className={Styles.logo}>
          <Logo />
        </div>
        <div>
          <nav>
            <ProfileIcon type={isActive('/profile') ? 'primary' : 'secondary'} />
            <Link to='/profile' className={`ml-2 ${isActive('/profile') ? Styles['text_color_active'] : 'text_color_inactive'}`}>Личный кабинет</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default AppHeader;