import { FC } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1em;
`

const Input = styled.input.attrs(props => ({
  type: 'text',
}))`
  &:focus {
    outline-style: none;
  }
  font-size: 1.5em;
  font-family: 'Nunito', sans-serif;
  width: 35vw;
  padding: 3px;
  color: #3f3f3f;
`
const RestartBtn = styled.button`
  width: 70px;
  margin-left: 1em;
`

export const TypeBox: FC = () => {
  return (
    <Container>
      <Input />
      <RestartBtn>Restart</RestartBtn>
    </Container>
  )
}
