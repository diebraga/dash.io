import { Flex, Box, Heading, Divider, VStack, SimpleGrid, HStack, Button } from '@chakra-ui/react'
import { Header } from "../../components/Header";
import Head from 'next/head'
import Link from "next/link";
import { Sidebar } from "../../components/Sidebar";
import { Input } from "../../components/Form/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { useFormValidation } from '../../hooks/useFormValidation';

export default function CreateUser() {
  const { handleSubmit, register, errors, formState: { isSubmitting } } = useForm({ mode: 'all' })
  const { 
    registerPasswordFormValidation, 
    registerRe_passwordFormValidation, 
    emailFormValidation,
    nameFormValidation
  } = useFormValidation()

  type CreateUserFormData = {
    name: string
    email: string
    password: string
    re_password: string
  }

  const handleCreateUser: SubmitHandler<CreateUserFormData> = (data) => {
    console.log(data)
  }

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

        <Box
          as='form' 
          flex='1' 
          borderRadius={8} 
          bg='gray.800' 
          p={['6', '8']}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading fontWeight='normal' size='lg'>Create user</Heading>

          <Divider my='6' borderColor='gray.700'/>
          <VStack spacing='8'>
            <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
              <Input
                name='name' 
                label='Name and surname'
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

          <Flex mt='8' justify='flex-end'>
            <HStack spacing='4'>
              <Link href="/users" passHref>
                <Button colorScheme='whiteAlpha'>
                  Cancel
                </Button>
              </Link>
              <Button colorScheme='red' type='submit' isLoading={isSubmitting}>
                Save
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}