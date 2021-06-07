import { Flex } from '@chakra-ui/react'
import { Profile } from './Profile';
import { Searchbox } from './Searchbox';
import { Notification } from './Notification';
import { Logo } from './Logo';

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
      <Logo />
      <Searchbox />
      <Flex
        align='center'
        ml='auto'
      >
        <Notification />
        <Profile />
      </Flex>
    </Flex>
  )
}