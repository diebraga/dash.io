import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { SidebarDrawerProvider } from '../hooks/useSidebarDrawer'
import { theme } from '../styles/theme'
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }:AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SidebarDrawerProvider>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </SidebarDrawerProvider>
    </ChakraProvider>
  )
}

export default MyApp
