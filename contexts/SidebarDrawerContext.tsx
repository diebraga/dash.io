import { useDisclosure, UseDisclosureProps } from "@chakra-ui/hooks";
import { createContext, ReactNode, useContext, useEffect } from "react";
import { useRouter } from "next/router";

interface SiderbarDrawerProviderProps {
  children: ReactNode
}

type SidebarDrawerContextProp = UseDisclosureProps

const SidebarDrawerContext = createContext({} as SidebarDrawerContextProp)

export function SiderbarDrawerProvider({ children }: SiderbarDrawerProviderProps) {
  const disclosure = useDisclosure()
  const router = useRouter()

  useEffect(() => {
    disclosure.onClose()
  }, [router.asPath])

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  )
}

export const useSideBarDrawer = () => useContext(SidebarDrawerContext)