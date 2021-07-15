import { createContext, Dispatch, ReactNode, SetStateAction, useContext } from 'react'
import { useState } from 'react'

interface MiniplayProviderProp {
  children: ReactNode
}

interface MiniplayContextProps {
  videoId: string
  videoIsOpen: boolean
  setVideoIsOpen: Dispatch<SetStateAction<boolean>>
  setVideoId: Dispatch<SetStateAction<string>>
}

export const MiniPlayContext = createContext({} as MiniplayContextProps)

export function MiniplayProvider({ children }: MiniplayProviderProp) {
  const [videoId, setVideoId] = useState('')
  const [videoIsOpen, setVideoIsOpen] = useState(false)

  return(
    <MiniPlayContext.Provider value={{
      videoId,
      videoIsOpen,
      setVideoIsOpen,
      setVideoId
  }}>
      {children}
    </MiniPlayContext.Provider>
  )
}

export function useMiniplay() {
  const context = useContext(MiniPlayContext)

  return context
}
