import { Text } from '@chakra-ui/react'

export function Logo() {
  return(
    <>
      <Text
        fontWeight='bold'
        letterSpacing='tight'
        fontSize={['2xl', '3xl']}
        w='64'
      >
        dash<Text as='span' color='red.500'>.io</Text>
      </Text>
    </>
  )
}