import dynamic from 'next/dynamic'
import { Header } from "../components/Header";
import { Flex, SimpleGrid, Box, Text, theme, useColorMode } from '@chakra-ui/react'
import { Sidebar } from "../components/Sidebar";
import Head from 'next/head'

const Chart =  dynamic(() => import('react-apexcharts'), {
  ssr: false
})

const options = {
  colors: ["#FF0000"],
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    enabled: false
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600]
    },
    axisTicks: {
      color: theme.colors.gray[600]
    },
    categories: [
      '2021-03-18T00:00:00:00.000Z',
      '2021-03-19T00:00:00:00.000Z',
      '2021-03-20T00:00:00:00.000Z',
      '2021-03-21T00:00:00:00.000Z',
      '2021-03-22T00:00:00:00.000Z',
      '2021-03-23T00:00:00:00.000Z',
    ]
  },
  fill: {
    opacity: 0.3,
    colors: theme.colors.red[500],
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.7 
    }
  }
};

const series = [
  { name: 'series1', data: [12, 455, 678, 43, 90, 23] }
]

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

        <SimpleGrid gap='4' flex='1' minChildWidth='320px' align='flex-start'>
          <Box p={['6', '8']} bg={bgColor[colorMode]} borderRadius={8} pb='4' fontSize='sm'>
            <Text fontSize='lg' mb='4'>Weekly subscriptions</Text>
            <Chart options={options} series={series} type='area' height={160}/>
          </Box>

          <Box p='8' bg={bgColor[colorMode]} borderRadius={8} pb='4'>
            <Text fontSize='lg' mb='4'>Opening rate</Text>
            <Chart options={options} series={series} type='area' height={160}/>
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
    </>
  )
}