import { Stack, Box } from '@chakra-ui/react'
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from 'react-icons/ri'
import { LinkNav } from './LinkNav';
import { NavSection } from "./NavSection";

export function Sidebar() {
  return (
    <Box as='aside' w='64' mr='8'>
      <Stack spacing='12' align='flex-start' >
        <NavSection title='GERAL'>
          <LinkNav icon={RiDashboardLine}>
            Dashboard
          </LinkNav>
          <LinkNav icon={RiContactsLine}>
            Users
          </LinkNav>
        </NavSection>
        <NavSection title='AUTOMATION'> 
          <LinkNav icon={RiInputMethodLine}>
            Forms
          </LinkNav>
          <LinkNav icon={RiGitMergeLine}>
            Automation
          </LinkNav>
        </NavSection>
      </Stack>      
    </Box>
  )
}