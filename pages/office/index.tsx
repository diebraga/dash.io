import { Box, Button, Flex, Heading, Image, AspectRatio, Text, useColorMode, useToast, HStack, SimpleGrid, Icon, Input, IconButton, VStack, Link } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { FormEvent, useEffect, useState } from "react";
import { RiCheckLine, RiCloseLine } from "react-icons/ri";
import { Header } from "../../components/DashboardComponents/Header";
import { Sidebar } from "../../components/DashboardComponents/Sidebar";
import { SubmitHandler, useForm } from "react-hook-form";
import { RiExternalLinkLine } from "react-icons/ri";
import { useAuth } from "../../hooks/useAuth";

type Office = {
  id_video?: string
  id_web?: string
  created_at: string
  updated_at: string
  id: string
  logo_left: {
    url: string
  }
  logo_right: {
    url: string
  }
  image_video: {
    url: string
  }
  image_web: {
    url: string
  }
}

export default function Office({ jwt }){
  const { currentUser } = useAuth()
  let userRole = ''

  if (currentUser) {
    if (currentUser.role) {
      if (currentUser.role.name) {
        userRole = currentUser.role.name
      }
    }
  }

  const [idVideo, setIdVideo] = useState('');
  const [webSite, setWebSite] = useState('');

  const [isEditingVideo, setEditingVideo] = useState(false);
  const [isEditingwebsite, setEditingWebsite] = useState(false);

  const [isEditingLogoEsq, setEditingLogoEsq] = useState(false);
  const [isEditingLogoDir, setEditingLogoDir] = useState(false);
  const [isEditingImagemVideo, setEditingImagemVideo] = useState(false);
  const [isEditingImagemWeb, setEditingImagemWeb] = useState(false);

  const { register, handleSubmit, reset } = useForm({ mode: 'all' })
  const { register: register2, handleSubmit: handleSubmit2, reset: reset2  } = useForm({ mode: 'all' })
  const { register: register3, handleSubmit: handleSubmit3, reset: reset3  } = useForm({ mode: 'all' })
  const { register: register4, handleSubmit: handleSubmit4, reset: reset4  } = useForm({ mode: 'all' })

	const [strapiField, setStrapiField] = useState('')

  const toast = useToast()

	const [spinner, setSpinner] = useState(false)

  const [sala, setSala] = useState({} as Office)

  async function getOffice(): Promise<void> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/office`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });	
    const data: Office = await response.json();
    setSala(data);	
    setIdVideo(data.id_video)
    setWebSite(data.id_web)
  }

  async function handleUpdateSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();    
    const regExp = /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*\&)?vi?=|\&vi?=|\?(?:.*\&)?vi?=)([^#\&\?\n\/<>"']*)/i;
    const match = idVideo.match(regExp);
    const formatedUrl = (match && match[1].length==11)? match[1] : false;

      setSpinner(true)
      if (isEditingVideo) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/office`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id_video: formatedUrl,
          }),
        })
        const data = await response.json()  

        if (data.error) {
          if (data.message === "ValidationError") {
            toast({
              title: "Error!",
              description: `Error invalid format!`,
              status: "error",
              duration: 8000,
              isClosable: true,
              position: 'top-right'
            })    
          } else {
            toast({
              title: "Error!",
              description: `Error editing !`,
              status: "error",
              duration: 8000,
              isClosable: true,
              position: 'top-right'
            })    
          }
        } else {
          toast({
            title: "Sucesso!",
            description: `Success editing!`,
            status: "success",
            duration: 8000,
            isClosable: true,
            position: 'top-right'
          })  
        } 
      } else {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/office`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id_web: webSite,
          }),
        })
        const data = await response.json()  

        if (data.error) {
          toast({
            title: "Error!",
            description: `Error editing!`,
            status: "error",
            duration: 8000,
            isClosable: true,
            position: 'top-right'
          })    
        } else {
          toast({
            title: "Sucesso!",
            description: `Success editing!`,
            status: "success",
            duration: 8000,
            isClosable: true,
            position: 'top-right'
          })  
        }    
      }
      setEditingVideo(false)
      setEditingWebsite(false)
      setEditingImagemVideo(false)
      setEditingImagemWeb(false)

    setSpinner(false)    
    
    await getOffice();
  }

  const handleImageUpdateSubmit: SubmitHandler<any> = async (data) => {
    setSpinner(true)
		const formData = new FormData()
			formData.append('files', data.files[0])
			formData.append('refId', sala.id);
			formData.append('ref', 'office');
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
        title: "Error!",
        description: `Error editing!`,
        status: "error",
        duration: 8000,
        isClosable: true,
        position: 'top-right'
      })  
    } else {
      toast({
        title: "Success!",
        description: `Success editing!`,
        status: "success",
        duration: 8000,
        isClosable: true,
        position: 'top-right'
      })  
    }
    setSpinner(false)
    reset()
    reset2()
    reset3()
    reset4()
    setEditingLogoDir(false)
    setEditingLogoEsq(false)
    setEditingVideo(false)
    setEditingWebsite(false)
    await getOffice()
	}


  const { colorMode } = useColorMode()

  const bgColor = { light: 'gray.50', dark: 'gray.800' }

  useEffect(() => {
    getOffice()
  }, [])

  return (
    <Box>
      <Header />   
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" pb='6' direction='column'>
        <>
          <Flex>
          <Sidebar />
            <SimpleGrid gap='4' flex='1' minChildWidth='375px' align='flex-start'>
              <Flex justify='space-between'  p={['6', '8']}>
                <Heading size='lg' fontWeight="normal">Office</Heading>
              </Flex>
              <Flex justify='space-between'  p={['6', '8']}>
                <Box />
              </Flex>

              <Box p='8' pb='4' bg={bgColor[colorMode]} borderRadius={8}>
                <Text fontSize='lg' mb='4'>Image video</Text>
                <AspectRatio maxW="555px" ratio={4 / 3}>
                  <Image src={`${sala.image_video?.url}`} alt="image_video" objectFit="cover" />
                </AspectRatio>
                <form key={3} onSubmit={handleSubmit3(handleImageUpdateSubmit)}>
                <HStack justify='space-between' mt='3'>
                  <Input 
                    variant='flushed' 
                    ref={register3({ required: true })} 
                    type="file" 
                    size='sm'
                    name='files' 
                    onClick={() => setEditingImagemVideo(true)}
                  />
                  {isEditingImagemVideo && (
                    <HStack spacing='2'>
                      <IconButton 
                        aria-label="close editing" 
                        onClick={() => {setEditingImagemVideo(false); reset()}}
                        size='sm'
                        icon={<RiCloseLine />} 
                      />
                      <IconButton 
                        aria-label="confirm editing" 
                        type='submit'
                        size='sm'
                        isLoading={spinner}
                        onClick={() => {setStrapiField('image_video')}}
                        icon={<RiCheckLine />} 
                      />
                    </HStack>
                  )}
                </HStack>
                </form>
              </Box>

              <Box  p='8' pb='4' bg={bgColor[colorMode]} borderRadius={8}>
                <Text fontSize='lg' mb='4'>Video telão</Text>
                <AspectRatio maxW="555px" ratio={4 / 3}>
                  <iframe
                    src={idVideo.length > 1 ? (`https://www.youtube.com/embed/${sala.id_video}`) : ''}
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
                      {idVideo.length > 1 ? (`www.youtube.com/watch?v=${idVideo}`) : ''}
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
                    <Button size='sm' onClick={() => setEditingVideo(true)} disabled={userRole != 'Administrator'}>
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
                        size='sm'
                        icon={<RiCheckLine />} 
                      />
                      </HStack>
                    </form>
                  )}
                </HStack>
              </Box>

              <Box p='8' pb='4' bg={bgColor[colorMode]} borderRadius={8}>
                <Text fontSize='lg' mb='4'>Logo left</Text>
                <AspectRatio maxW="555px" ratio={4 / 3}>
                  <Image src={`${sala.logo_left?.url}`} alt="logo_left" objectFit="cover" />
                </AspectRatio>
                <form key={1} onSubmit={handleSubmit(handleImageUpdateSubmit)}>
                <HStack justify='space-between' mt='3'>
                  <Input 
                    variant='flushed' 
                    ref={register({ required: true })} 
                    type="file" 
                    size='sm'
                    name='files' 
                    onClick={() => setEditingLogoEsq(true)}
                  />
                  {isEditingLogoEsq && (
                    <HStack spacing='2'>
                      <IconButton 
                        aria-label="close editing" 
                        onClick={() => {setEditingLogoEsq(false); reset()}}
                        size='sm'
                        icon={<RiCloseLine />} 
                      />
                      <IconButton 
                        aria-label="confirm editing" 
                        type='submit'
                        size='sm'
                        isLoading={spinner}
                        onClick={() => {setStrapiField('logo_left')}}
                        icon={<RiCheckLine />} 
                      />
                    </HStack>
                  )}
                </HStack>
                </form>
              </Box>

              <Box p='8' pb='4' bg={bgColor[colorMode]} borderRadius={8}>
                <Text fontSize='lg' mb='4'>Logo right</Text>
                <AspectRatio maxW="555px" ratio={4 / 3}>
                  <Image src={`${sala.logo_right?.url}`} alt="logo_right" objectFit="cover" />
                </AspectRatio>
                <form key={2} onSubmit={handleSubmit2(handleImageUpdateSubmit)}>
                <HStack justify='space-between' mt='3'>
                  <Input 
                    variant='flushed' 
                    ref={register2({ required: true })} 
                    type="file" 
                    size='sm'
                    name='files' 
                    onClick={() => setEditingLogoDir(true)}
                  />
                  {isEditingLogoDir && (
                    <HStack spacing='2'>
                      <IconButton 
                        aria-label="close editing" 
                        onClick={() => {setEditingLogoDir(false); reset2()}}
                        size='sm'
                        icon={<RiCloseLine />} 
                      />
                      <IconButton 
                        aria-label="confirm editing" 
                        type='submit'
                        size='sm'
                        isLoading={spinner}
                        onClick={() => {setStrapiField('logo_right')}}
                        icon={<RiCheckLine />} 
                      />
                    </HStack>
                  )}
                </HStack>
                </form>
              </Box>

              <Box p='8' pb='4' bg={bgColor[colorMode]} borderRadius={8}>
                <Text fontSize='lg' mb='4'>Image website</Text>
                <AspectRatio maxW="555px" ratio={4 / 3}>
                  <Image src={`${sala.image_web?.url}`} alt="image_web" objectFit="cover" />
                </AspectRatio>
                <form key={4} onSubmit={handleSubmit4(handleImageUpdateSubmit)}>
                <HStack justify='space-between' mt='3'>
                  <Input 
                    variant='flushed' 
                    ref={register4({ required: true })} 
                    disabled={userRole != 'Administrator'}
                    type="file" 
                    size='sm'
                    name='files' 
                    onClick={() => setEditingImagemWeb(true)}
                  />
                  {isEditingImagemWeb && (
                    <HStack spacing='2'>
                      <IconButton 
                        aria-label="close editing" 
                        onClick={() => {setEditingImagemWeb(false); reset()}}
                        size='sm'
                        icon={<RiCloseLine />} 
                      />
                      <IconButton 
                        aria-label="confirm editing" 
                        type='submit'
                        size='sm'
                        isLoading={spinner}
                        onClick={() => {setStrapiField('image_web')}}
                        icon={<RiCheckLine />} 
                      />
                    </HStack>
                  )}
                </HStack>
                </form>
              </Box>

              <Box p='8' pb='4' bg={bgColor[colorMode]} borderRadius={8} maxHeight='200px'>
                <Text fontSize='lg' mb='4'>Website</Text>
                <HStack justify='space-between' mt='3'>
                  <VStack align='start'>{/*
                    // @ts-ignore */}
                    {!isEditingwebsite && (
                      <>
                      {/*
                      // @ts-ignore */}
                      <Button leftIcon={webSite} variant='unstyled' cursor='unset' size='lg'/>
                      {/*
                      // @ts-ignore */}
                      {webSite.length > 1 ? (
                        <Button as={Link} rightIcon={<Icon as={RiExternalLinkLine} boxSize='18px'/>} variant='link' href={`${webSite}`} target='_blank'>
                          Visit
                        </Button>                      
                      ) : ''}
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
                    <Button size='sm' onClick={() => setEditingWebsite(true)}>
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
                </HStack>
              </Box>
            </SimpleGrid>
          </Flex>
          </>

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