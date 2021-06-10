import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { SidebarDrawerProvider } from '../hooks/useSidebarDrawer'
import { theme } from '../styles/theme'
import { QueryClient, QueryClientProvider } from "react-query";
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';

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

function redirectUser(ctx, location) {
  const router = useRouter()

  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location })
    ctx.res.end()
  } else {
    router.push(location)
  }
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {}
  const jwt = parseCookies(ctx).jwt

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  if (!jwt) {
    if (ctx.pathname === "/") {
      redirectUser(ctx, "/signin")
    } else if (ctx.pathname === "/dashboard") {
      redirectUser(ctx, "/login")
    } 
  }

  return {
    pageProps,
  }
}

export default MyApp
