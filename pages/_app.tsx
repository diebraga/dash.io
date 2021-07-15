import { ChakraProvider } from '@chakra-ui/react'
import '../node_modules/react-modal-video/scss/modal-video.scss'
import "../styles/global.scss"
import { AppProps } from 'next/app'
import { SidebarDrawerProvider } from '../hooks/useSidebarDrawer'
import { theme } from '../styles/theme'
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from '../hooks/useAuth';
import { MiniplayProvider } from '../hooks/useMiniplay';
import { MusicProvider } from '../hooks/useMusic';

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <SidebarDrawerProvider>
          <MusicProvider>
            <MiniplayProvider>
              <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
              </QueryClientProvider>
            </MiniplayProvider>
          </MusicProvider>
        </SidebarDrawerProvider>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
