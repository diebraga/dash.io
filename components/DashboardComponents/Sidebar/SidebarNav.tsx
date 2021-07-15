import { Stack, VStack } from '@chakra-ui/react'
import { RiContactsLine, RiDashboardLine, RiHomeGearFill } from 'react-icons/ri'
import { GoScreenFull } from 'react-icons/go'
import { AiOutlineFundProjectionScreen } from 'react-icons/ai'
import { MdStar, MdStars } from 'react-icons/md'
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

    </Stack>      
  )
}