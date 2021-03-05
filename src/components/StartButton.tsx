import { FC } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1em;
`

const DropDown = styled.select`
  &:focus {
    outline-style: none;
  }
  font-size: 1.5em;
  font-family: 'Nunito', sans-serif;
  width: 35vw;
  padding: 3px;
  color: #3f3f3f;
`
const StartBtn = styled.button`
  width: 70px;
  margin-left: 1em;
`

export const StartButton: FC = () => {
  return (
    <Container>
      <DropDown>
        <option value=''>50 words</option>
        <option value=''>100 words</option>
      </DropDown>
      <StartBtn>Start</StartBtn>
    </Container>
  )
}
