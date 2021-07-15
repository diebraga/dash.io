import { Box, Button, Flex, Heading, Icon, Input, IconButton, useToast } from "@chakra-ui/react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { RiEditBoxLine, RiCloseLine, RiCheckLine } from 'react-icons/ri'
import { useAuth } from "../../../hooks/useAuth";

type UpdateResponse = {
  link_web?: string
  link_cartao?: string
  link_portfolio?: string
  error?: object
}

type LinksDashboardProps = {
  getEstande: () => Promise<void>
  jwt: string
  estande: {
    id_link_video?: string
    link_cartao?: string
    link_portfolio?: string
    link_web?: string
    created_at: string
    updated_at: string
    nome_da_empresa: string
    id: string
    name: string
    imagem_cartao: {
      url: string
    }
    imagem_video: {
      url: string
    }
    imagem_web: {
      url: string
    }
    imagem_portfolio: {
      url: string
    }
    logo_da_empresa: {
      url: string
    }  
  }
  companyName: string
  setCompanyName: Dispatch<SetStateAction<string>>
  idUserMatchesIdArray: boolean
}

export function EditCompanyNameEsProf({ estande, companyName, setCompanyName, jwt, getEstande, idUserMatchesIdArray }: LinksDashboardProps) {
  const { currentUser } = useAuth()
  let userRole = ''

  if (currentUser) {
    if (currentUser.role) {
      if (currentUser.role.name) {
        userRole = currentUser.role.name
      }
    }
  }

  const [isEditingCompanyName, setIsEditingCompanyName] = useState(false);

  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false);

  async function handleUpdateSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();    
    setIsLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/estandes-professionals/${estande.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome_da_empresa: companyName,
        }),
      })
      const data: UpdateResponse = await response.json()  

      if (data.error) {
        toast({
          title: "Erro!",
          description: `Erro ao editar link!`,
          status: "error",
          duration: 8000,
          isClosable: true,
          position: 'top-right'
        })    
      } else {
        toast({
          title: "Sucesso!",
          description: `Link editado com sucesso!`,
          status: "success",
          duration: 8000,
          isClosable: true,
          position: 'top-right'
        })  
      }    
      setIsEditingCompanyName(false)
      setIsLoading(false)
    
    await getEstande();
  }

  return (
    <Box p='8'>
      <Heading size="lg" fontWeight="normal" mb='1.5'>
        {estande.name}
      </Heading>
      {!isEditingCompanyName ? (
        <Button
          rightIcon={<Icon as={RiEditBoxLine}/>} 
          onClick={() => setIsEditingCompanyName(true)} 
          variant='link' 
          fontSize='lg' 
          disabled={!idUserMatchesIdArray && userRole !== 'Administrator'}
          color='gray.300'
        >
          {estande.nome_da_empresa}
        </Button>              
      ) : (
        <>
        {/*
        @ts-ignore */}
        <Flex as='form' onSubmit={handleUpdateSubmit}>
          <Input 
            w='200px'
            size='sm'
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
            mr='1'
          />
          <IconButton 
            aria-label="close editing" 
            onClick={() => setIsEditingCompanyName(false)}
            size='sm'
            icon={<RiCloseLine />} 
            mr='1'
          />
          <IconButton 
            aria-label="confirm editing" 
            type='submit'
            size='sm'
            icon={<RiCheckLine />} 
            isLoading={isLoading}
          />
        </Flex>
        </>
      )}
    </Box>
  )
}