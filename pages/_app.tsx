import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { SidebarDrawerProvider } from '../hooks/SidebarDrawerContext'
import { FormValidationProvider } from '../hooks/FormValidationContext'
import { theme } from '../styles/theme'
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }:AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SidebarDrawerProvider>
        <FormValidationProvider>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </FormValidationProvider>
      </SidebarDrawerProvider>
    </ChakraProvider>
  )
}

export default MyApp
