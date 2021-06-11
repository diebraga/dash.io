import { Stack } from '@chakra-ui/react'
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from 'react-icons/ri'
import { FiLogOut } from 'react-icons/fi'
import { LinkNav } from './LinkNav';
import { NavSection } from "./NavSection";
import { destroyCookie } from 'nookies';
import { useRouter } from "next/router";

export function SidebarNav() {
  const router = useRouter()

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