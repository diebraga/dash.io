import { useMiniplay } from '../hooks/useMiniplay'
import dynamic from 'next/dynamic'

const ModalVideo =  dynamic(() => import('react-modal-video'), {
  ssr: false
})

export function ModalVideoPlay() {
  const { setVideoIsOpen, videoIsOpen, videoId } = useMiniplay()

  function closeVideoAndMusicOn() {
    setVideoIsOpen(false)
  }

  return (
    <>
      {/*
      // @ts-ignore */}
      <ModalVideo channel='youtube' 
        autoplay 
        isOpen={videoIsOpen} 
        videoId={videoId}
        onClose={closeVideoAndMusicOn}
      />
    </>
  )
}
