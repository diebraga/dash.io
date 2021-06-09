import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { Profile } from './Profile';
import { Searchbox } from './Searchbox';
import { Notification } from './Notification';
import { Logo } from './Logo';
import { useSideBarDrawer } from '../../hooks/useSidebarDrawer';
import { RiMenuLine } from 'react-icons/ri';

export function Header() {
  const { onOpen } = useSideBarDrawer()

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
      {!isWideVersion && (
        <IconButton
          aria-label='Open menu'
          icon={<Icon as={RiMenuLine} />}
          fontSize='24'
          variant='unstyled'
          onClick={onOpen}
          mr='2'
        />
      )}
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