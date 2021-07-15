import { destroyCookie } from "nookies";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import Router from 'next/router'

type Evento = {
  nome_do_evento: string;
  nome_organizador: string;
  descricao_organizador: string;
  dia_inicio_do_evento: string;
  dia_final_do_evento: string;
  horario_inicio_do_evento: string;
  horario_final_do_evento: string;
  id: string;
  imagem_1:{
    url: string
  }
  imagem_2:{
    url: string
  }
  imagem_3:{
    url: string
  }
  imagem_4:{
    url: string
  }
  imagem_principal: {
    url: string;
  }
  imagem_organizador: string;
  
  link_facebook: string;
  link_instagram: string;
  link_linkedin: string;
  link_video: string;
  titulo_texto_1: string;
  texto_1: string;
  titulo_texto_2: string;
  texto_2: string;
  titulo_texto_video: string;
  texto_video: string;
}

type CurrentUser = {
  id: string
  confirmed?: boolean
  blocked?: boolean
  created_at?: string
  updated_at?: string
  email?: string
  name?: string
  surname?: string
  role?: {
    description?: string
    type?: string
    name?: string
  }
  avatar?: {
    url: string
  }
}

interface AuthProviderProps {
  children: ReactNode;
}

type AuthContextData = {
  currentUser: CurrentUser
  setCurrentUser: Dispatch<SetStateAction<CurrentUser>>
  signOut: () => void
  users: CurrentUser[]
  setUsers: Dispatch<SetStateAction<CurrentUser[]>>
  searchName: string
  setSearchName: Dispatch<SetStateAction<string>>
  setCurrentEvent: Dispatch<SetStateAction<{}>>
  currentEvent: Evento
  isAuthenticated: boolean
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps){
  const [currentUser, setCurrentUser] = useState({} as CurrentUser)
  const [users, setUsers] = useState<CurrentUser[]>([])
  const [searchName, setSearchName] = useState('')
  const [currentEvent, setCurrentEvent] = useState({} as Evento);
  let isAuthenticated = !!currentUser

  function signOut() {
    destroyCookie(null, 'jwt')
    Router.push('/evento')
  }

  return (
    <AuthContext.Provider value={{
      currentUser,
      setCurrentUser,
      signOut,
      users, 
      setUsers,
      searchName,
      setSearchName,
      currentEvent,
      setCurrentEvent,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)