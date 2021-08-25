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

export const getFromLocalStorage = key => {
  let data = localStorage.getItem(key)
  if (key === 'user') {
    if (data) {
      return JSON.parse(localStorage.getItem(key))
    } else {
      return null
    }
  }
}

export const isEmpty =(obj) => {
  for(let  key in obj)
  {
    return false;
  }
  return true;
}
