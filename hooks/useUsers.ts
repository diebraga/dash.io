import { parseCookies } from "nookies";
import { useQuery } from "react-query";

interface UserProp {
  name: string
  email: string
  id: string
  created_at: string
  surname: string
}

export const getUsers = async (page: number): Promise<UserProp[]> => {
  const jwt = parseCookies().jwt

  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/users?_start=${page}&_limit=5`, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })

  const data = await response.json()

  return data
}

export function useUsers(page: number) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, // 10 min
  })
}