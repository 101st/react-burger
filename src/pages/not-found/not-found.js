import Styles from "./not-found.module.scss"

function NotFound() {
  return (
    <h1 className={`${Styles['not-found']} text text_type_main-large mt-20`}>
      Страница не найдена
    </h1>
  )
}

export default NotFound