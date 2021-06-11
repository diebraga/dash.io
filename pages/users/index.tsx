import { Box, Spinner, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue, useColorMode } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiAddLine, RiEdit2Line } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { useUsers } from "../../hooks/useUsers";

export default function UserList(){
  const [page, setPage] = useState(1)
  const [totalRegister, setTotalRegister] = useState(0)
  const { data, isLoading, error, isFetching } = useUsers(page)
  
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const { colorMode } = useColorMode()

  const bgColor = { light: 'gray.50', dark: 'gray.800' }
  
  const getCount = async () => {
    const countResponse = await fetch(`http://localhost:1337/users/count`,)	
    const totalCount = await countResponse.json()

    setTotalRegister(totalCount)
  }  

  useEffect(() => {
    getCount()
  }, [])

  return (
    <Box>
      <Header />      

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg={bgColor[colorMode]} p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              User
              {!isLoading && isFetching && <Spinner ml='4' color='red.500' size='sm'/>}
            </Heading>

            <Link href="/users/create" passHref>
              <Button 
                as="a" 
                size="sm" 
                fontSize="sm" 
                bg="red.500" 
                color='gray.50'
                leftIcon={<Icon as={RiAddLine} />}
              >
                New user
              </Button>
            </Link>

          </Flex>
          {isLoading ? (
            <Flex justify='center'>
              <Spinner color='red.500' size='lg' thickness='5px' />
            </Flex>
          ) : error ? (
            <Flex justify='center'>
              <Text>Error loading users.</Text>
            </Flex>
          ) : (
          <>
          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th px={["4", "4", "6"]} color="gray.300" width="8">
                  <Checkbox colorScheme="red" />
                </Th>
                <Th>Usuários</Th>
                {isWideVersion && <Th>Register date</Th>}
                <Th width="8"></Th>
              </Tr>
            </Thead>            
              <Tbody>
                {data.map(user => {
                  return (
                    <Tr key={user.id}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme="red" />           
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight='bold'>{user.name}</Text>
                          <Text fontSize='sm' color='gray.300'>diebraga.developer@gmail.com</Text>
                        </Box>
                      </Td>
                      {isWideVersion && <Td>{new Date(user.created_at).toLocaleDateString(
                        'en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        }
                      )}</Td>}
                      <Td>
                      {isWideVersion && <Button 
                        as='a' 
                        cursor='pointer'
                        size='sm' 
                        fontSize='sm' 
                        variant='ghost'
                        _hover={{ opacity: '0.5' }}
                        leftIcon={<Icon as={RiEdit2Line} fontSize='17' />}
                      >
                        Edit
                      </Button>}
                    </Td>
                  </Tr>  
                  )
                })}
              </Tbody>
          </Table>
                  
          <Pagination 
            totalCountOfRegisters={totalRegister}
            currentPage={page}
            onPageChange={setPage}
          />
          </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}