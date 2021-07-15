import { Spacer,Text, Box, Wrap,HStack,Image, WrapItem,IconButton, Input, Center,useColorMode, useToast } from '@chakra-ui/react'
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RiCheckLine, RiCloseLine } from  "react-icons/ri";

type FormMediasEventProps = {
  getEvent: () => Promise<void>
  jwt: string
  evento: {
    id: string
    imagem_1?:{
      url: string
    }
    imagem_2?:{
      url: string
    }
    imagem_3?:{
      url: string
    }
    imagem_4?:{
      url: string
    }
    imagem_principal: {
      url: string;
    }  
    imagem_organizador: {
      url: string;
    }  
  }
}

export function FormMediasEvent({ evento, jwt, getEvent }: FormMediasEventProps) {
  const { register, handleSubmit, reset, formState } = useForm({ mode: 'all' })
  const { register: register2, handleSubmit: handleSubmit2, reset: reset2, formState: formState2  } = useForm({ mode: 'all' })
  const { register: register3, handleSubmit: handleSubmit3, reset: reset3, formState: formState3  } = useForm({ mode: 'all' })
  const { register: register4, handleSubmit: handleSubmit4, reset: reset4, formState: formState4  } = useForm({ mode: 'all' })
  const { register: register5, handleSubmit: handleSubmit5, reset: reset5, formState: formState5  } = useForm({ mode: 'all' })
  const { register: register6, handleSubmit: handleSubmit6, reset: reset6, formState: formState6  } = useForm({ mode: 'all' })

  const [isEditingImage1, setIsEditingImage1] = useState(false)
  const [isEditingImage2, setIsEditingImage2] = useState(false)
  const [isEditingImage3, setIsEditingImage3] = useState(false)
  const [isEditingImage4, setIsEditingImage4] = useState(false)
  const [isEditingImage5, setIsEditingImage5] = useState(false)
  const [isEditingImage6, setIsEditingImage6] = useState(false)

  const [strapiField, setStrapiField] = useState('')

  const { colorMode } = useColorMode()
  const toast = useToast()

  const bgColor = { light: 'gray.50', dark: 'gray.800' }

  const handleImageUpdateSubmit: SubmitHandler<any> = async (data) => {
		const formData = new FormData()
			formData.append('files', data.files[0])
			formData.append('refId', evento.id);
			formData.append('ref', 'informacoes-do-site');
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
    reset5()
    reset6()
    setIsEditingImage1(false)
    setIsEditingImage2(false)
    setIsEditingImage3(false)
    setIsEditingImage4(false)
    setIsEditingImage5(false)
    setIsEditingImage6(false)
    await getEvent()
	}

  return (
    <>
      <Center mt="8" mb="3">
          <Text fontSize="30px" fontWeight="bold">Mídias da Página</Text>
          <Spacer/>
        </Center>
        <Center ml="4" mt="3" mb="3" w="100%">
          <Wrap spacing="30px" w="100%" align="center">
            <WrapItem>
              <Box key={1} as='form' onSubmit={handleSubmit(handleImageUpdateSubmit)} p='8' pb='4' bg={bgColor[colorMode]} borderRadius={8}  w="300px">
                  <Text fontSize='lg' mb='4' fontWeight="bold">Imagem principal</Text>
                  <Image src={evento.imagem_principal?.url} alt="imagem" objectFit="cover"/>
                  <HStack justify='space-between' mt='3'>
                  <Input 
                    variant='flushed' 
                    type="file" 
                    ref={register({ required: 'Imagem obrigatoria' })}
                    size='sm'
                    name='files' 
                    onClick={() => setIsEditingImage1(true)}
                  />
                  {isEditingImage1 && (
                    <HStack spacing='3'>
                      <IconButton 
                        aria-label="close editing" 
                        onClick={() => {setIsEditingImage1(false); reset()}}
                        size='sm'
                        icon={<RiCloseLine />} 
                      />
                      <IconButton 
                        aria-label="confirm editing" 
                        type='submit'
                        size='sm'
                        isLoading={formState.isSubmitting}
                        onClick={() => {setStrapiField('imagem_principal')}}
                        icon={<RiCheckLine />} 
                      />
                    </HStack>
                  )}
                  </HStack>
              </Box>
          </WrapItem>
          <WrapItem>
              <Box key={2} as='form' onSubmit={handleSubmit2(handleImageUpdateSubmit)} p='8' pb='4' bg={bgColor[colorMode]} borderRadius={8}  w="300px">
                  <Text fontSize='lg' mb='4' fontWeight="bold">Imagem 1/4</Text>
                  <Image src={evento.imagem_1?.url} alt="imagem" objectFit="cover"/>
                  <HStack justify='space-between' mt='3'>
                  <Input 
                    variant='flushed' 
                    type="file" 
                    size='sm'
                    ref={register2({ required: 'Imagem obrigatoria' })}
                    name='files' 
                    onClick={() => setIsEditingImage2(true)}
                    />
                    {isEditingImage2 && (
                      <HStack spacing='3'>
                        <IconButton 
                          aria-label="close editing" 
                          onClick={() => {setIsEditingImage2(false); reset2()}}
                          size='sm'
                          icon={<RiCloseLine />} 
                        />
                        <IconButton 
                          aria-label="confirm editing" 
                          type='submit'
                          size='sm'
                          isLoading={formState2.isSubmitting}
                          onClick={() => {setStrapiField('imagem_1')}}
                          icon={<RiCheckLine />} 
                        />
                      </HStack>
                    )}
                  </HStack>
              </Box>
          </WrapItem>
          <WrapItem>
              <Box key={3} as='form' onSubmit={handleSubmit3(handleImageUpdateSubmit)} p='8' pb='4' bg={bgColor[colorMode]} borderRadius={8}  w="300px">
                  <Text fontSize='lg' mb='4' fontWeight="bold">Imagem 2/4</Text>
                  <Image src={evento.imagem_2?.url} alt="imagem" objectFit="cover"/>
                  <HStack justify='space-between' mt='3'>
                  <Input 
                    variant='flushed' 
                    type="file" 
                    size='sm'
                    ref={register3({ required: 'Imagem obrigatoria' })}
                    name='files' 
                    onClick={() => setIsEditingImage3(true)}
                    />
                    {isEditingImage3 && (
                      <HStack spacing='3'>
                        <IconButton 
                          aria-label="close editing" 
                          onClick={() => {setIsEditingImage3(false); reset3()}}
                          size='sm'
                          icon={<RiCloseLine />} 
                        />
                        <IconButton 
                          aria-label="confirm editing" 
                          type='submit'
                          size='sm'
                          isLoading={formState3.isSubmitting}
                          onClick={() => {setStrapiField('imagem_2')}}
                          icon={<RiCheckLine />} 
                        />
                      </HStack>
                    )}
                  </HStack>
              </Box>
          </WrapItem>
          <WrapItem>
              <Box key={4} as='form' onSubmit={handleSubmit4(handleImageUpdateSubmit)} p='8' pb='4' bg={bgColor[colorMode]} borderRadius={8}  w="300px">
                  <Text fontSize='lg' mb='4' fontWeight="bold">Imagem 3/4</Text>
                  <Image src={evento.imagem_3?.url} alt="imagem" objectFit="cover"/>
                  <HStack justify='space-between' mt='3'>
                  <Input 
                    variant='flushed' 
                    type="file" 
                    size='sm'
                    ref={register4({ required: 'Imagem obrigatoria' })}
                    name='files' 
                    onClick={() => setIsEditingImage4(true)}
                    />
                    {isEditingImage4 && (
                      <HStack spacing='3'>
                        <IconButton 
                          aria-label="close editing" 
                          onClick={() => {setIsEditingImage4(false); reset4()}}
                          size='sm'
                          icon={<RiCloseLine />} 
                        />
                        <IconButton 
                          aria-label="confirm editing" 
                          type='submit'
                          size='sm'
                          isLoading={formState4.isSubmitting}
                          onClick={() => {setStrapiField('imagem_3')}}
                          icon={<RiCheckLine />} 
                        />
                      </HStack>
                    )}
                  </HStack>
              </Box>
          </WrapItem>
          <WrapItem>
              <Box key={5} as='form' onSubmit={handleSubmit5(handleImageUpdateSubmit)} p='8' pb='4' bg={bgColor[colorMode]} borderRadius={8}  w="300px">
                  <Text fontSize='lg' mb='4' fontWeight="bold">Imagem 4/4</Text>
                  <Image src={evento.imagem_4?.url} alt="imagem" objectFit="cover"/>
                  <HStack justify='space-between' mt='3'>
                  <Input 
                    variant='flushed' 
                    type="file" 
                    size='sm'
                    ref={register5({ required: 'Imagem obrigatoria' })}
                    name='files' 
                    onClick={() => setIsEditingImage5(true)}
                    />
                    {isEditingImage5 && (
                      <HStack spacing='3'>
                        <IconButton 
                          aria-label="close editing" 
                          onClick={() => {setIsEditingImage5(false); reset5()}}
                          size='sm'
                          icon={<RiCloseLine />} 
                        />
                        <IconButton 
                          aria-label="confirm editing" 
                          type='submit'
                          size='sm'
                          isLoading={formState5.isSubmitting}
                          onClick={() => {setStrapiField('imagem_4')}}
                          icon={<RiCheckLine />} 
                        />
                      </HStack>
                    )}
                  </HStack>
              </Box>
          </WrapItem>
          <WrapItem>
              <Box key={6} as='form' onSubmit={handleSubmit6(handleImageUpdateSubmit)} p='8' pb='4' bg={bgColor[colorMode]} borderRadius={8}  w="300px">
                  <Text fontSize='lg' mb='4' fontWeight="bold">Foto do Organizador</Text>
                  <Image src={evento.imagem_organizador?.url} alt="imagem" objectFit="cover"/>
                  <HStack justify='space-between' mt='3'>
                  <Input 
                    variant='flushed' 
                    type="file" 
                    size='sm'
                    ref={register6({ required: 'Imagem obrigatoria' })}
                    name='files' 
                    onClick={() => setIsEditingImage6(true)}
                    />
                    {isEditingImage6 && (
                      <HStack spacing='3'>
                        <IconButton 
                          aria-label="close editing" 
                          onClick={() => {setIsEditingImage6(false); reset6()}}
                          size='sm'
                          icon={<RiCloseLine />} 
                        />
                        <IconButton 
                          aria-label="confirm editing" 
                          type='submit'
                          size='sm'
                          isLoading={formState6.isSubmitting}
                          onClick={() => {setStrapiField('imagem_organizador')}}
                          icon={<RiCheckLine />} 
                        />
                      </HStack>
                    )}
                  </HStack>
              </Box>
          </WrapItem>
      </Wrap>
    </Center>
    </>
  )
}