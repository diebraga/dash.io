import dynamic from 'next/dynamic'
import { Header } from "../components/DashboardComponents/Header";
import { Flex, SimpleGrid, Box, Text, theme, useColorMode } from '@chakra-ui/react'
import { Sidebar } from "../components/DashboardComponents/Sidebar";
import Head from 'next/head'


export default function Dashboard() {
  const { colorMode } = useColorMode()

  const bgColor = { light: 'gray.50', dark: 'gray.800' }

  return (
    <>
    <Head>
      <title>Dashboard</title>
      <meta name="description" content="Dashboard page dash.io" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Flex direction='column' h='100vh'>
      <Header />

      <Flex w='100%' my='6' maxW={1480} mx='auto' px='6'>
        <Sidebar />


      </Flex>
    </Flex>
    </>
  )
}