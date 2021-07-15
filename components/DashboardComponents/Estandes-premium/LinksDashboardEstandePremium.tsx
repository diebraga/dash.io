import { Box, Button, Text, useColorMode, useToast, HStack, Icon, Input, IconButton, VStack, Link } from "@chakra-ui/react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { RiCheckLine, RiCloseLine, RiExternalLinkLine } from "react-icons/ri";
import { useAuth } from "../../../hooks/useAuth";

type LinksDashboardProps = {
  getEstande: () => Promise<void>
  jwt: string
  linkPedestal: string
  estande: {
    id_link_video?: string
    link_cartao?: string
    link_portfolio?: string
    link_pedestal?: string
    link_web?: string
    created_at: string
    updated_at: string
    id: string
    name: string
    imagem_cartao: {
      url: string
    }
    imagem_pedestal: {
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
    logo_empresa: {
      url: string
    }  
  }
  linkPortfolio: string
  webSite: string
  setLinkPortfolio: Dispatch<SetStateAction<string>>
  setWebSite: Dispatch<SetStateAction<string>>
  setLinkCartao: Dispatch<SetStateAction<string>>
  linkCartao: string
  setLinkPedestal: Dispatch<SetStateAction<string>>
  idUserMatchesIdArray: boolean
}

type UpdateResponse = {
  link_web?: string
  link_cartao?: string
  link_portfolio?: string
  error?: object
}

export function LinksDashboardEstandePremium({ 
  getEstande, 
  jwt, 
  estande, 
  linkPortfolio,
  setLinkPortfolio,
  webSite,
  setWebSite,
  linkCartao,
  setLinkCartao,
  setLinkPedestal,
  linkPedestal,
  idUserMatchesIdArray
}: LinksDashboardProps) {

  const [isEditingPortfolio, setEditingPortfolio] = useState(false);
  const [isEditingwebsite, setEditingWebsite] = useState(false);
  const [isEditingCartao, setEditingCartao] = useState(false);
  const [isEditingPedestal, setEditingPedestal] = useState(false);

  const { currentUser } = useAuth()
  let userRole = ''

  if (currentUser) {
    if (currentUser.role) {
      if (currentUser.role.name) {
        userRole = currentUser.role.name
      }
    }
  }

  const toast = useToast()
  const { colorMode } = useColorMode()
  const [spinner, setSpinner] = useState(false)

  const bgColor = { light: 'gray.50', dark: 'gray.800' }

  async function handleUpdateSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();    
      setSpinner(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/estandes-premiums/${estande.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          link_web: webSite,
          link_portfolio: linkPortfolio,
          link_cartao: linkCartao,
          link_pedestal: linkPedestal
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
      setEditingPortfolio(false)
      setEditingWebsite(false)
      setEditingCartao(false)
      setEditingPedestal(false)

    setSpinner(false)    
    
    await getEstande();
  }

  return (
    <>
    <Box>
    <Box p='8' pb='4' bg={bgColor[colorMode]} borderRadius={8} maxHeight='180px'>
    <Text fontSize='lg' mb='4'>Link Website</Text>
    <HStack justify='space-between' mt='3'>
      <VStack align='start'>{/*
        // @ts-ignore */}
        {!isEditingwebsite && (
          <>
          <Text as='span' fontSize='md'>{estande.link_web}</Text>
          {/*
          // @ts-ignore */}
            <Button as={Link} rightIcon={<Icon as={RiExternalLinkLine} boxSize='18px'/>} variant='link' href={`${webSite}`} target='_blank'>
              Visitar
            </Button>                      
          </>
        )} 
      </VStack>
      {isEditingwebsite && (
        <Input
          value={webSite}
          onChange={e => setWebSite(e.target.value)}
          size='sm'
        />
      )}
      {!isEditingwebsite ? (
        <Button size='sm' onClick={() => setEditingWebsite(true)} disabled={!idUserMatchesIdArray && userRole !== 'Administrator'}>
          Editar
        </Button>                  
      ) : (
        <form onSubmit={handleUpdateSubmit}> 
          <HStack spacing='2'>
          <IconButton 
            aria-label="close editing" 
            onClick={() => setEditingWebsite(false)}
            size='sm'
            icon={<RiCloseLine />} 
          />
          <IconButton 
            aria-label="confirm editing" 
            type='submit'
            isLoading={spinner}
            size='sm'
            icon={<RiCheckLine />} 
          />
          </HStack>
        </form>
      )}
    </HStack>/
  </Box>
  </Box>

  <Box>
  <Box p='8' pb='4' bg={bgColor[colorMode]} borderRadius={8} maxHeight='180px'>
    <Text fontSize='lg' mb='4'>Link Pedestal</Text>
    <HStack justify='space-between' mt='3'>
      <VStack align='start'>{/*
        // @ts-ignore */}
        {!isEditingPedestal && (
          <>
          <Text fontSize='md'>{estande.link_pedestal}</Text>
          {/*
          // @ts-ignore */}
            <Button as={Link} rightIcon={<Icon as={RiExternalLinkLine} boxSize='18px'/>} variant='link' href={`${linkPedestal}`} target='_blank'>
              Visitar
            </Button>                      
          </>
        )} 
      </VStack>
      {isEditingPedestal && (
        <Input
          value={linkPedestal}
          onChange={e => setLinkPedestal(e.target.value)}
          size='sm'
        />
      )}
      {!isEditingPedestal ? (
        <Button size='sm' onClick={() => setEditingPedestal(true)} disabled={!idUserMatchesIdArray && userRole !== 'Administrator'}>
          Editar
        </Button>                  
      ) : (
        <form onSubmit={handleUpdateSubmit}> 
          <HStack spacing='2'>
          <IconButton 
            aria-label="close editing" 
            onClick={() => setEditingPedestal(false)}
            size='sm'
            icon={<RiCloseLine />} 
          />
          <IconButton 
            aria-label="confirm editing" 
            type='submit'
            isLoading={spinner}
            size='sm'
            icon={<RiCheckLine />} 
          />
          </HStack>
        </form>
      )}
    </HStack>
  </Box>
  </Box>

  <Box>
  <Box p='8' pb='4' bg={bgColor[colorMode]} borderRadius={8} maxHeight='180px'>
    <Text fontSize='lg' mb='4'>Link Portfolio</Text>
    <HStack justify='space-between' mt='3'>
      <VStack align='start'>/{/*
        // @ts-ignore */}
        {!isEditingPortfolio && (
          <>
          {/*
          // @ts-ignore */}
          <Text as='span' fontSize='md'>{estande.link_portfolio}</Text>
          {/*
          // @ts-ignore */}
            <Button as={Link} rightIcon={<Icon as={RiExternalLinkLine} boxSize='18px'/>} variant='link' href={`${estande.link_portfolio}`} target='_blank'>
              Visitar
            </Button>
          </>
        )} 
      </VStack>
      {isEditingPortfolio && (
        <Input
          value={linkPortfolio}
          onChange={e => setLinkPortfolio(e.target.value)}
          size='sm'
        />
      )}
      {!isEditingPortfolio ? (
        <Button size='sm' onClick={() => setEditingPortfolio(true)} disabled={!idUserMatchesIdArray && userRole !== 'Administrator'}>
          Editar
        </Button>                  
      ) : (
        <form onSubmit={handleUpdateSubmit}> 
          <HStack spacing='2'>
          <IconButton 
            aria-label="close editing" 
            onClick={() => setEditingPortfolio(false)}
            size='sm'
            icon={<RiCloseLine />} 
          />
          <IconButton 
            aria-label="confirm editing" 
            type='submit'
            isLoading={spinner}
            size='sm'
            icon={<RiCheckLine />} 
          />
          </HStack>
        </form>
      )}
    </HStack>
  </Box>
  </Box>

  <Box>
  <Box p='8' pb='4' bg={bgColor[colorMode]} borderRadius={8}>
    <Text fontSize='lg' mb='4'>Link cartão</Text>
    <HStack justify='space-between' mt='3'>
      <VStack align='start'>{/*
        // @ts-ignore */}
        {!isEditingCartao && (
          <>
          {/*
          // @ts-ignore */}
          <Text as='span' fontSize='md'>{estande.link_cartao}</Text>
          {/*
          // @ts-ignore */}
            <Button as={Link} rightIcon={<Icon as={RiExternalLinkLine} boxSize='18px'/>} variant='link' href={`${estande.link_cartao}`} target='_blank'>
              Visitar
            </Button>
          </>
        )} 
      </VStack>
      {isEditingCartao && (
        <Input
          value={linkCartao}
          onChange={e => setLinkCartao(e.target.value)}
          size='sm'
        />
      )}
      {!isEditingCartao ? (
        <Button size='sm' onClick={() => setEditingCartao(true)} disabled={!idUserMatchesIdArray && userRole !== 'Administrator'}>
          Editar
        </Button>                  
      ) : (
        <form onSubmit={handleUpdateSubmit}> 
          <HStack spacing='2'>
          <IconButton 
            aria-label="close editing" 
            onClick={() => setEditingCartao(false)}
            size='sm'
            icon={<RiCloseLine />} 
          />
          <IconButton 
            aria-label="confirm editing" 
            type='submit'
            isLoading={spinner}
            size='sm'
            icon={<RiCheckLine />} 
          />
          </HStack>
        </form>
      )}
    </HStack>
  </Box>
  </Box>
  </>
  )
}