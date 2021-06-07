import { Flex, useBreakpointValue } from '@chakra-ui/react'
import { Profile } from './Profile';
import { Searchbox } from './Searchbox';
import { Notification } from './Notification';
import { Logo } from './Logo';

export function Header() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })
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
      {isWideVersion && <Searchbox />}
      <Flex
        align='center'
        ml='auto'
      >
        <Notification />
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  )
}