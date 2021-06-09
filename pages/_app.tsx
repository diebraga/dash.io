import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { SidebarDrawerProvider } from '../hooks/useSidebarDrawer'
import { FormValidationProvider } from '../hooks/useFormValidation'
import { theme } from '../styles/theme'
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }:AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SidebarDrawerProvider>
        <FormValidationProvider>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </FormValidationProvider>
      </SidebarDrawerProvider>
    </ChakraProvider>
  )
}

export default MyApp
