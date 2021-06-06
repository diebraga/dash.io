import { Flex, Text, Stack, Box, Link, Icon } from '@chakra-ui/react'
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from 'react-icons/ri'

export function Sidebar() {
  return (
    <Box as='aside' w='64' mr='8'>
      <Stack spacing='12' align='flex-start' >
        <Box> 
          <Text color='gray.400' fontWeight='bold' fontSize='small'>GERAL</Text>
          <Stack spacing='4' mt='8' align='stretch'>
            <Link display='flex' align='center'>
              <Icon as={RiDashboardLine} fontSize='20'/>
              <Text ml='4' fontWeight='medium'>Dashboard</Text>
            </Link>
            <Link display='flex' align='center'>
              <Icon as={RiContactsLine} fontSize='20'/>
              <Text ml='4' fontWeight='medium'>Users</Text>
            </Link>
          </Stack>
        </Box>
        <Box> 
          <Text color='gray.400' fontWeight='bold' fontSize='small'>AUTOMATION</Text>
          <Stack spacing='4' mt='8' align='stretch'>
            <Link display='flex' align='center'>
              <Icon as={RiInputMethodLine} fontSize='20'/>
              <Text ml='4' fontWeight='medium'>Forms</Text>
            </Link>
            <Link display='flex' align='center'>
              <Icon as={RiGitMergeLine} fontSize='20'/>
              <Text ml='4' fontWeight='medium'>Automation</Text>
            </Link>
          </Stack>
        </Box>
      </Stack>
      
    </Box>
  )
}