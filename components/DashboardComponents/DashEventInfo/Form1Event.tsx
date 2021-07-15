import { Text, Box, Wrap,WrapItem,Input, InputGroup, InputLeftElement, Button, HStack } from '@chakra-ui/react'
import { BsPeople } from "react-icons/bs"
import { HiOutlineTicket } from "react-icons/hi";
import { FaLinkedinIn,FaInstagram, FaFacebookF } from "react-icons/fa";
import { Dispatch, FormEvent, SetStateAction } from 'react';

type Form1EventProps = {
  diaInicioEvento: string
  setDiaInicioEvento: Dispatch<SetStateAction<string>>
  diaFinalEvento: string
  setDiaFinalEvento: Dispatch<SetStateAction<string>>
  horaInicioEvento: string
  setHoraInicioEvento: Dispatch<SetStateAction<string>>
  horaFinalEvento: string
  setHoraFinalEvento: Dispatch<SetStateAction<string>>
  nomeDoEvento: string
  setNomeDoEvento: Dispatch<SetStateAction<string>>
  handleUpdateSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>
  isUpdating: boolean
  isEditingForm1: boolean
  setIsEditingForm1: Dispatch<SetStateAction<boolean>>
  setLinkLinkedin: Dispatch<SetStateAction<string>>
  linkInstagram: string
  setLinkInstagram: Dispatch<SetStateAction<string>>
  linkFacebook: string
  setLinkFacebook: Dispatch<SetStateAction<string>>
  linkLinkedin: string
  setNomeDoOrganizador: Dispatch<SetStateAction<string>>
  nomeDoOrganizador: string
}

export function Form1Event({ 
  setLinkLinkedin,
  linkInstagram,
  setLinkInstagram,
  linkFacebook,
  setLinkFacebook,
  linkLinkedin,
  nomeDoOrganizador,
  setNomeDoOrganizador,
  handleUpdateSubmit,
  diaInicioEvento, 
  setDiaInicioEvento,
  diaFinalEvento,
  setDiaFinalEvento,
  horaInicioEvento,
  setHoraInicioEvento,
  horaFinalEvento,
  setHoraFinalEvento,
  nomeDoEvento,
  setNomeDoEvento,
  isUpdating,
  isEditingForm1,
  setIsEditingForm1
}: Form1EventProps) {
  return (
    <>
    {/*
    // @ts-ignore */}
    <Wrap spacing="30px" maxW="785px" as='form' onSubmit={handleUpdateSubmit}>
      <WrapItem>
          <Box>
          <Text  ml="1" fontSize="13px" fontWeight="bold" textalign="justify">Nome do Evento</Text>
          <InputGroup>
                  <InputLeftElement
                  pointerEvents="none"
                  children={<HiOutlineTicket color="gray.300" />}
                  />
                  <Input 
                    w={["380px","100%","100%","100%"]} 
                    h="40px" 
                    disabled={!isEditingForm1}
                    value={nomeDoEvento}
                    onChange={e => setNomeDoEvento(e.target.value)}
                    placeholder="Nome do Evento" 
                  />
              </InputGroup>
          </Box>
      </WrapItem>
      <WrapItem>
          <Box>
          <Text ml="1"  fontSize="13px" textalign="justify" fontWeight="bold" >Data de Inicio</Text>
              <InputGroup>
                  <Input
                    w={["380px","100%","100%","100%"]} 
                    h="40px" 
                    disabled={!isEditingForm1}
                    type="date" 
                    onChange={e => setDiaInicioEvento(e.target.value)}
                    value={diaInicioEvento}
                    placeholder="Data"
                  />
              </InputGroup>  
          </Box>
      </WrapItem>
      <WrapItem>
          <Box >
          <Text  fontSize="13px" textalign="justify" fontWeight="bold" >Data de Fim</Text>
              <InputGroup>
                  <Input 
                    w={["380px","100%","100%","100%"]} 
                    h="40px" 
                    type="date" 
                    disabled={!isEditingForm1}
                    value={diaFinalEvento}
                    onChange={e => setDiaFinalEvento(e.target.value)}
                    placeholder="Data"
                  />
              </InputGroup>  
          </Box>
      </WrapItem>
      <WrapItem>
          <Box>
          <Text  ml="1" fontSize="12px" textalign="justify" fontWeight="bold" >Horário de Inicio</Text>
              <InputGroup>
                  <Input 
                    textalign="center" 
                    w={["150px","100%","100%","100%"]} 
                    value={horaInicioEvento}
                    onChange={e => setHoraInicioEvento(e.target.value)}
                    h="40px" 
                    type="time" 
                    disabled={!isEditingForm1}
                    placeholder="Time" 
                  />
              </InputGroup>  
          </Box>
      </WrapItem>
      <WrapItem>
          <Box>
          <Text ml="1"  fontSize="12px" textalign="justify" fontWeight="bold">Horário de Fim</Text>
              <InputGroup>
                  <Input 
                    textalign="center" 
                    w={["150px","100%","100%","100%"]}
                    value={horaFinalEvento} 
                    onChange={e => setHoraFinalEvento(e.target.value)}
                    h="40px" 
                    disabled={!isEditingForm1}
                    type="time" 
                    placeholder="Time" 
                  />
              </InputGroup>  
          </Box>
      </WrapItem>
      <WrapItem>
          <Box>
          <Text  ml="1" fontSize="13px" textalign="justify" fontWeight="bold">Nome do Organizador</Text>
          <InputGroup>
                  <InputLeftElement
                  pointerEvents="none"
                  children={<BsPeople color="gray.300" />}
                  />
                  <Input 
                    w={["380px","470px","470px","470px"]} 
                    h="40px" 
                    value={nomeDoOrganizador}
                    onChange={e => setNomeDoOrganizador(e.target.value)}
                    placeholder="Insira o nome" 
                    disabled={!isEditingForm1}
                  />
              </InputGroup>
          </Box>
      </WrapItem>
      <WrapItem>
          <Box>
          <Text ml="1"  fontSize="13px" textalign="justify"fontWeight="bold">Link LinkedIn</Text>
              <InputGroup>
              <InputLeftElement
                  pointerEvents="none"
                  children={<FaLinkedinIn color="gray.300" />}
                  />
                  <Input
                    placeholder="Insira o link."  
                    textalign="center" 
                    value={linkLinkedin}
                    onChange={e => setLinkLinkedin(e.target.value)}
                    w={["380px","470px","470px","470px"]} 
                    disabled={!isEditingForm1}
                    h="40px"
                  />
              </InputGroup>  
          </Box>
      </WrapItem>
      <WrapItem>
          <Box >
          <Text ml="1"  fontSize="13px" textalign="justify" fontWeight="bold">Link Instagram</Text>
              <InputGroup>
              <InputLeftElement
                  pointerEvents="none"
                  children={<FaInstagram color="gray.300" />}
                  />
                  <Input 
                    placeholder="Insira o link."  
                    value={linkInstagram}
                    onChange={e => setLinkInstagram(e.target.value)}
                    textalign="center" 
                    w={["380px","470px","470px","470px"]} 
                    disabled={!isEditingForm1}
                    h="40px"
                  />
              </InputGroup>  
          </Box>
      </WrapItem>
      <WrapItem>
          <Box >
          <Text  ml="1" fontSize="13px" textalign="justify" fontWeight="bold">Link Facebook</Text>
              <InputGroup>
              <InputLeftElement
              placeholder="Insira o link." 
                  pointerEvents="none"
                  children={<FaFacebookF color="gray.300" />}
                  />
                  <Input
                    placeholder="Insira o link."  
                    textalign="center" 
                    value={linkFacebook}
                    onChange={e => setLinkFacebook(e.target.value)}
                    w={["380px","470px","470px","470px"]} 
                    disabled={!isEditingForm1}
                    h="40px"
                  />
              </InputGroup>  
          </Box>
      </WrapItem>
      <WrapItem w='100%'>
        <HStack spacing='3'>
          <Button 
            colorScheme='gray' 
            isLoading={isUpdating} 
            display={!isEditingForm1 ? 'block' : 'none'}
            onClick={() => setIsEditingForm1(true)}
          >
            Editar
          </Button>
          <Button 
            colorScheme='red' 
            disabled={isUpdating} 
            display={isEditingForm1 ? 'block' : 'none'}
            onClick={() => setIsEditingForm1(false)}
          >
            Cancelar
          </Button>
          <Button 
            colorScheme='blue' 
            isLoading={isUpdating} 
            type='submit'
            disabled={!isEditingForm1}
          >
            Enviar
          </Button>
        </HStack>
      </WrapItem>
  </Wrap>
  </>
  )
}