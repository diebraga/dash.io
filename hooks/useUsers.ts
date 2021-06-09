import { useQuery } from "react-query";

interface UserProp {
  name: string
  email: string
  id: string
  created_at: string
}

export const getUsers = async (page: number): Promise<UserProp[]> => {
  const response = await fetch(`http://localhost:1337/users?_start=${page}&_limit=1`,)	
  const data = await response.json()

  return data
}

export function useUsers(page: number) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, // 10 min
  })
}