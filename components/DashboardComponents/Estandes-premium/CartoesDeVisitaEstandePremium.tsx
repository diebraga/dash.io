import { 
  Box, 
  Text, 
  Heading, 
  VStack, 
  Icon, 
  useToast, 
  Button, 
  useColorMode, 
  HStack, 
  CloseButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
 } from "@chakra-ui/react";
import { HiOutlineMail } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../Form/Input";
import { emailFormValidation, nameFormValidation, phoneFormValidation, cargoFormValidation  } from "../validations";
import axios from "axios";
import { useAuth } from "../../../hooks/useAuth";

type EstandeProps = {
  jwt: string
  getEstande: () => Promise<void>
  idUserMatchesIdArray: boolean
  estande: {
    id: string
    cartoes_estandes: Array<{
      nome: string
      cargo: string
      email: string
      telefone: string
      id: string
      estandes_professional: string
    }>
  }
}

type CreateCartaoFormData = {
  nome: string;
  email: string;
  cargo: string;
  telefone: string;
};

export function CartoesDeVisitaEstandesPremium({ estande, jwt, getEstande, idUserMatchesIdArray }: EstandeProps) {
  const { handleSubmit, register, errors, formState: { isSubmitting } } = useForm({ mode: 'all' })
  const [showCreateCartao, setShowCreateCartao] = useState(false)

  const { currentUser } = useAuth()
  let userRole = ''

  if (currentUser) {
    if (currentUser.role) {
      if (currentUser.role.name) {
        userRole = currentUser.role.name
      }
    }
  }

  const { colorMode } = useColorMode()
  const bgColor = { light: 'gray.50', dark: 'gray.800' }

  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef()

  const toast = useToast()

  const handleCreateCartao: SubmitHandler<CreateCartaoFormData> = async (data) => {
    const values = {
      ...data, 
      estandes_premium: estande.id
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/cartoes-estande-professionals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      },
      body: JSON.stringify(values)
    })
    
    const responseData = await response.json()
    console.log(responseData)

    if (responseData.error) {
      toast({
        title: "Erro!",
        description: `Erro por favor tente novamente.`,
        status: "error",
        duration: 8000,
        isClosable: true,
        position: 'top-right'
      })  
    } else {
      toast({
        title: "Sucesso!",
        description: `Cartão criado com sucesso!`,
        status: "success",
        duration: 8000,
        isClosable: true,
        position: 'top-right'
      })  
      setShowCreateCartao(false)
    }
    await getEstande();
  }

  const deleteUser = async (id: string) => {
    const authorization = {
      headers: {
        'Authorization': `Bearer ${jwt}`,
      }
    };

    axios.delete(`${process.env.NEXT_PUBLIC_API}/cartoes-estande-professionals/${id}`, authorization)
      .then(response => {
      estande.cartoes_estandes.filter(cartao => id !== cartao.id)

      if (response.status === 200) {
        toast({
          title: "Sucesso!",
          description: `Item deletado com sucesso.`,
          status: "success",
          duration: 8000,
          isClosable: true,
          position: 'top-right'
        })
      }       
      getEstande()
    })  
  }

  return (
    <>
    <VStack 
      as='form' 
      onSubmit={handleSubmit(handleCreateCartao)} 
      bg={bgColor[colorMode]} 
      borderRadius={8} 
      p='8'
      mt='5'
      display={!showCreateCartao ? 'none' : 'block'}
    >
      <Input 
        name='nome'
        label='Nome'
        type='text'
        error={errors.name}
        ref={register(nameFormValidation)}
      />
      <Input 
        name='cargo'
        label='Cargo'
        type='text'
        error={errors.cargo}
        ref={register(cargoFormValidation)}
      />
      <Input 
        name='email'
        label='E-mail'
        type='email'
        error={errors.email}
        ref={register(emailFormValidation)}
      />
      <Input 
        name='telefone'
        label='Phone'
        placeholder='(xx) x xxxx-xxxx'
        type='text'
        error={errors.telefone}
        ref={register(phoneFormValidation)} 
      />
      <Button type='submit' isLoading={isSubmitting} w='100%'>
        Confirmar
      </Button>
      <Button
        type='button' 
        isLoading={isSubmitting} 
        w='100%' 
        onClick={() => setShowCreateCartao(false)}
        colorScheme='red'
      >
        Cancelar
      </Button>
    </VStack>
    <Button
      type='submit' 
      isLoading={isSubmitting} 
      w='100%' 
      mt='5'
      display={showCreateCartao && 'none'}
      disabled={!idUserMatchesIdArray && userRole !== 'Administrator'}
      onClick={() => setShowCreateCartao(true)}
    >
      Adicionar novo cartão
    </Button>
    {estande.cartoes_estandes?.map(cartao => {
      return (
        <>
        {!showCreateCartao && (
          <VStack
            key={cartao.id} 
            align='start' 
            border='1px' 
            p='4' 
            borderRadius='9' 
            mt='5' 
          >
            <VStack spacing='0.1' align='start' w='100%'>
              <HStack justify='space-between' w='100%'>
                <Heading as='h2' fontSize='lg'>
                  {cartao.nome}
                </Heading>
                <CloseButton onClick={() => setIsOpen(true)} disabled={!idUserMatchesIdArray && userRole !== 'Administrator'}/>
              </HStack>
              <Text as='h3' fontSize='sm'>{cartao.cargo}</Text>
            </VStack>
            <Box as='span' bg='teal.500' w='60px' h='3px' color='transparent'>'</Box>
            <VStack align='start' spacing='0.1'>
              <Text as='p' fontSize='12px'>
                <Icon as={HiOutlineMail} color='teal.500' fontSize='24px' pr='1'/>
                {cartao.email}
              </Text>
              <Text as='p' fontSize='12px'>
                <Icon as={FiPhone} color='teal.500' fontSize='24px' pr='1'/>
                {cartao.telefone}
              </Text>
            </VStack>

            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Deletar cartão
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Você tem certeza que deseja deletar este item?
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancelar
                    </Button>
                    <Button 
                      colorScheme="red" 
                      onClick={() => {deleteUser(cartao.id);onClose()}} 
                      ml={3}
                    >
                      Deletar
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </VStack>        
        )}
        </>
        )
      })}
    </>
  )
}