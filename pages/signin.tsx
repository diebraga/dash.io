import { Flex, Button, Stack, Text, Center, InputRightElement, IconButton, InputGroup, Icon, useToast, useColorMode } from '@chakra-ui/react'
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "../components/Form/Input";
import Head from 'next/head'
import { useState } from 'react';
import { RiEyeOffLine, RiEyeLine } from "react-icons/ri";
import { emailFormValidation, passwordFormValidation } from '../components/validations';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { DarkModeSwitch } from '../components/DarkModeSwitch';

type SignFormData = {
  email: string
  password: string
}

export default function Signin() {
  const { handleSubmit, register, errors, formState: { isSubmitting } } = useForm({ mode: 'all' })
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const toast = useToast()

  const { colorMode } = useColorMode()

  const bgColor = { light: 'gray.50', dark: 'gray.800' }


  const handleSignIn: SubmitHandler<SignFormData> = async (value) => {
    const response = await fetch(`http://localhost:1337/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        identifier: value.email,
        password: value.password,
      })
    })
    const data = await response.json()

    if (data.error) {
      toast({
        title: "Error.",
        description: "Authentication failed , please tri again.",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: 'top-right'
      })
    } else {
      setCookie(null, 'jwt', data.jwt , {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      })
      router.push('/dashboard')  
    }
  }

  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="Login page dash.io" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex w='100vw' h='100vh' align='center' justify='center'>
        <Flex position='absolute' right='30px' top='27px'>
          <DarkModeSwitch />
        </Flex>  
        <Flex
          as='form' 
          w='100%' 
          maxW={360} 
          bg={bgColor[colorMode]}
          p='8' 
          borderRadius={8}
          flexDir='column'
          onSubmit={handleSubmit(handleSignIn)}
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
            <Input name='email' label='E-mail' type='email' error={errors.email} ref={register(emailFormValidation)}/>
            <InputGroup>
              <Input
                name='password'
                label='Password' 
                error={errors.password}
                type={showPassword ? 'text' : 'password'} 
                ref={register(passwordFormValidation)}
              />
              <InputRightElement width="4.5rem">
                <IconButton 
                  aria-label='view button' 
                  size='sm'
                  ml='32px'
                  mt='64px'
                  bg='red.500' 
                  color='gray.50'
                  onClick={() => setShowPassword(!showPassword)} 
                  icon={showPassword ? 
                  <Icon as={RiEyeLine} /> : 
                  <Icon as={RiEyeOffLine} />}
                />
              </InputRightElement>
            </InputGroup>
          </Stack>
          <Button type='submit' mt='6' bg='red.500' color='gray.50' size='lg' isLoading={isSubmitting}>
            Enter
          </Button>
        </Flex>
      </Flex>
    </>
  )
}
