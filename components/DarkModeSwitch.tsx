import { useColorMode, Icon } from '@chakra-ui/react'
import { CgMoon, CgSun } from "react-icons/cg";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  
  return (
    <>
    {colorMode === 'dark' ? (
      <Icon
        as={CgMoon}
        fontSize='20'
        cursor='pointer'
        onClick={toggleColorMode}
      />    
    ) : (
      <Icon
        as={CgSun}
        fontSize='20'
        cursor='pointer'
        onClick={toggleColorMode}
      />    
    )}
    </>
  )
}
