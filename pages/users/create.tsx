import { Flex, Box, Heading, Divider, VStack, SimpleGrid, HStack, Button } from '@chakra-ui/react'
import { Header } from "../../components/Header";
import Head from 'next/head'
import Link from "next/link";
import { Sidebar } from "../../components/Sidebar";
import { Input } from "../../components/Form/Input";

export default function CreateUser() {
  return (
    <Box>
      <Head>
        <title>Users | Dash.io</title>
        <meta name="description" content="Users page dash.io" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Flex w='100%' my='6' maxW={1480} mx='auto' px='6'>
        <Sidebar />

        <Box flex='1' borderRadius={8} bg='gray.800' p={['6', '8']}>
          <Heading fontWeight='normal' size='lg'>Create user</Heading>

          <Divider my='6' borderColor='gray.700'/>
          <VStack spacing='8'>
            <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
              <Input name='name' label='Name and surname' />
              <Input name='email' label='E-mail' type='email' />
            </SimpleGrid>

            <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
              <Input name='password' label='Password' type='password'/>
              <Input name='re_password' label='Repeat password' type='password' />
            </SimpleGrid>
          </VStack>

          <Flex mt='8' justify='flex-end'>
            <HStack spacing='4'>
              <Link href="/users" passHref>
                <Button colorScheme='whiteAlpha'>
                  Cancel
                </Button>
              </Link>
              <Button colorScheme='red'>
                Save
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}