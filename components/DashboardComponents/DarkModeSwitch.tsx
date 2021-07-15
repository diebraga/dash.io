import { useColorMode, Icon, Tooltip } from '@chakra-ui/react'
import { CgMoon, CgSun } from "react-icons/cg";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  
  return (
    <>
    {colorMode === 'dark' ? (
      <Tooltip 
        label="Desativar dark-mode" 
        placement="bottom-start" 
        aria-label="destativa dark-mode" 
      >
        <span>
          <Icon
            as={CgMoon}
            fontSize='20'
            cursor='pointer'
            onClick={toggleColorMode}
            _hover={{ color: 'blue.500' }}
          />    
        </span>
      </Tooltip>
    ) : (
      <Tooltip 
        label="Ativar dark-mode" 
        placement="bottom-start" 
        aria-label="ativar dark-mode" 
      >
        <span>
          <Icon
            as={CgSun}
            fontSize='20'
            cursor='pointer'
            onClick={toggleColorMode}
            _hover={{ color: 'blue.500' }}
          />    
        </span>
      </Tooltip>
    )}
    </>
  )
}
