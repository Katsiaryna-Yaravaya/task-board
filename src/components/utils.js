export const DATA_REGISTRATION_FORM = [
  {
    type: 'text',
    name: 'email',
    value: 'email',
    autocomplete: 'on',
    label: 'email',
    className: 'input-box__user-name'
  },
  {
    type: 'password',
    name: 'password',
    value: 'password',
    label: 'password',
    autocomplete: 'current-password',
    className: 'input-box__user-name'
  },
  {
    type: 'submit',
    name: 'Sign in',
    value: 'signIn',
    className: 'sign-in'
  },
  {
    type: 'submit',
    name: 'registration',
    value: 'registration',
    className: 'sign-in'
  }
]

export const BUTTON_THEME = [
  {
    value: 'light',
    className: 'button-theme-light theme__button',
    label: 'light'
  },
  {
    value: 'dark',
    className: 'button-theme-dark theme__button',
    label: 'dark'
  },
  {
    value: 'neutral',
    className: 'button-theme-neutral theme__button',
    label: 'neutral'
  }
]

export const isEmpty = obj => {
  for (let key in obj) {
    return false
  }
  return true
}

export const isNotRequestValid = statusText => statusText !== 'OK'
