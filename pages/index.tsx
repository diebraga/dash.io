import { Flex, Button, Stack, Text, Center } from '@chakra-ui/react'
import { Input } from "../components/Form/Input";
import Head from 'next/head'

export default function Signin() {
  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="Login page dash.io" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex w='100vw' h='100vh' align='center' justify='center'>
        <Flex
          as='form' 
          w='100%' 
          maxW={360} 
          bg='gray.800' 
          p='8' 
          borderRadius={8}
          flexDir='column'
        >
          <Stack spacing='4'>
            <Center>
              <Text
                textAlign='center'
                fontWeight='bold'
                letterSpacing='tight'
                fontSize='4xl'
                w='64'
              >
                dash<Text as='span' color='red.500'>.io</Text>
              </Text>
            </Center>
            <Input name='email' label='E-mail' type='email' />
            <Input name='password' label='Password' type='password' />
          </Stack>
          <Button type='submit' mt='6' colorScheme='red' size='lg'>
            Enter
          </Button>
        </Flex>
      </Flex>
    </>
  )
}
