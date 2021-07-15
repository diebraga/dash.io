import { Input as ChakraInput, FormLabel, FormControl, InputProps as ChakraInputProps, FormErrorMessage, useColorMode } from '@chakra-ui/react'
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
  const { colorMode } = useColorMode()

  const bgColor = { light: 'white', dark: 'gray.900' }

  return (
    <FormControl isInvalid={!!error}>
      {!! label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        name={name} 
        placeholder={label} 
        id={name}
        focusBorderColor='blue.400'
        bgColor={bgColor[colorMode]}
        variant='filled'
        _hover={{ bgColor: bgColor[colorMode] }}
        {...rest}
        ref={ref}
      />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)