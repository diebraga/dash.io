import { Spacer,Box, Heading, Center,Container, useToast } from '@chakra-ui/react'
import { FormEvent, useEffect, useState } from 'react';
import { GiPartyPopper } from "react-icons/gi";
import { Form1Event } from './Form1Event';
import { Form2Event } from './Form2Event';
import { FormMediasEvent } from './FormMediasEvent';

type DashEventInfoProps = {
  jwt: string
}
type Evento = {
  nome_do_evento: string;
  nome_organizador: string;
  descricao_organizador: string;
  link_contato_organizador: string
  dia_inicio_do_evento: string;
  dia_final_do_evento: string;
  horario_inicio_do_evento: string;
  horario_final_do_evento: string;
  id: string;
  imagem_1:{
    url: string
  }
  imagem_2:{
    url: string
  }
  imagem_3:{
    url: string
  }
  imagem_4:{
    url: string
  }
  imagem_principal: {
    url: string;
  }
  imagem_organizador: {
    url: string;
  }  
  link_facebook: string;
  link_instagram: string;
  link_linkedin: string;
  link_video: string;
  titulo_texto_1: string;
  texto_1: string;
  titulo_texto_2: string;
  texto_2: string;
  titulo_texto_video: string;
  texto_video: string;
}

type UpdateResponse = {
  link_web?: string
  link_cartao?: string
  link_portfolio?: string
  error?: object
}

export function DashEventInfo({ jwt }: DashEventInfoProps) {
  const [evento, setEvento] = useState({} as Evento)

  const [isUpdating, setIsUpdating] = useState(false)
  const [isEditingForm1, setIsEditingForm1] = useState(false)
  const [isEditingForm2, setIsEditingForm2] = useState(false)

  const [nomeDoEvento, setNomeDoEvento] = useState('')
  const [nomeDoOrganizador, setNomeDoOrganizador] = useState('')
  const [linkLinkedin, setLinkLinkedin] = useState('')
  const [linkInstagram, setLinkInstagram] = useState('')
  const [linkFacebook, setLinkFacebook] = useState('')
  const [tituloTexto1, setTituloTexto1] = useState('')
  const [texto1, setTexto1] = useState('')
  const [tituloTexto2, setTituloTexto2] = useState('')
  const [texto2, setTexto2] = useState('')
  const [tituloTextoVideo, setTituloTextoVideo] = useState('')
  const [textoVideo, setTextoVideo] = useState('')
  const [linkVideo, setLinkVideo] = useState('')
  const [descricaoOrg, setDescricaoOrg] = useState('')
  const [linkContatoOrg, setLinkContatoOrg] = useState('')
  const [diaInicioEvento, setDiaInicioEvento] = useState('')
  const [diaFinalEvento, setDiaFinalEvento] = useState('')
  const [horaInicioEvento, setHoraInicioEvento] = useState('')
  const [horaFinalEvento, setHoraFinalEvento] = useState('')

  const toast = useToast()

  async function getEvent(): Promise<void> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/informacoes-do-site`);
    const data: Evento = await response.json();
    setEvento(data);

    setNomeDoEvento(data.nome_do_evento)
    setNomeDoOrganizador(data.nome_organizador)
    setLinkLinkedin(data.link_linkedin)
    setLinkInstagram(data.link_instagram)
    setLinkFacebook(data.link_facebook)
    setTituloTexto1(data.titulo_texto_1)
    setTexto1(data.texto_1)
    setTituloTexto2(data.titulo_texto_2)
    setTexto2(data.texto_2)
    setTituloTextoVideo(data.titulo_texto_video)
    setTextoVideo(data.texto_video)
    setLinkVideo(data.link_video)
    setLinkVideo(data.link_video)
    setDescricaoOrg(data.descricao_organizador)
    setLinkContatoOrg(data.link_contato_organizador)
    setDiaInicioEvento(data.dia_inicio_do_evento)
    setDiaFinalEvento(data.dia_final_do_evento)
    setHoraInicioEvento(data.horario_inicio_do_evento)
    setHoraFinalEvento(data.horario_final_do_evento)
  }

  useEffect(() => {
    getEvent()
  }, [])

  async function handleUpdateSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();    
      setIsUpdating(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/informacoes-do-site`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome_do_evento: nomeDoEvento,
          nome_organizador: nomeDoOrganizador,
          link_linkedin: linkLinkedin,
          link_instagram: linkInstagram,
          link_facebook: linkFacebook,
          titulo_texto_1: tituloTexto1,
          texto_1: texto1,
          titulo_texto_2: tituloTexto2,
          texto_2: texto2,
          titulo_texto_video: tituloTextoVideo,
          texto_video: textoVideo,
          link_video: linkVideo,
          descricao_organizador: descricaoOrg,
          link_contato_organizador: linkContatoOrg,
          dia_inicio_do_evento: diaInicioEvento,
          dia_final_do_evento: diaFinalEvento,
          horario_inicio_do_evento: horaInicioEvento,
          horario_final_do_evento: horaFinalEvento
        }),
      })
      
      const data: UpdateResponse = await response.json()  

      if (data.error) {
        toast({
          title: "Erro!",
          description: `Erro ao editar info!`,
          status: "error",
          duration: 8000,
          isClosable: true,
          position: 'top-right'
        })    
      } else {
        toast({
          title: "Sucesso!",
          description: `Info editada com sucesso!`,
          status: "success",
          duration: 8000,
          isClosable: true,
          position: 'top-right'
        })  
      }   
      setIsUpdating(false)
      setIsEditingForm1(false) 
      setIsEditingForm2(false)
    
    await getEvent();
  }


  return (
    <>
        <Container maxW="785px" ml={["0","5","5","5"]} mt="5">
          <Center>
            <Heading as='h1' mb="20px">
                <Center>
              <Box mr="4"><GiPartyPopper /></Box>Informações do Evento</Center>
            </Heading><Spacer/>
          </Center>
         <Center>

           <Form1Event 
             setLinkFacebook={setLinkFacebook}
             linkFacebook={linkFacebook}
             setLinkInstagram={setLinkInstagram}
             linkInstagram={linkInstagram}
             setLinkLinkedin={setLinkLinkedin}
             linkLinkedin={linkLinkedin}
             setNomeDoOrganizador={setNomeDoOrganizador}
             nomeDoOrganizador={nomeDoOrganizador}
             handleUpdateSubmit={handleUpdateSubmit}
             diaInicioEvento={diaInicioEvento}
             setDiaInicioEvento={setDiaInicioEvento}
             diaFinalEvento={diaFinalEvento}
             setDiaFinalEvento={setDiaFinalEvento}
             horaInicioEvento={horaInicioEvento}
             setHoraInicioEvento={setHoraInicioEvento}
             horaFinalEvento={horaFinalEvento}
             setHoraFinalEvento={setHoraFinalEvento}
             nomeDoEvento={nomeDoEvento}
             setNomeDoEvento={setNomeDoEvento}
             isUpdating={isUpdating}
             isEditingForm1={isEditingForm1}
             setIsEditingForm1={setIsEditingForm1}
           />

            <Spacer/>
         </Center>

           <Form2Event 
             tituloTexto1={tituloTexto1}
             setTituloTexto1={setTituloTexto1}
             texto1={texto1}
             setTexto1={setTexto1}
             tituloTexto2={tituloTexto2}
             setTituloTexto2={setTituloTexto2}
             texto2={texto2}
             setTexto2={setTexto2}
             tituloTextoVideo={tituloTextoVideo}
             setTituloTextoVideo={setTituloTextoVideo}
             textoVideo={textoVideo}
             setTextoVideo={setTextoVideo}
             linkVideo={linkVideo}
             setLinkVideo={setLinkVideo}
             descricaoOrg={descricaoOrg}
             setDescricaoOrg={setDescricaoOrg}
             isEditingForm2={isEditingForm2}
             setIsEditingForm2={setIsEditingForm2}
             isUpdating={isUpdating}
             handleUpdateSubmit={handleUpdateSubmit}
           />

           <FormMediasEvent 
             getEvent={getEvent}
             jwt={jwt}
             evento={evento}
           />

        </Container>
    </>
  )
}