import { useQuery } from "react-query";

interface UserProp {
  name: string
  email: string
  id: string
  created_at: string
}

export const getUsers = async (): Promise<UserProp[]> => {
  const response = await fetch(`http://localhost:1337/users?_limit=1`)	
  const data = await response.json()

  return data
}

export function useUsers() {
  return useQuery('users', getUsers)
}