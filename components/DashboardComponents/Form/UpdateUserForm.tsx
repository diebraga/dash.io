import { Link as ChakraLink, InputGroup, Box, Button, Flex, Heading, useColorMode, Input, HStack, FormLabel, SimpleGrid, VStack, Divider, InputRightElement } from "@chakra-ui/react";
import React, { Dispatch, FormEvent } from "react";

type UpdateUserProps = {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>
  setNewEmail: Dispatch<React.SetStateAction<string>>
  newEmail: string
  setNewPassword: Dispatch<React.SetStateAction<string>>
  newPassword: string
  mudarSenha: boolean
  setMudarSenha: Dispatch<React.SetStateAction<boolean>>
  spinner: boolean
  setEditing: Dispatch<React.SetStateAction<boolean>>
  newName: string
  setNewName: Dispatch<React.SetStateAction<string>>
}

export function UpdateUserForm({ 
  handleSubmit, 
  setNewEmail, 
  newEmail, 
  setNewPassword,
  newPassword,
  mudarSenha,
  setMudarSenha,
  spinner,
  setEditing, 
  newName,
  setNewName,
  }: UpdateUserProps) {
  const { colorMode } = useColorMode()

  const bgColor = { light: '#eeeef2', dark: '#1A202C' }  
  return (
    <>
    <Box
      flex='1' 
      borderRadius={8} 
      bg={bgColor[colorMode]}
      p={['6', '8']}
    >
      <form onSubmit={handleSubmit}>
      <Heading fontWeight='normal' size='lg'>EDIT USER</Heading>

      <Divider my='6' borderColor='gray.700'/>
      <VStack spacing='8'>
        <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
        <FormLabel>
            Name 
          <Input
            type="text"
            onChange={e => setNewName(e.target.value)}
            value={newName}
            placeholder="Name"
            required
          />
          </FormLabel>
          <FormLabel>
            E-mail
          <Input
            type="email"
            onChange={e => setNewEmail(e.target.value)}
            value={newEmail}
            required
          />
          </FormLabel>
        </SimpleGrid>

        <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
          <FormLabel>
            New password
          <InputGroup>
            <Input
              pr="4.5rem"
              type='text'
              onChange={e => setNewPassword(e.target.value)}
              value={newPassword}
              placeholder="New password"
              required
              disabled={!mudarSenha}
            />
            {!mudarSenha ? (
              <InputRightElement width="4.5rem" onClick={() => {setMudarSenha(true)}}>
                <ChakraLink fontSize="sm" color='red.500'>
                  Change
                </ChakraLink>
              </InputRightElement>
              ) : (
              <InputRightElement width="4.5rem" onClick={() => {setMudarSenha(false)}}>
                <ChakraLink fontSize="sm" color='red.500'>
                  Cancel
                </ChakraLink>
              </InputRightElement>
              )}
            </InputGroup>
          </FormLabel>
        </SimpleGrid>
        <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%' />
      </VStack>

      <Flex mt='20px' justify='flex-end'>
        <HStack spacing='4' mt='27px'>
          <Button colorScheme='gray' onClick={() => setEditing(false)}>
            Cancel
          </Button>
          <Button colorScheme='red' type='submit' isLoading={spinner}>
            Save
          </Button>
        </HStack>
      </Flex>
      </form>
    </Box>    

    </>
  )
}