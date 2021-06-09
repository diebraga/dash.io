export const nameFormValidation = {
  required: 'Name required'
}

export const emailFormValidation = {
  required: 'E-mail required',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "E-mail inválido"
  }    
}

export const passwordFormValidation = {
  required: 'Password required',
}

export const registerPasswordFormValidation = {
  required: 'Password required',
  minLength: {
    value: 4,
    message: "Required at least 4 characters long"
  }
}
