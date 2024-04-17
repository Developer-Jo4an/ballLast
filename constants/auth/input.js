export const inputUsernameSettings = {
    required: 'Логин обязателен',
    pattern: {
      value: /^[a-zA-Z0-9_-]+$/,
      message: 'Логин может содержать только латинские символы, цифры, _ и -'
    },
    minLength: {
      value: 8,
      message: 'Логин должен содержать минимум 8 символов'
    }
  }

export const inputPasswordSettings = {
  required: 'Пароль обязателен',
  pattern: {
    value: /^[a-zA-Z0-9_-]+$/,
    message: 'Пароль может содержать только латинские символы, цифры, _ и -'
  },
  minLength: {
    value: 6,
    message: 'Пароль должен содержать минимум 8 символов'
  }
}
