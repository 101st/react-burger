import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { patchUser } from '../../services/actions/auth';

import Styles from './profile.module.scss';

function ProfileForm() {
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.auth);
  const [showButtons, setShowButtons] = useState(false);
  const [form, setValue] = useState({
    email: '',
    name: '',
    password: '',
  })

  const onChange = (e) => {
    const newData = { ...form, [e.target.name]: e.target.value };
    if (JSON.stringify(newData) !== JSON.stringify(user) && form.password.length > 8)
      setShowButtons(true);
    else
      setShowButtons(false);
    setValue(newData);
  }

  useEffect(() => {
    if (user && form.email === '')
      setValue(user);
  }, [user, form.email]);

  return (
    <div className={Styles.fields}>
      <form onSubmit={e => {
        e.preventDefault();
        dispatch(patchUser({ name: form.name, email: form.email, password: form.password }));
      }}>
        <Input
          type='text'
          placeholder='Имя'
          onChange={onChange}
          icon='EditIcon'
          value={form.name}
          name='name'
        />
        <Input
          type='email'
          placeholder='E-mail'
          onChange={onChange}
          icon='EditIcon'
          value={form.email}
          name='email'
        />
        <Input
          type='password'
          placeholder='Пароль'
          onChange={onChange}
          icon='EditIcon'
          value={form.password || ''}
          name='password'
        />
        <div className={Styles['form-buttons']}>
          {showButtons && <>
            <Button
              type='primary'
              htmlType='submit'
              size='medium'>Сохранить</Button>
            <Button
              type='primary'
              onClick={() => {
                setValue(user); setShowButtons(false);
              }}
              htmlType='button'
              size='medium'>Отмена</Button>
          </>}
        </div>
      </form>
    </div>
  )
}

export default ProfileForm;