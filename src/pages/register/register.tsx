import { useState, useEffect, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Styles from './register.module.scss';

import { getRegister } from '../../services/actions/auth';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

function Register() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [form, setValue] = useState({ name: '', email: '', password: '' });
  const { getRegisterSuccess } = useAppSelector((store: any) => store.auth);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  }
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(getRegister(form));
  }

  useEffect(() => {
    if (getRegisterSuccess) {
      history.push('/');
    }
  }, [getRegisterSuccess, history]);

  return (
    <div className={Styles.container + ' mt-20 text_type_main-default'}>
      <h1 className='mb-6'>Регистрация</h1>
      <form className={Styles.form} onSubmit={onSubmit}>
        <Input
          type='text'
          placeholder='Имя'
          value={form.name}
          onChange={onChange}
          name='name'
        />
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
          icon='ShowIcon'
          name='password'
        />
        <Button type='primary' htmlType='submit' size='medium'>Зарегистрироваться</Button>
      </form>
      <div className={Styles.links + ' text_color_inactive mt-20'}>
        <p className='text text_type_main-small'>
          Уже зарегистрированы? <Link to={'/login'}>Войти</Link>
        </p>
      </div>
    </div>
  )
}

export default Register;