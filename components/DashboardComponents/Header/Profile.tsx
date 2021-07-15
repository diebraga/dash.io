import { Flex, Text, Box, Avatar } from '@chakra-ui/react'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'

interface ProfileProps {
  showProfileData: boolean
}

export function Profile({ showProfileData }: ProfileProps) {
  const { currentUser, setCurrentUser } = useAuth()

  const jwt = parseCookies().jwt

  async function getCurrentUser(): Promise<void> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/users/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });	
    const data = await response.json();
    setCurrentUser(data);	
  }
  
  useEffect(() => {
    getCurrentUser()
  }, [])

  return(
    <>
      <Flex align='center'>
        <Box mr='4' textAlign='right' display={!showProfileData && 'none'}>
          <Text>{currentUser.name} {currentUser.surname}</Text>
          <Text fontSize='small' color='gray.300'>
            {currentUser.email}
          </Text>
        </Box>

        <Avatar size='md' name={`${currentUser.name}${currentUser.surname}`} />
      </Flex>
    </>
  )
}