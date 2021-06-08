import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { SidebarDrawerProvider } from '../hooks/SidebarDrawerContext'
import { FormValidationProvider } from '../hooks/FormValidationContext'
import { theme } from '../styles/theme'


function MyApp({ Component, pageProps }:AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SidebarDrawerProvider>
        <FormValidationProvider>
          <Component {...pageProps} />
        </FormValidationProvider>
      </SidebarDrawerProvider>
    </ChakraProvider>
  )
}

export default MyApp
