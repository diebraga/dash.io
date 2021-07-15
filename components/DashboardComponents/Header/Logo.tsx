import Link from 'next/link'
import { Center, Text } from "@chakra-ui/react";

export function Logo() {
  return(
    <Link href='/dashboard'>
      <a>
        <Text
          textAlign='center'
          fontWeight='bold'
          letterSpacing='tight'
          fontSize='4xl'
          w='64'
        >
          dash<Text as='span' color='red.500'>.io</Text>
        </Text>
      </a>
    </Link>
  )
}