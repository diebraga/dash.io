import { Input as ChakraInput, FormLabel, FormControl, InputProps as ChakraInputProps, FormErrorMessage } from '@chakra-ui/react'
import { forwardRef, ForwardRefRenderFunction } from 'react'
import { FieldError } from "react-hook-form";

interface InputProps extends ChakraInputProps {
  name: string
  label?: string
  placeholder?: string
  error?: FieldError
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps>
 = ({ name, label, error = null, ...rest }, ref ) => {
  return (
    <FormControl isInvalid={!!error}>
      {!! label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        name={name} 
        placeholder={label} 
        id={name}
        focusBorderColor='red.300'
        bgColor='gray.900'
        variant='filled'
        _hover={{ bgColor: 'gray.900 '}}
        {...rest}
        ref={ref}
      />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)