import { Box, Stack } from '@chakra-ui/react'
import { PaginationItem } from "./PaginationItem";
export function Pagination() {
  return (
    <Stack direction='row' spacing='4' mt='8' justify='space-between' align='center'>
      <Box>
        <strong>0</strong> - <strong>10</strong> of <strong>100</strong>
      </Box>
      <Stack direction='row' spacing='2'>
        <PaginationItem number={1} isCurrent />
        <PaginationItem number={2} />
        <PaginationItem number={3} />
        <PaginationItem number={4} />
      </Stack>
    </Stack>
  )
}