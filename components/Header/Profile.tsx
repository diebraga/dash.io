import { Flex, Text, Box, Avatar } from '@chakra-ui/react'

interface ProfileProps {
  showProfileData: boolean
}

export function Profile({ showProfileData }: ProfileProps) {
  return(
    <>
      <Flex align='center'>
        <Box mr='4' textAlign='right' display={!showProfileData && 'none'}>
          <Text>Diego Braga</Text>
          <Text fontSize='small' color='gray.300'>
            diebraga.developer@gmail.com
          </Text>
        </Box>

        <Avatar size='md' name='Diego Braga' src='' />
      </Flex>
    </>
  )
}