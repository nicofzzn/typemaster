import React, { FC, useEffect, useRef } from 'react'
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
  width: 35vw;
  padding: 3px;
  color: #3f3f3f;
`
const RestartBtn = styled.button`
  padding: 0;
  width: 70px;
  margin-left: 1em;
  font-size: 1.2em;
`

interface Props {
  words: Array<{
    word: string
    isCorrect: boolean | null
  }>
  resetWords(): void
  currentIndex: number
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
  input: string
  setInput: React.Dispatch<React.SetStateAction<string>>
  dispatch: React.Dispatch<{
    type: 'GENERATE' | 'RESET' | 'SET_CORRECT' | 'SET_WRONG'
    payload?: any
  }>
}

export const TypeBox: FC<Props> = ({
  words,
  resetWords,
  currentIndex,
  setCurrentIndex,
  input,
  setInput,
  dispatch,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === ' ') {
      if (input === words[currentIndex].word) {
        dispatch({
          type: 'SET_CORRECT',
          payload: currentIndex,
        })
      } else {
        if (input.length !== 0) {
          dispatch({
            type: 'SET_WRONG',
            payload: currentIndex,
          })
        }
      }
      if (currentIndex < words.length - 1) {
        if (input.length !== 0) {
          setCurrentIndex(p => p + 1)
        }
      } else {
        dispatch({ type: 'RESET' })
        setCurrentIndex(0)
      }
      setInput('')
    }
  }

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <Container>
      <Input
        ref={inputRef}
        value={input}
        onChange={e => setInput(e.target.value.trim())}
        onKeyDown={e => onKeyDown(e)}
      />
      <RestartBtn onClick={resetWords}>Reset</RestartBtn>
    </Container>
  )
}
