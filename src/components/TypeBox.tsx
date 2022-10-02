import React, { FC, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { ResultProp } from '../App'

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

  @media (max-width: 800px) {
    width: 65vw;
  }
`
const RestartBtn = styled.button`
  padding: 0;
  width: 70px;
  margin-left: 1em;
  font-size: 1.2em;

  @media (max-width: 800px) {
    width: 15vw;
  }
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
  setResult: React.Dispatch<React.SetStateAction<ResultProp>>
}

export const TypeBox: FC<Props> = ({
  words,
  resetWords,
  currentIndex,
  setCurrentIndex,
  input,
  setInput,
  dispatch,
  setResult,
}) => {
  const [start, setStart] = useState<number>(0)
  const inputRef = useRef<HTMLInputElement>(null)

  function startSession() {
    if (input.length === 0 && currentIndex === 0) {
      setStart(Date.now())
    }
  }

  function endSession() {
    setResult({
      duration: Date.now() - start,
      correct: words.reduce((acc, p) => {
        if (p.isCorrect === true) return acc + 1
        return acc + 0
      }, 0),
      wrong: words.reduce((acc, p) => {
        if (p.isCorrect === false) return acc + 1
        return acc + 0
      }, 0),
      accuarcy: 0,
      keystroke: {
        correct: 0,
        wrong: 0,
      },
    })
  }

//   function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
//     startSession()

//     if (e.code === 'Space' && currentIndex < words.length) {
//       if (input === words[currentIndex].word) {
//         dispatch({
//           type: 'SET_CORRECT',
//           payload: currentIndex,
//         })
//       } else {
//         if (input.length !== 0) {
//           dispatch({
//             type: 'SET_WRONG',
//             payload: currentIndex,
//           })
//         }
//       }

//       if (currentIndex < words.length) {
//         if (input.length !== 0) {
//           setCurrentIndex(p => p + 1)
//         }
//       }
//       setInput('')
//     }
//   }

  function onBeforeInput(e: any) {
    startSession()

    if (e.data.slice(-1) === ' ' && currentIndex < words.length) {
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

      if (currentIndex < words.length) {
        if (input.length !== 0) {
          setCurrentIndex(p => p + 1)
        }
      }
      setInput('')
    }
  }

  function onKeyUp() {
    if (currentIndex === words.length) {
      endSession()
      dispatch({ type: 'RESET' })
      setCurrentIndex(0)
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
        // onKeyDown={e => onKeyDown(e)}
        onKeyUp={e => onKeyUp()}
        onBeforeInput={(e: any) => onBeforeInput(e)}
        autoCapitalize='off'
        autoComplete='off'
        autoCorrect='off'
      />
      <RestartBtn
        onClick={() => {
          resetWords()
        }}
      >
        Reset
      </RestartBtn>
    </Container>
  )
}
