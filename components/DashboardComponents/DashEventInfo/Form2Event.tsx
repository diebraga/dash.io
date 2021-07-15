import { Spacer,Text, Box, HStack,Textarea, Button, Input, Center, InputGroup } from '@chakra-ui/react'
import { Dispatch, FormEvent, SetStateAction } from 'react';

type Form2EventProps = {
  texto1: string
  tituloTexto2: string
  setTituloTexto2: Dispatch<SetStateAction<string>> 
  texto2: string
  setTexto2: Dispatch<SetStateAction<string>> 
  tituloTextoVideo: string
  setTituloTextoVideo: Dispatch<SetStateAction<string>>
  textoVideo: string 
  setTextoVideo: Dispatch<SetStateAction<string>> 
  linkVideo: string 
  setLinkVideo: Dispatch<SetStateAction<string>> 
  descricaoOrg: string 
  setDescricaoOrg: Dispatch<SetStateAction<string>> 
  setTexto1: Dispatch<SetStateAction<string>>
  tituloTexto1: string
  setTituloTexto1: Dispatch<SetStateAction<string>>
  isEditingForm2: boolean
  setIsEditingForm2: Dispatch<SetStateAction<boolean>>
  isUpdating: boolean
  handleUpdateSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>
}

export function Form2Event({
  isEditingForm2,
  setIsEditingForm2,
  isUpdating,
  tituloTexto1,
  setTituloTexto1,
  texto1, 
  setTexto1,
  tituloTexto2, 
  setTituloTexto2, 
  texto2, 
  setTexto2, 
  tituloTextoVideo, 
  setTituloTextoVideo,
  textoVideo, 
  setTextoVideo, 
  linkVideo, 
  setLinkVideo, 
  descricaoOrg, 
  setDescricaoOrg, 
  handleUpdateSubmit
}: Form2EventProps) {
  return (
    // @ts-ignore */
    <Box mt='8' as='form' onSubmit={handleUpdateSubmit}>
    <Center mt="3" mb="3">
    <Text fontSize="30px" fontWeight="bold">Textos da Página</Text>
    <Spacer/>
  </Center>
  <Center mt="3" mb="3">
    <Text fontSize="20px" fontWeight="bold">Primeiro Texto</Text>
    <Spacer/>
  </Center>
  <Center>
  <Box w={["100%","40%","40%","40%"]}>
    <Text  ml="1" fontSize="13px" textalign="justify" fontWeight="bold">Título do Texto</Text>
      <InputGroup>
        <Input 
          placeholder="Escreva o Título."  
          value={tituloTexto1}
          onChange={e => setTituloTexto1(e.target.value)}
          disabled={!isEditingForm2}
          textAlign="justify"  
        />
      </InputGroup>
  </Box>
  <Spacer/>
  </Center>
  <Center mt="3" mb="3">
  <Box w={["100%","80%","80%","80%"]}>
    <Text  ml="1"  fontSize="13px" textalign="justify" fontWeight="bold">Escreva o seu texto</Text>
      <InputGroup>
        <Textarea 
          placeholder="Escreva o seu texto."  
          disabled={!isEditingForm2}
          value={texto1}
          onChange={e => setTexto1(e.target.value)}
          textAlign="justify"  
        />
      </InputGroup>
  </Box>
  <Spacer/>

  </Center>
  <Center mt="3" mb="3">
    <Text  ml="1" fontSize="20px" fontWeight="bold">Segundo Texto</Text>
    <Spacer/>
  </Center>
  <Center>
  <Box w={["100%","40%","40%","40%"]}>
    <Text  ml="1"  fontSize="13px" textalign="justify" fontWeight="bold">Título do Texto</Text>
      <InputGroup>
        <Input 
          placeholder="Escreva o Título."  
          value={tituloTexto2}
          disabled={!isEditingForm2}
          onChange={e => setTituloTexto2(e.target.value)}
          textAlign="justify"  
        />
      </InputGroup>
  </Box>
  <Spacer/>
  </Center>
  <Center mt="3" mb="3">
  <Box w={["100%","80%","80%","80%"]}>
    <Text ml="1"  fontSize="13px" textalign="justify" fontWeight="bold">Escreva o seu texto</Text>
      <InputGroup>
        <Textarea
          placeholder="Escreva o seu texto."  
          value={texto2}
          disabled={!isEditingForm2}
          onChange={e => setTexto2(e.target.value)}
          textAlign="justify"  
        />
      </InputGroup>
  </Box>
  <Spacer/>
  </Center>
  <Center mt="3" mb="3">
    <Text ml="1" fontSize="20px" fontWeight="bold">Texto do Vídeo</Text>
    <Spacer/>
  </Center>
  <Center>
  <Box w={["100%","40%","40%","40%"]}>
    <Text  ml="1"  fontSize="13px" textalign="justify" fontWeight="bold">Título do Texto</Text>
      <InputGroup>
        <Input 
          placeholder="Escreva o Título."  
          value={tituloTextoVideo}
          disabled={!isEditingForm2}
          onChange={e => setTituloTextoVideo(e.target.value)}
          textAlign="justify"   
        />
      </InputGroup>
  </Box>
  <Spacer/>
  </Center>
  <Center mt="3" mb="3">
  <Box w={["100%","80%","80%","80%"]}>
    <Text  ml="1" fontSize="13px" textalign="justify" fontWeight="bold">Escreva o seu texto</Text>
      <InputGroup>
        <Textarea 
          placeholder="Escreva o seu texto."  
          textAlign="justify"   
          disabled={!isEditingForm2}
          value={textoVideo}
          onChange={e => setTextoVideo(e.target.value)}
        />
      </InputGroup>
  </Box>
  <Spacer/>
  </Center>
  <Center mt="3" mb="3">
    <Text  ml="1" fontSize="20px" fontWeight="bold">Texto do Organizador</Text>
    <Spacer/>
  </Center>
  <Center mt="3" mb="3">
  <Box w={["100%","80%","80%","80%"]}>
    <Text  ml="1" fontSize="13px" textalign="justify" fontWeight="bold">Escreva a sua descrição</Text>
      <InputGroup>
        <Textarea 
          placeholder="Escreva o seu texto."  
          textAlign="justify"  
          disabled={!isEditingForm2} 
          value={descricaoOrg}
          onChange={e => setDescricaoOrg(e.target.value)}
        />
      </InputGroup>
  </Box>
  <Spacer/>
  </Center>
  <Box w={["100%","40%","40%","40%"]}> 
    <Text  ml="1" fontSize="13px" textalign="justify" fontWeight="bold">Link do vídeo da página</Text>
      <InputGroup>
        <Input 
          placeholder="Insira o link."
          disabled={!isEditingForm2}  
          textAlign="justify"  
          value={linkVideo}
          onChange={e => setLinkVideo(e.target.value)}
        />
      </InputGroup>
  </Box>
      <HStack spacing='3' mt='6'>
        <Button 
          colorScheme='gray' 
          isLoading={isUpdating} 
          display={!isEditingForm2 ? 'block' : 'none'}
          onClick={() => setIsEditingForm2(true)}
        >
          Editar
        </Button>
        <Button 
          colorScheme='red' 
          disabled={isUpdating} 
          display={isEditingForm2 ? 'block' : 'none'}
          onClick={() => setIsEditingForm2(false)}
        >
          Cancelar
        </Button>
        <Button 
          colorScheme='blue' 
          isLoading={isUpdating} 
          type='submit'
          disabled={!isEditingForm2}
        >
          Enviar
        </Button>
      </HStack>
    </Box>
  )
}