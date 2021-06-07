import { Box, Button, Stack } from '@chakra-ui/react'

export function Pagination() {
  return (
    <Stack direction='row' spacing='4' mt='8' justify='space-between' align='center'>
      <Box>
        <strong>0</strong> - <strong>10</strong> of <strong>100</strong>
      </Box>
      <Stack direction='row' spacing='2'>
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
          1
        </Button>
        <Button
          size='sm'
          fontSize='xs'
          w='4'
          bgColor='gray.700'
          _hover={{ bgColor: 'gray.500' }}
        >
          1
        </Button>
      </Stack>
    </Stack>
  )
}