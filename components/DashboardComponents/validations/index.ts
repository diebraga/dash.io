export const nameFormValidation = {
  required: 'Name required'
}

export const emailFormValidation = {
  required: 'E-mail obrigatorio',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Invalid email"
  }    
}

export const passwordFormValidation = {
  required: 'Password required',
}

export const registerPasswordFormValidation = {
  required: 'Password required',
  minLength: {
    value: 4,
    message: "Password with at least 4 characters"
  }
}

