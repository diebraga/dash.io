import { Text, Link as ChakraLink, Icon, LinkProps as ChakraLinkProps } from '@chakra-ui/react'
import { ElementType } from 'react';
import Link from 'next/link';

interface LinkNavProps extends ChakraLinkProps {
  icon: ElementType
  children: string
  href: string
}

export function LinkNav({ icon, children, href, ...rest }: LinkNavProps) {
  return (
    <Link href={href} passHref>
      <ChakraLink display='flex' align='center' {...rest}>
        <Icon as={icon} fontSize='20'/>
        <Text ml='4' fontWeight='medium'>
          {children}
        </Text>
      </ChakraLink>
    </Link>
  )
}