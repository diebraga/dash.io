import { createContext, ReactNode, useContext } from "react";
import { useForm } from "react-hook-form";

interface FormValidationProvider {
  children: ReactNode;
}

interface FormValidationFormContextData {
  emailFormValidation: object
  passwordFormValidation: object
  registerPasswordFormValidation: object
  registerRe_passwordFormValidation: object
  nameFormValidation: object
}

const FormValidationContext = createContext({} as FormValidationFormContextData);

export function FormValidationProvider({children}: FormValidationProvider){
  const { watch } = useForm({ mode: 'all' })

  const nameFormValidation = {
    required: 'Name required'
  }

  const emailFormValidation = {
    required: 'E-mail required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "E-mail inválido"
    }    
  }
  
  const passwordFormValidation = {
    required: 'Password required',
  }
  
  const registerPasswordFormValidation = {
    required: 'Password required',
    minLength: {
      value: 4,
      message: "Required at least 4 characters long"
    }
  }

  const registerRe_passwordFormValidation = {
    required: "Repeat password is required",
    validate: (value: string) => 
    value === watch('password')
    || "Password does not match"
  }  
  
  return (
    <FormValidationContext.Provider value={{
      emailFormValidation,
      passwordFormValidation,
      registerPasswordFormValidation,
      registerRe_passwordFormValidation,
      nameFormValidation
    }}>
      {children}
    </FormValidationContext.Provider>
  )
}

export const useFormValidation = () => useContext(FormValidationContext)