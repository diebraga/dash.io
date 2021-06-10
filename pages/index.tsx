import { Flex, Heading } from '@chakra-ui/react'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Home page dash.io" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex w='100vw' h='100vh' align='center' justify='center'>
        <Heading>My Home page</Heading>
      </Flex>
    </>
  )
}
