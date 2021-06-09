import { Button } from '@chakra-ui/react'

interface PaginationItemProps {
  isCurrent?: boolean
  number: number
}

export function PaginationItem({ isCurrent = false, number }: PaginationItemProps) {
  return (
    <>
    {isCurrent ? (
      <Button
        size='sm'
        fontSize='xs'
        w='4'
        colorScheme='red'
        disabled
        _disabled={{ 
          bgColor: 'red.500',
          cursor: 'default'
        }}
      >
        {number}
    </Button>
    ) : (
    <Button
      size='sm'
      fontSize='xs'
      w='4'
      bgColor='gray.700'
      _hover={{ bgColor: 'gray.500' }} 
    >
      {number}
    </Button>
    )}
  </>
  )
}