import { Flex, Input, Icon, useColorMode } from '@chakra-ui/react'
import { RiSearchLine } from "react-icons/ri";

export function Searchbox() {
  const { colorMode } = useColorMode()

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
        color="gray.200"
        position="relative"
        bg={bgColor[colorMode]}
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
    </>
  )
}