import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getLogin, getRefreshToken } from '../../services/actions/auth';
import { getCookie } from '../../utils/cookies';

import styles from './login.module.scss';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [form, setValue] = useState({ email: 'potorochinau@ya.ru', password: '1234567qQ' });
  const { user } = useSelector(store => store.auth);
  const from = location.state?.from?.pathname || '/';

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(getLogin(form));
  }

  useEffect(() => {
    if (!user?.name) {
      dispatch(getRefreshToken());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (getCookie('accessToken')) {
      history.push(from);
    }
  }, [user, history, from]);

  return (
    <div className={styles.container + ' mt-20 text_type_main-default'}>
      <h1 className='mb-6'>Вход</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          type='email'
          placeholder='E-mail'
          value={form.email}
          onChange={onChange}
          name='email'
        />
        <Input
          type='password'
          placeholder='Пароль'
          value={form.password}
          onChange={onChange}
          name='password'
        />
        <Button type='primary' htmlType='submit' size='medium'>Войти</Button>
      </form>
      <div className={styles.links + ' text_color_inactive mt-20'}>
        <div className='mb-4'>
          <span>Вы - новый пользователь?</span>
          <Link to='/register' className='ml-1'>Зарегистрироваться</Link>
        </div>
        <div>
          <span>Забыли пароль?</span>
          <Link to='/forgot-password' className='ml-1'>Восстановить пароль</Link>
        </div>
      </div>
    </div>
  );
}

export default Login