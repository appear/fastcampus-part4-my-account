import styled from '@emotion/styled'
import { css } from '@emotion/react'

export default function Home() {
  return (
    <Container>
      <div css={bold}>Hello</div>
    </Container>
  )
}

const Container = styled.div`
  background-color: pink;
`

const bold = css`
  font-weight: bold;
`
