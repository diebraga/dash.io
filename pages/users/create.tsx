import { Flex, Box, Heading, Divider, VStack, SimpleGrid, HStack, Button, useToast, Select, FormLabel, useColorMode } from '@chakra-ui/react'
import { Header } from "../../components/Header";
import Head from 'next/head'
import Link from "next/link";
import { Sidebar } from "../../components/Sidebar";
import { Input } from "../../components/Form/Input";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { registerPasswordFormValidation, emailFormValidation, nameFormValidation } from '../../components/validations';
import { useMutation, useQueryClient } from "react-query";

export default function CreateUser() {
  const { handleSubmit, register, errors, watch, control, formState: { isSubmitting } } = useForm({ mode: 'all' })
  const queryClient = useQueryClient()
  const toast = useToast()

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

  const createUser = async (data: CreateUserFormData) => {
    const response = await fetch('http://localhost:1337/users', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    });
    return await response.json();
  };

  const { mutate } = useMutation(createUser, {
    onSuccess: () => {
      toast({
        title: "Success.",
        description: "User created successfully.",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: 'top-right'
      })
    queryClient.invalidateQueries('users')
    },
    onError: () => {
      toast({
        title: "Error.",
        description: "Error occured creating user.",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: 'top-right'
      })
    },
  });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = (data) => {
    const values = {
      ...data, 
      username: Math.random() * 1000
    };
    mutate(values);
  };       


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
          bg={bgColor[colorMode]}
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

          {/* username is required in strapi UUID would be ideal */}
          <Flex mt='8' justify='space-between'>
            <HStack>
              <FormLabel>
                Confirmed
                <Controller
                  defaultValue={`${true}`}
                  as={
                    <Select mt='2'>
                      <option style={{ background: bgColor[colorMode] }} value={`${true}`}>On</option>
                      <option style={{ background: bgColor[colorMode] }} value={`${false}`}>Off</option>
                    </Select>
                  }
                  name="confirmed"
                  control={control} 
                />
              </FormLabel>
            </HStack>
            <HStack spacing='4' mt='27px' color='gray.50'>
              <Link href="/users" passHref>
                <Button bg='gray.200'>
                  Cancel
                </Button>
              </Link>
              <Button bg='red' type='submit' isLoading={isSubmitting}>
                Save
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}