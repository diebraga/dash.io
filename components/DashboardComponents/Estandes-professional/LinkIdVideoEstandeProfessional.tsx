import { Box, Button, AspectRatio, Text, useColorMode, useToast, HStack, Input, IconButton } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { RiCheckLine, RiCloseLine } from "react-icons/ri";
import { useAuth } from "../../../hooks/useAuth";

type LinkIdVideoProps = {
  getEstande: () => void
  jwt: string
  estande: {
    id_link_video?: string
    link_cartao?: string
    link_portfolio?: string
    link_web?: string
    created_at: string
    updated_at: string
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
  idUserMatchesIdArray: boolean
}

export function LinkIdVideoEstandeProfessional({ getEstande, estande, jwt, idUserMatchesIdArray }: LinkIdVideoProps) {
  const [idVideo, setIdVideo] = useState('');

  const [isEditingVideo, setEditingVideo] = useState(false);

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

  const toast = useToast()

  const [spinner, setSpinner] = useState(false)

  const bgColor = { light: 'gray.50', dark: 'gray.800' }

  async function handleUpdateSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();    
    const regExp = /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*\&)?vi?=|\&vi?=|\?(?:.*\&)?vi?=)([^#\&\?\n\/<>"']*)/i;
    const match = idVideo.match(regExp);
    const formatedUrl = (match && match[1].length==11)? match[1] : false;

    setSpinner(true)
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/estandes-professionals/${estande.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_link_video: formatedUrl,
      }),
    })
    const data = await response.json()  

    if (data.error) {
      if (data.message === "ValidationError") {
        toast({
          title: "Erro!",
          description: `Erro formato invalido!`,
          status: "error",
          duration: 8000,
          isClosable: true,
          position: 'top-right'
        })    
      } else {
        toast({
          title: "Erro!",
          description: `Erro ao editar video!`,
          status: "error",
          duration: 8000,
          isClosable: true,
          position: 'top-right'
        })    
      }
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
    setEditingVideo(false)

    setSpinner(false)    
    
    getEstande();
  }

  return (
    <>
      <Box  p='8' pb='4' bg={bgColor[colorMode]} borderRadius={8}>
        <Text fontSize='lg' mb='4'>Link video</Text>
        <AspectRatio maxW="555px" ratio={4 / 3}>
          <iframe
            src={estande.id_link_video ? (`https://www.youtube.com/embed/${estande.id_link_video}`) : ''}
            allowFullScreen
          />
        </AspectRatio>
        <HStack justify='space-between' mt='3'>
          <HStack>
            {!isEditingVideo && (
              <>
              {/*
              // @ts-ignore */}
              <Text as='span' fontSize='sm'>
              {estande.id_link_video ? (`www.youtube.com/watch?v=${estande.id_link_video}`) : ''}
              </Text>
              </>
            )}
          </HStack>
          {isEditingVideo && (
            <Input
              onChange={e => setIdVideo(e.target.value)}
              placeholder='https://www.youtube...'
              size='sm'
            />
          )}
          {!isEditingVideo ? (
            <Button size='sm' onClick={() => setEditingVideo(true)} disabled={!idUserMatchesIdArray && userRole !== 'Administrator'}>
              Editar
            </Button>                  
          ) : (
            <form onSubmit={handleUpdateSubmit}> 
              <HStack spacing='2'>
              <IconButton 
                aria-label="close editing" 
                onClick={() => setEditingVideo(false)}
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
    </>
  )
}