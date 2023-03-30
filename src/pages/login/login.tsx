import { useEffect, useState, FormEvent } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getLogin, getRefreshToken } from '../../services/actions/auth';
import { getCookie } from '../../utils/cookies';

import Styles from './login.module.scss';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

interface LocationState {
  from: {
    pathname: string;
  };
}

const Login = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation<LocationState>();
  const [form, setValue] = useState({ email: '', password: '' });
  const { getLoginSuccess } = useAppSelector(store => store.auth);
  const from = location.state?.from?.pathname || '/';

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(getLogin(form));
  }

  useEffect(() => {
    if (!getLoginSuccess && getCookie('refreshToken')) {
      dispatch(getRefreshToken());
    }
  }, [dispatch, getLoginSuccess]);

  useEffect(() => {
    if (getLoginSuccess) {
      history.push(from);
    }
  }, [getLoginSuccess, history, from]);

  return (
    <div className={Styles.container + ' mt-20 text_type_main-default'} data-cy="login-form">
      <h1 className='mb-6'>Вход</h1>
      <form className={Styles.form} onSubmit={onSubmit}>
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
      <div className={Styles.links + ' text_color_inactive mt-20'}>
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