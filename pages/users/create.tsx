import { Flex, Box, Heading, Divider, VStack, SimpleGrid, HStack, Button, useToast, Select, FormLabel, useColorMode } from '@chakra-ui/react'
import { Header } from "../../components/DashboardComponents/Header";
import Head from 'next/head'
import Link from "next/link";
import { Sidebar } from "../../components/DashboardComponents/Sidebar";
import { Input } from "../../components/DashboardComponents/Form/Input";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { registerPasswordFormValidation, emailFormValidation, nameFormValidation } from '../../components/DashboardComponents/validations';
import { useEffect } from 'react';
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';
import { useAuth } from '../../hooks/useAuth';

export default function CreateUser({ jwt }) {
  const { handleSubmit, register, errors, watch, control, formState: { isSubmitting } } = useForm({ mode: 'all' })
  const toast = useToast()
  const { setCurrentUser, currentUser } = useAuth()

  const { colorMode } = useColorMode()

  const bgColor = { light: '#eeeef2', dark: '#1A202C' }

  const registerRe_passwordFormValidation = {
    required: "Repeat password is required",
    validate: (value: string) => 
    value === watch('password')
    || "Password does not match"
  }  

  type CreateUserFormData = {
    name: string;
    email: string;
    password: string;
    re_password: string;
  };

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (data) => {
    const values = {
      ...data, 
      username: Math.random() * 1000
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values)
    })
    
    const responseData = await response.json()
    if (!response.ok) {
      if (responseData.email) {
        alert(JSON.stringify(responseData?.email[0]))
      } else if (responseData.password) {
        alert(JSON.stringify(responseData?.password[0]))
      }
    } else {
      alert('success emil needs to be verified')
    }
  };       

  return (
    <Box>
      <Head>
        <title>Users | dash.io</title>
        <meta name="description" content="Users page dash.io" />
      </Head>

      <Header />

      <Flex w='100%' my='6' maxW={1480} mx='auto' px='6'>
        <Sidebar />

        <Box
          as='form' 
          flex='1' 
          borderRadius={8} 
          bg={bgColor[colorMode]}
          p={['6', '8']}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading fontWeight='normal' size='lg'>CREATE USER</Heading>

          <Divider my='6' borderColor='gray.700'/>
          <VStack spacing='8'>
            <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
              <Input
                name='name' 
                label='Name'
                error={errors.name}
                ref={register(nameFormValidation)} 
              />
              <Input
                name='email' 
                label='E-mail' 
                type='email' 
                error={errors.email}
                ref={register(emailFormValidation)}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
              <Input
                name='password' 
                label='Password' 
                type='password'
                error={errors.password}
                ref={register(registerPasswordFormValidation)}
              />
              <Input
                name='re_password' 
                label='Repeat password' 
                type='password' 
                error={errors.re_password}
                ref={register(registerRe_passwordFormValidation)}
              />
            </SimpleGrid>

          </VStack>

          <Flex mt='8' justify='space-between'>
            <HStack>
            </HStack>
            <HStack spacing='4' mt='27px'>
              <Link href="/users" passHref>
                <Button colorScheme='gray'>
                  Cancel
                </Button>
              </Link>
              <Button 
                colorScheme='red' 
                type='submit' 
                isLoading={isSubmitting} 
              >
                Save
              </Button>
            </HStack>
          </Flex>

        </Box>
      </Flex>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const jwt = parseCookies(ctx).jwt

  if (!jwt) {
    return { 
      redirect: {
        destination: '/signin-dashboard',
        permanent: false
      }
    }
  }

  return {
    props: {
			jwt: jwt,
		}, 
  }
}