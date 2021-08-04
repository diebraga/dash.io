import { 
  Box, 
  Spinner, 
  Button, 
  Flex, 
  Heading, 
  Icon, 
  Table, 
  Tbody, 
  Td, 
  Text, 
  Th, 
  Thead, 
  Tr, 
  useColorMode, 
  useToast, 
  Menu, 
  MenuButton, 
  MenuList, 
  MenuItem,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { parseCookies } from "nookies";
import { FormEvent, useEffect, useRef, useState } from "react";
import { RiAddLine } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi"
import { UpdateUserForm } from "../../components/DashboardComponents/Form/UpdateUserForm";
import { Header } from "../../components/DashboardComponents/Header";
import { SearchUserList } from "../../components/DashboardComponents/Header/SearchUserList";
import { Sidebar } from "../../components/DashboardComponents/Sidebar";
import { useAuth } from "../../hooks/useAuth";
import axios from 'axios'
import Router from "next/router";
import Head from 'next/head'
import { Input } from "../../components/DashboardComponents/Form/Input";

type User = {
  id: string
  email: string
  name: string
}

export default function UserList({ jwt }){
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newName, setNewName] = useState('');
  const [apiRequest, setApiRequest] = useState(new Date());
  const [currentPassword, setCurrentPassword] = useState('');

  const toast = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef()

  const [comfirmValue, setComfirmValue] = useState(undefined);
  const [blockValue, setBlockValue] = useState(undefined);

  const [mudarSenha, setMudarSenha] = useState(false)

  const [editing, setEditing] = useState(false);
  const [newId, setId] = useState('');

	const [spinner, setSpinner] = useState(false)

  const [users, setUsers] = useState<User[]>([]);

  async function getUsers(): Promise<void> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/users/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${jwt}`,
        'Accept': 'application/json'
      }
    });	
    const data: User[] = await response.json();
    setUsers(data);	
  }

	const updateUser = async (id: string): Promise<void> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/users/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${jwt}`,
        'Accept': 'application/json'
      }
    });	
    const data = await response.json();
    
    setEditing(true);
    setId(data.id);

    setNewEmail(data.email);
    setComfirmValue(data.confirmed)
    setBlockValue(data.blocked)
    setNewName(data.name)
  }

  const deleteUser = async (id: string) => {
    axios.delete(`${process.env.NEXT_PUBLIC_API}/api/users/delete/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })
      .then(response => {
      users.filter(user => id !== user.id)
      console.log(response.status)
      if (response.status === 204) {
        toast({
          title: "Sucesso!",
          description: `User deleted successfully.`,
          status: "success",
          duration: 8000,
          isClosable: true,
          position: 'top-right'
        })
        setApiRequest(new Date())
      } 
    }).catch(error => {
      if (error.response.status === 401) {
        toast({
          title: "Error!",
          description: `Only administrators have the permission to perform this action.`,
          status: "error",
          duration: 8000,
          isClosable: true,
          position: 'top-right'
        })
      }
    })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>,): Promise<void> {
    event.preventDefault();    
      if (mudarSenha === true) {
        setSpinner(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/users/${newId}`, {
         method: 'PUT',
         headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${jwt}`,
          'Accept': 'application/json'
          },
         body: JSON.stringify({
           email: newEmail,
           password: newPassword,
           name: newName
         }),
       })
       if (response.ok) {
        alert('Success')
      } else {
        alert('Error')
      }
  
       setEditing(false)
 
       setSpinner(false)
 
       setId(''); 
      } else {
        setSpinner(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/users/${newId}`, {
         method: 'PUT',
         headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${jwt}`,
          'Accept': 'application/json'
          },
         body: JSON.stringify({
           email: newEmail,
           name: newName
         }),
       })
       const data = await response.json()
       setEditing(false)

       setSpinner(false)
 
       setId(''); 
      }
    
    await getUsers();
  }

  const { searchName } = useAuth()
  
  const { colorMode } = useColorMode()

  const bgColor = { light: 'gray.50', dark: 'gray.800' }

  useEffect(() => {
    getUsers()
  }, [apiRequest])

  return (
    <Box>
      <Head>
        <title>Users | dash.io</title>
        <meta name="description" content="Users page dash.io" />
      </Head>

      <Header />   
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
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
              spinner={spinner}
              setEditing={setEditing}
              newName={newName}
              setNewName={setNewName}
            />
            </>
          ) : (
            <>
          <Box flex="1" borderRadius={8} bg={bgColor[colorMode]} p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
            USERS
              {/* {!isLoading && isFetching && <Spinner ml='4' color='blue.500' size='sm'/>} */}
            </Heading>

            <Link href="/users/create" passHref>
              <Button 
                as="a" 
                size="sm" 
                fontSize="sm" 
                colorScheme="red" 
                leftIcon={<Icon as={RiAddLine} />}
              >
                NEW USER
              </Button>
            </Link>

          </Flex>
          <>
          {searchName.length > 0 ? (
            <SearchUserList
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
              setId={setId}
              editing={editing}
            />
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
                {users.map(user => {
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
                        Options
                        </MenuButton>
                        <MenuList bg={bgColor[colorMode]}>
                          <MenuItem 
                            color='blue.500'
                            fontSize='sm'
                            onClick={e => updateUser(user.id)} 
                          >
                            Edit
                          </MenuItem>
                          <MenuItem 
                            color='red.500'   
                            onClick={() => setIsOpen(true)}
                            fontSize='sm'
                          >
                            Delete
                          </MenuItem>
                        </MenuList>
                        <AlertDialog
                          isOpen={isOpen}
                          leastDestructiveRef={cancelRef}
                          onClose={onClose}
                        >
                          <AlertDialogOverlay>
                            <AlertDialogContent>
                              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Delete user
                              </AlertDialogHeader>

                              <AlertDialogBody>
                                Are you sure you wanna perform this action? type your current password.
                              </AlertDialogBody>

                              <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                  Cancel
                                </Button>
                                <Button colorScheme="red" onClick={() => {deleteUser(user.id);onClose()}} ml={3}>
                                  Delete
                                </Button>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialogOverlay>
                        </AlertDialog>
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
        </Box>
            </>
          )} 

      </Flex>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const jwt = parseCookies(ctx).jwt

  if (!jwt) {
    return { 
      redirect: {
        destination: '/signin',
        permanent: false
      }
    }
  }

  return {
    props: {
			jwt: jwt,
		}, 
  }
}