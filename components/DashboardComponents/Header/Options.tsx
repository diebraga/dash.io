import { Icon, HStack, Tooltip, Link, Box } from '@chakra-ui/react'
import { RiHome2Fill } from "react-icons/ri";
import { ImExit } from "react-icons/im";
import { DarkModeSwitch } from '../DarkModeSwitch';
import { useAuth } from '../../../hooks/useAuth';

export function Options() {
  const { signOut } = useAuth()

  return(
    <>
      <HStack
        spacing={['2', '3', '8', '8']}
        mx={['2', '3', '8', '8']}
        pr={['2', '3', '8', '8']}
        py='1'
        color='gray.300'
        borderRightWidth={1}
        borderColor='gray.700'
      >  
        <Tooltip 
          label="Logout" 
          placement="bottom-start" 
          aria-label="logout" 
        >
          <Link as='span' onClick={signOut}>
            <Icon as={ImExit} fontSize='20' _hover={{ color: 'red.500' }} cursor='pointer'/>
          </Link>
        </Tooltip>

        <Link href='/'>
          <Tooltip 
            label="Home" 
            placement="bottom-start" 
            aria-label="acessar home page" 
          > 
            <span>
              <Icon as={RiHome2Fill} fontSize='20' _hover={{ color: 'blue.500' }} cursor='pointer'/>
            </span>
          </Tooltip>
        </Link>
        <DarkModeSwitch />
      </HStack>
    </>
  )
}