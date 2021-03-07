import { FC, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

interface Props {
  start(wordsCount: number): void
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5em;
`

const DropDown = styled.select`
  &:focus {
    outline-style: none;
  }
  font-size: 1.5em;
  width: 35vw;
  padding: 3px;
  color: #3f3f3f;
`
const StartBtn = styled.button`
  padding: 0;
  width: 70px;
  margin-left: 1em;
  font-size: 1.2em;
`

export const StartButton: FC<Props> = ({ start }) => {
  const [wordCount, setWordCount] = useState<number>(50)
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
        <option value={50}>50 words</option>
        <option value={100}>100 words</option>
      </DropDown>
      <StartBtn onClick={e => start(wordCount)}>Start</StartBtn>
    </Container>
  )
}
