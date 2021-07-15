import { Box, Image, AspectRatio, Text, useToast, HStack, Input, IconButton, useColorMode } from "@chakra-ui/react";
import { RiCheckLine, RiCloseLine } from "react-icons/ri";
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { CartoesDeVisitaEstandesProfessional } from "./CartoesDeVisitaEstandeProfessional";
import { useAuth } from "../../../hooks/useAuth";

type ImagesEstandesProfessionalProps = {
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
    cartoes_estande_professionals: Array<{
      nome: string
      cargo: string
      email: string
      telefone: string
      id: string
      estandes_professional: string
    }>
  }
  imageVideo: string
  imageCartao: string
  imagePortfolio: string
  imageLogoDaEmpresa: string
  idUserMatchesIdArray: boolean
}

export function ImagesEstandesProfessional({ 
  jwt, 
  estande, 
  getEstande, 
  imageVideo, 
  imageCartao, 
  imagePortfolio,
  imageLogoDaEmpresa,
  idUserMatchesIdArray
  }: ImagesEstandesProfessionalProps) {
  const { register, handleSubmit, reset, formState } = useForm({ mode: 'all' })
  const { register: register2, handleSubmit: handleSubmit2, reset: reset2, formState: formState2  } = useForm({ mode: 'all' })
  const { register: register3, handleSubmit: handleSubmit3, reset: reset3, formState: formState3  } = useForm({ mode: 'all' })
  const { register: register4, handleSubmit: handleSubmit4, reset: reset4, formState: formState4  } = useForm({ mode: 'all' })

  const { currentUser } = useAuth()
  let userRole = ''

  if (currentUser) {
    if (currentUser.role) {
      if (currentUser.role.name) {
        userRole = currentUser.role.name
      }
    }
  }

	const [strapiField, setStrapiField] = useState('')

  const [editingImageCartao, setEditingImageCartao] = useState(false)
  const [editingImageVideo, setEditingImageVideo] = useState(false)
  const [editingLogoDaEmpresa, setEditingLogoDaEmpresa] = useState(false)
  const [editingPortfolio, setEditingPortfolio] = useState(false)

  const toast = useToast()

  const bgColor = { light: 'gray.50', dark: 'gray.800' }
  const { colorMode } = useColorMode()

  const handleImageUpdateSubmit: SubmitHandler<any> = async (data) => {
		const formData = new FormData()
			formData.append('files', data.files[0])
			formData.append('refId', estande.id);
			formData.append('ref', 'estandes-professional');
			formData.append('field', `${strapiField}`);
	
		const res = await fetch(`${process.env.NEXT_PUBLIC_API}/upload`, {
			method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
			body: formData
		}).then(res => res.json())
		if (res.error) {
      toast({
        title: "Erro!",
        description: `Erro ao editar imagem!`,
        status: "error",
        duration: 8000,
        isClosable: true,
        position: 'top-right'
      })  
    } else {
      toast({
        title: "Success!",
        description: `Sucesso ao editar imagem!`,
        status: "success",
        duration: 8000,
        isClosable: true,
        position: 'top-right'
      })  
    }
    reset()
    reset2()
    reset3()
    reset4()
    setEditingImageCartao(false)
    setEditingImageVideo(false)
    setEditingPortfolio(false)
    setEditingLogoDaEmpresa(false)
    getEstande()
	}

  return (
    <>
      <Box p='8' pb='4' bg={bgColor[colorMode]} borderRadius={8}>
        <Text fontSize='lg' mb='4'>Image video</Text>
        <AspectRatio maxW="555px" ratio={4 / 3}>
          <Image src={`${imageVideo}`} alt="imagem_video" objectFit="cover" />
        </AspectRatio>
        <form key={1} onSubmit={handleSubmit(handleImageUpdateSubmit)}>
        <HStack justify='space-between' mt='3'>
          <Input 
            variant='flushed' 
            ref={register({ required: true })} 
            type="file" 
            size='sm'
            disabled={!idUserMatchesIdArray && userRole !== 'Administrator'}
            name='files' 
            onClick={() => setEditingImageVideo(true)}
          />
          {editingImageVideo && (
            <HStack spacing='2'>
              <IconButton 
                aria-label="close editing" 
                onClick={() => {setEditingImageVideo(false); reset()}}
                size='sm'
                icon={<RiCloseLine />} 
              />
              <IconButton 
                aria-label="confirm editing" 
                type='submit'
                size='sm'
                isLoading={formState.isSubmitting}
                onClick={() => {setStrapiField('imagem_video')}}
                icon={<RiCheckLine />} 
              />
            </HStack>
          )}
        </HStack>
        </form>
      </Box>

      <Box p='8' pb='4'bg={bgColor[colorMode]} borderRadius={8}>
        <Text fontSize='lg' mb='4'>Imagem portfolio</Text>
        <AspectRatio maxW="555px" ratio={4 / 3}>
          <Image src={`${imagePortfolio}`} alt="imagem_portfolio" objectFit="cover" />
        </AspectRatio>
        <form key={3} onSubmit={handleSubmit3(handleImageUpdateSubmit)}>
        <HStack justify='space-between' mt='3'>
          <Input 
            variant='flushed' 
            ref={register3({ required: true })} 
            type="file" 
            disabled={!idUserMatchesIdArray && userRole !== 'Administrator'}
            size='sm'
            name='files' 
            onClick={() => setEditingPortfolio(true)}
          />
          {editingPortfolio && (
            <HStack spacing='3'>
              <IconButton 
                aria-label="close editing" 
                onClick={() => {setEditingPortfolio(false); reset3()}}
                size='sm'
                icon={<RiCloseLine />} 
              />
              <IconButton 
                aria-label="confirm editing" 
                type='submit'
                size='sm'
                isLoading={formState3.isSubmitting}
                onClick={() => {setStrapiField('imagem_portfolio')}}
                icon={<RiCheckLine />} 
              />
            </HStack>
          )}
        </HStack>
        </form>
      </Box>

      <Box>
        <Box p='8' pb='4' bg={bgColor[colorMode]} borderRadius={8}>
          <Text fontSize='lg' mb='4'>Logo da empresa</Text>
          <AspectRatio maxW="555px" ratio={4 / 3}>
            <Image src={`${imageLogoDaEmpresa}`} alt="logo_da_empresa" objectFit="cover" />
          </AspectRatio>
          <form key={4} onSubmit={handleSubmit4(handleImageUpdateSubmit)}>
          <HStack justify='space-between' mt='3'>
            <Input 
              variant='flushed' 
              ref={register4({ required: true })} 
              type="file" 
              size='sm'
              disabled={!idUserMatchesIdArray && userRole !== 'Administrator'}
              name='files' 
              onClick={() => setEditingLogoDaEmpresa(true)}
            />
            {editingLogoDaEmpresa && (
              <HStack spacing='3'>
                <IconButton 
                  aria-label="close editing" 
                  onClick={() => {setEditingLogoDaEmpresa(false); reset4()}}
                  size='sm'
                  icon={<RiCloseLine />} 
                />
                <IconButton 
                  aria-label="confirm editing" 
                  type='submit'
                  size='sm'
                  isLoading={formState4.isSubmitting}
                  onClick={() => {setStrapiField('logo_da_empresa')}}
                  icon={<RiCheckLine />} 
                />
              </HStack>
            )}
          </HStack>
          </form>
        </Box>
      </Box>

      <Box pb='8'>
        <Box p='8' pb='4' bg={bgColor[colorMode]} borderRadius={8}>
          <Text fontSize='lg' mb='4'>Imagem cartão</Text>
          <AspectRatio maxW="555px" ratio={4 / 3}>
            <Image src={`${imageCartao}`} alt="imagem_cartao" objectFit="cover" />
          </AspectRatio>
          <form key={2} onSubmit={handleSubmit2(handleImageUpdateSubmit)}>
          <HStack justify='space-between' mt='3'>
            <Input 
              variant='flushed' 
              ref={register2({ required: true })} 
              type="file" 
              size='sm'
              name='files' 
              disabled={!idUserMatchesIdArray && userRole !== 'Administrator'}
              onClick={() => setEditingImageCartao(true)}
            />
            {editingImageCartao && (
              <HStack spacing='2'>
                <IconButton 
                  aria-label="close editing" 
                  onClick={() => {setEditingImageCartao(false); reset2()}}
                  size='sm'
                  icon={<RiCloseLine />} 
                />
                <IconButton 
                  aria-label="confirm editing" 
                  type='submit'
                  size='sm'
                  isLoading={formState2.isSubmitting}
                  onClick={() => {setStrapiField('imagem_cartao')}}
                  icon={<RiCheckLine />} 
                />
              </HStack>
            )}
          </HStack>
          </form>
        </Box>

        <CartoesDeVisitaEstandesProfessional
          idUserMatchesIdArray={idUserMatchesIdArray} 
          estande={estande} 
          jwt={jwt} 
          getEstande={getEstande}  
        />
      </Box>
    </>
  )
}