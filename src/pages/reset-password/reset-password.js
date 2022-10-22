import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import { getResetPassword } from "../../services/actions/auth";

import styles from "./reset-password.module.scss";

function ResetPassword() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { getForgotPasswordResponseMessage } = useSelector((store) => store.auth);
  const [form, setValue] = useState({ password: '', token: '' });
  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(getResetPassword(form.password, form.token));
  }
  useEffect(() => {
    if (getForgotPasswordResponseMessage === true) {
      history.push("/reset-password");
    }
  }, [dispatch, getForgotPasswordResponseMessage, history])

  return (
    <div className={styles.container + ' mt-20 text_type_main-default'}>
      <h1 className='mb-6'>Восстановление пароля</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          type='password'
          placeholder='Новый пароль'
          value={form.password}
          onChange={onChange}
          name='password'
        />
        <Input
          type='text'
          placeholder='Введите код из письма'
          value={form.token}
          onChange={onChange}
          name='token'
        />
        <Button type='primary' htmlType='submit' size='medium'>Восстановить</Button>
      </form>
      <div className={styles.links + ' text_color_inactive mt-20'}>
        <div className='mb-4'>
          <span>Вспомнили пароль?</span>
          <Link to='/login' className='ml-1'>Войти</Link>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword;