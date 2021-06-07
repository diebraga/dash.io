import { Flex, Button, Box, Text, Heading, Icon, Table, Thead, Tr, Th, Checkbox, Tbody, Td } from '@chakra-ui/react'
import { Header } from "../../components/Header";
import Head from 'next/head'
import { Sidebar } from "../../components/Sidebar";
import { RiAddLine, RiContactsLine, RiEdit2Line } from "react-icons/ri";
import { Pagination } from '../../components/Pagination';

export default function UserList() {
  return (
    <Box>
      <Head>
        <title>Users | Dash.io</title>
        <meta name="description" content="Users page dash.io" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Flex w='100%' my='6' maxW={1480} mx='auto' px='6'>
        <Sidebar />

        <Box flex='1' borderRadius={8} bg='gray.800' p='8'>
          <Flex mb='8' justify='space-between' align='center'>
            <Heading as='h2' size='lg' >
              Users
            </Heading>
            <Button as='a' cursor='pointer' size='sm' fontSize='sm' colorScheme='red' leftIcon={<Icon as={RiAddLine} />}>
              New user
            </Button>
          </Flex>

          <Table colorScheme='whiteAlpha'>
            <Thead>
              <Tr>
                <Th px='6' color='gray.300' width='8'>
                  <Checkbox colorScheme='red'/>
                </Th>
                <Th>User</Th>
                <Th>Register date</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td px='6'>
                  <Checkbox colorScheme='red'/>
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight='bold'>Diego Braga</Text>
                    <Text fontSize='sm' color='gray.300'>diebraga.developer@gmail.com</Text>
                  </Box>
                </Td>
                <Td>12 may 2121</Td>
                <Td>
                  <Button 
                    as='a' 
                    cursor='pointer'
                    size='sm' 
                    fontSize='sm' 
                    variant='ghost'
                    _hover={{ opacity: '0.5' }}
                    leftIcon={<Icon as={RiEdit2Line} fontSize='17' />}
                  >
                    Edit
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <Pagination />
        </Box>
      </Flex>
    </Box>
  )
}