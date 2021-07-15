import { Flex, Input, Icon, useColorMode } from '@chakra-ui/react'
import { parseCookies } from 'nookies';
import { useEffect } from 'react';
import { RiSearchLine } from "react-icons/ri";
import { useAuth } from '../../../hooks/useAuth';

export function Searchbox() {
  const { colorMode } = useColorMode()

  const { setUsers, setSearchName } = useAuth()

  const getUsers = async () => {
    const jwt = parseCookies().jwt

    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/users`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })

    const data = await response.json()
    setUsers(data)
  } 

  useEffect(() => {
    getUsers()
  }, [])
 
  const bgColor = { light: 'gray.50', dark: 'gray.800' }

  return(
    <>
      <Flex
        as="label"
        flex="1"
        py="4"
        px="8"
        ml="6"
        maxWidth={400}
        alignSelf="center"
        position="relative"
        bg={bgColor[colorMode]}
        borderRadius="full"
      >
        <Input
          variant='unstyled'
          px='4'
          mr='4'
          placeholder='Buscar por email...'
          _placeholder={{ color: 'gray.400' }}
          onChange={event => setSearchName(event.target.value)}
        />
        <Icon as={RiSearchLine} fontSize='20'/>
      </Flex>
    </>
  )
}