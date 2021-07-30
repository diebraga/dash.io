import { Box, Button, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue, useToast, Menu, MenuButton, MenuList, MenuItem, useColorMode } from "@chakra-ui/react";
import { BiChevronDown } from "react-icons/bi"
import { useAuth } from "../../../hooks/useAuth";
import { UpdateUserForm } from "../Form/UpdateUserForm";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { parseCookies } from "nookies";
import { api } from "../../../services/api";

type UpdateUserProps = {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>
  setNewEmail: Dispatch<SetStateAction<string>>
  newEmail: string
  setNewPassword: Dispatch<SetStateAction<string>>
  newPassword: string
  mudarSenha: boolean
  setMudarSenha: Dispatch<SetStateAction<boolean>>
  setComfirmValue: Dispatch<any>
  comfirmValue: any
  blockValue: any
  setBlockValue: Dispatch<any>
  spinner: boolean
  setEditing: Dispatch<SetStateAction<boolean>>
  newName: string
  setNewName: Dispatch<SetStateAction<string>>
  editing: boolean
  setId: Dispatch<SetStateAction<string>>
}

export function SearchUserList({
  handleSubmit, 
  setNewEmail, 
  newEmail, 
  setNewPassword,
  newPassword,
  mudarSenha,
  setMudarSenha,
  setComfirmValue,
  comfirmValue,
  blockValue,
  setBlockValue,
  spinner,
  setEditing, 
  newName,
  setNewName,
  editing,
  setId
}: UpdateUserProps) {
  const { users, searchName, setUsers } = useAuth()
  console.log(users)

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const { colorMode } = useColorMode()
  const bgColor = { light: 'gray.50', dark: 'gray.800' }

  const toast = useToast()

  const jwt = parseCookies().jwt

  const updateUser = async (id: string): Promise<void> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/users/${id}`, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});
    const data = await response.json();

    setEditing(true);
    setId(data.id);

    setNewEmail(data.email);
    setComfirmValue(data.confirmed)
    setBlockValue(data.blocked)
    setNewName(data.name)
  };

  const deleteUser = async (id: string) => {
    const authorization = {
      headers: {
        'Authorization': `Bearer ${jwt}`,
      }
    };

    api.delete(`/users/${id}`, authorization)
      .then(response => {
      const del = users.filter(user => id !== user.id)

      if (response.status === 200) {
        toast({
          title: "Sucesso!",
          description: `Usuário deletado com sucesso.`,
          status: "success",
          duration: 8000,
          isClosable: true,
          position: 'top-right'
        })
        setUsers(del)
      } 
    })  
  }

  return (
    <>
    {editing ? (
      <>
      <UpdateUserForm 
        handleSubmit={handleSubmit}
        setNewEmail={setNewEmail}
        newEmail={newEmail}
        setNewPassword={setNewPassword}
        newPassword={newPassword}
        mudarSenha={mudarSenha}
        setMudarSenha={setMudarSenha}
        comfirmValue={comfirmValue}
        setComfirmValue={setComfirmValue}
        blockValue={blockValue}
        setBlockValue={setBlockValue}
        spinner={spinner}
        setEditing={setEditing}
        newName={newName}
        setNewName={setNewName}      
      />
      </>
    ) : (
      <>
      <Table colorScheme="whiteAlpha">
        <Thead>
          <Tr>
            <Th>Usuários</Th>
            <Th width="8"></Th>
          </Tr>
        </Thead>            
          <Tbody>
          {users.filter(user => {
            if (searchName === '') {
              return user 
            } else if (user.email.toLowerCase().includes(searchName.toLowerCase())) {
              return user
            }
            }).map(user => {
              return (
                <Tr key={user.id}>
                  <Td>
                    <Box>
                      <Text fontWeight='bold'>{user.name}</Text>
                      <Text fontSize='sm' color='gray.300'>{user.email}</Text>
                    </Box>
                  </Td>
                  <Td>
                  <Menu>
                    <MenuButton as={Button} rightIcon={<BiChevronDown />} variant='ghost' fontSize='sm'>
                    Opções
                    </MenuButton>
                    <MenuList bg={bgColor[colorMode]}>
                      <MenuItem 
                        color='blue.500'
                        fontSize='sm'
                        onClick={e => updateUser(user.id)} 
                      >
                        Editar
                      </MenuItem>
                      <MenuItem 
                        color='red.500'   
                        onClick={() => deleteUser(user.id)}
                        fontSize='sm'
                      >
                        Deletar
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>  
              )
            })}
          </Tbody>
      </Table>
      </>
    )}
    </>
  )
}