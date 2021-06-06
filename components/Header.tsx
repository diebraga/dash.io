import { Flex, Input, Text, Icon, HStack, Box, Avatar } from '@chakra-ui/react'
import { RiNotificationLine, RiSearchLine, RiUserAddLine } from "react-icons/ri";

export function Header() {
  return (
    <Flex
      as='header'
      w='100%'
      maxW={1480}
      h='20'
      mx='auto'
      mt='4'
      align='center'
      px='6'
    >
      <Text
        fontWeight='bold'
        letterSpacing='tight'
        fontSize='3xl'
        w='64'
      >
        dash<Text as='span' color='red.500'>.io</Text>
      </Text>

      <Flex
        as="label"
        flex="1"
        py="4"
        px="8"
        ml="6"
        maxWidth={400}
        alignSelf="center"
        color="gray.200"
        position="relative"
        bg="gray.800"
        borderRadius="full"
      >
        <Input
          color='gray.50'
          variant='unstyled'
          px='4'
          mr='4'
          placeholder='Search'
          _placeholder={{ color: 'gray.400' }}
        />
        <Icon as={RiSearchLine} fontSize='20'/>
      </Flex>

      <Flex
        align='center'
        ml='auto'
      >
        <HStack
          spacing='8'
          mx='8'
          pr='8'
          py='1'
          color='gray.300'
          borderRightWidth={1}
          borderColor='gray.700'
        >
          <Icon as={RiNotificationLine} fontSize='20'/>
          <Icon as={RiUserAddLine} fontSize='20'/>
        </HStack>

        <Flex align='center'>
          <Box mr='4' textAlign='right'>
            <Text>Diego Braga</Text>
            <Text fontSize='small' color='gray.300'>
              diebraga.developer@gmail.com
            </Text>
          </Box>

          <Avatar size='md' name='Diego Braga' src='' />
        </Flex>
      </Flex>
    </Flex>
  )
}