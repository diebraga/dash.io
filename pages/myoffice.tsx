import { Flex } from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import { parseCookies } from "nookies"
import RenderOffice from "../containers/office"

interface OfficeProps {
  jwt: string
}

export default function MyOffice({ jwt }: OfficeProps) {
  return (
    <Flex height="100vh" bg="gray.800" color="gray.300" alignItems="center" justifyContent="center">
      <RenderOffice jwt={jwt} />
    </Flex>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const jwt = parseCookies(ctx).jwt

  return {
    props: { jwt }, // will be passed to the page component as props
  }
}