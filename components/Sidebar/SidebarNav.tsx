import { Stack } from '@chakra-ui/react'
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from 'react-icons/ri'
import { LinkNav } from './LinkNav';
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing='12' align='flex-start' >
      <NavSection title='GERAL'>
        <LinkNav icon={RiDashboardLine} href='/dashboard'>
          Dashboard
        </LinkNav>
        <LinkNav icon={RiContactsLine} href='/users'>
          Users
        </LinkNav>
      </NavSection>
      <NavSection title='AUTOMATION'> 
        <LinkNav icon={RiInputMethodLine} href='/forms'>
          Forms
        </LinkNav>
        <LinkNav icon={RiGitMergeLine} href='/automation'>
          Automation
        </LinkNav>
      </NavSection>
    </Stack>      
  )
}