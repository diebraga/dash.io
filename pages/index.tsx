import { Flex, Input, Button, Stack, FormLabel, FormControl } from '@chakra-ui/react'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Login page dashgo" />
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
            <FormControl>
              <FormLabel htmlFor='email'>E-mail</FormLabel>
              <Input
                name='email' 
                placeholder='E-mail' 
                type='email'
                id='email'
                focusBorderColor='pink.500'
                bgColor='gray.900'
                variant='filled'
                _hover={{ bgColor: 'gray.900 '}}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <Input
                name='password'
                id='password'
                placeholder='Password' 
                type='password'
                focusBorderColor='pink.500'
                bgColor='gray.900'
                variant='filled'
                _hover={{ bgColor: 'gray.900 '}}
              />
            </FormControl>
          </Stack>
          <Button type='submit' mt='6' colorScheme='pink' size='lg'>
            Enter
          </Button>
        </Flex>
      </Flex>
    </>
  )
}
