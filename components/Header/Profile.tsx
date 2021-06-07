import { Flex, Text, Box, Avatar } from '@chakra-ui/react'

export function Profile() {
  return(
    <>
      <Flex align='center'>
        <Box mr='4' textAlign='right'>
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