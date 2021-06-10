import { Text } from '@chakra-ui/react'
import Link from 'next/link'

export function Logo() {
  return(
    <Link href='/dashboard' passHref>
      <Text
        fontWeight='bold'
        letterSpacing='tight'
        fontSize={['2xl', '3xl']}
        w='64'
      >
        dash<Text as='span' color='red.500'>.io</Text>
      </Text>
    </Link>
  )
}