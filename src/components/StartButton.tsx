import { FC, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

interface Props {
  generateWords(wordsCount: number): void
}

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

export const StartButton: FC<Props> = ({ generateWords }) => {
  const [wordCount, setWordCount] = useState<number>(11)
  const DropdownRef = useRef<HTMLSelectElement>(null)

  useEffect(() => {
    if (DropdownRef && DropdownRef.current) DropdownRef.current.focus()
  }, [])

  return (
    <Container>
      <DropDown
        value={wordCount}
        onChange={e => setWordCount(parseInt(e.target.value))}
        ref={DropdownRef}
      >
        <option value={11}>11 words</option>
        <option value={100}>100 words</option>
      </DropDown>
      <StartBtn onClick={e => generateWords(wordCount)}>Start</StartBtn>
    </Container>
  )
}
