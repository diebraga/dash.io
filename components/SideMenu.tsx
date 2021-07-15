import { useState } from 'react'
import styles from '../styles/menulateral.module.scss'
import { Box, Text, Image, Icon, Center,Flex } from "@chakra-ui/react"
import { useMusic } from '../hooks/useMusic'
import { ModalVideoPlay } from './ModalVideo'
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import NoSSR from 'react-no-ssr'
import Link from 'next/link'
import { RiDashboardLine } from 'react-icons/ri'

export function SideMenu() {
  const { pauseMusic, startMusic, musicRef, musicStatus } = useMusic()
  const [showRooms, setShowRooms] = useState(false)

  if (typeof window !== "undefined") {
    window.addEventListener('keydown', function(event) {  
      if (musicStatus === true) {
        startMusic()
      } 
      if (musicStatus === false) {
        pauseMusic()
      } 
    }, {once: true})
  }  
    return (

          <>
          <div style={{top:"0px",position:"absolute", background:"#FFFFFF", width:"100%", zIndex:1, boxShadow:"0px 6px 15px #0000001C"}}>
            {/* <Header /> */}
          </div>
            <audio
              ref={musicRef}
              src="/sounds/sound1.mp3"
              loop
            />
          <div className="menu"  >
            
          <div className={styles.menulateral} style={{marginTop:"60px"}}>
          <ul>
              <>
                <NoSSR>
                  {musicStatus === true && (
                  <li onClick={pauseMusic}>
                  <a href="#" ><Icon color="#1c1c1c" fontSize={25} as={FiVolume2}/></a>
                  <ul style={{top:"-5px",left:"3px", width:"150px"}}>
                    <li className="list-item-menu" style={{ width: '115px'}}>Sound </li>
                  </ul>
                  </li>
                  )}  
                  {musicStatus === false && (
                  <li onClick={startMusic}>
                  <a href="#" ><Icon color="#1c1c1c" fontSize={25} as={FiVolumeX}/></a>
                    <ul style={{top:"-5px",left:"3px", width:"150px"}}>
                    <li className="list-item-menu" style={{ width: '115px'}}>Sound </li>
                  </ul>
                  </li>
                  )}
                </NoSSR>

              <Link href='/dashboard'>
              <li><Icon as={RiDashboardLine} color='gray.700' width="100%"  height="30px"/>
                <ul style={{top:"-5px",left:"3px", width:"150px"}}>
                  <li className="list-item-menu" style={{ width: '135px'}}>Dashboard </li>
                </ul>
              </li>
              </Link>
                </>
          </ul>

          </div>       
          <div className="logo-menu-box">
            <a  className="ilogo" href="https://www.kosmosbrasil.com.br/" target="_blank"><Image ml="7px" height="30px" src="icons/icon-kosmos.svg" alt="kosmos-logo"/></a>
          </div>
          </div>

        <ModalVideoPlay />
        </>
    )
}

