import { useState, useEffect, FormEvent } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { getForgotPassword } from '../../services/actions/auth';

import Styles from './forgot-password.module.scss';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

function ForgotPassword() {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const { getForgotPasswordSuccess } = useAppSelector(store => store.auth);
  const [form, setValue] = useState({ email: '' });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(getForgotPassword(form.email));
  }
  useEffect(() => {
    if (getForgotPasswordSuccess) {
      history.push('/reset-password');
    }
  }, [dispatch, getForgotPasswordSuccess, history])

  return (
    <div className={Styles.container + ' mt-20 text_type_main-default'}>
      <h1 className='mb-6'>Восстановление пароля</h1>
      <form className={Styles.form} onSubmit={onSubmit}>
        <Input
          type='email'
          placeholder='E-mail'
          value={form.email}
          onChange={onChange}
          name='email'
        />
        <Button type='primary' htmlType='submit' size='medium'>Восстановить</Button>
      </form>
      <div className={Styles.links + ' text_color_inactive mt-20'}>
        <div className='mb-4'>
          <span>Вспомнили пароль?</span>
          <Link to='/login' className='ml-1'>Войти</Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword;