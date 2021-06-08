export const emailValidation = {
  required: 'E-mail required',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "E-mail inválido"
  }    
}

export const passwordValidation = {
  required: 'Password required',
}
