export const errors = {
  ALL_MUST_BE_FILLED: 'Все поля должны быть заполнены',
  EMAIL: 'Неверный емейл',
  STRING_MIN: 'Длина должна быть от {expected} символов',
  STRING_MAX: 'Длина должна быть не более {expected} символов',
  EQUAL_FIELD: 'Введённые пароли не совпадают',
  EMAIL_IS_USE: 'Этот емейл уже используется',
  NAME_IS_USE: 'Это имя уже занято',
  INVALID_EMAIL_OR_PASSWORD: 'Неверный емейл или пароль',
  INVALID_PASSWORD: 'Неверный пароль',
  ENUM_VALUE: 'Невалидное значение',
  NUMBER_INTEGER: 'Невалидное значение',
  NUMBER_MAX: 'Максимальное значение не должно быть больше {expected}',
  NUMBER_MIN: 'Минимальное значение не должно быть меньше {expected}',
  NUMBER_POSITIVE: 'Невалидное значение',
  INVALID_EXTENTION: 'Загрузите изображение в формате JPG, PNG или WEBP'
}

export const getErrorMessage = error => {
  if (errors[error.message] === undefined) {
    return 'Неизвестная ошибка'
  }

  return errors[error.message].replace('{expected}', error.info.expected)
}
