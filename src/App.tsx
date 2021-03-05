import { FC, useReducer, useState } from 'react'
import styled from 'styled-components'
import randomWords from 'random-words'
import { StartButton } from './components/StartButton'
import { Words } from './components/Words'
import { TypeBox } from './components/TypeBox'
import { Result } from './components/Result'

const Container = styled.div`
  margin: 0 25%;
  padding: 3em 0;
`

export function wordsReducer(
  state: Array<{ word: string; isCorrect: boolean | null }>,
  action: {
    type: 'GENERATE' | 'RESET' | 'SET_CORRECT' | 'SET_WRONG'
    payload?: any
  }
) {
  switch (action.type) {
    case 'GENERATE':
      return action.payload
    case 'SET_CORRECT':
      console.log('correct', action.payload)
      return state.map((p, index) => {
        if (action.payload === index) return { ...p, isCorrect: true }
        return p
      })
    case 'SET_WRONG':
      console.log('wrong', action.payload)
      return state.map((p, index) => {
        if (action.payload === index) return { ...p, isCorrect: false }
        return p
      })
    case 'RESET':
      return []
    default:
      return []
  }
}

const App: FC = () => {
  const [words, dispatch] = useReducer(wordsReducer, [])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [input, setInput] = useState('')

  function generateWords(wordsCount: number): void {
    const randw = randomWords(wordsCount)
    if (typeof randw === 'object') {
      dispatch({
        type: 'GENERATE',
        payload: randw.map(a => ({ word: a, isCorrect: null })),
      })
    }
  }

  function resetWords(): void {
    dispatch({
      type: 'RESET',
    })
    setCurrentIndex(0)
  }

  return (
    <div className='App'>
      <Container>
        <Words words={words} currentIndex={currentIndex} input={input} />
        {/* <Result /> */}
        {words.length > 0 ? (
          <TypeBox
            words={words}
            resetWords={resetWords}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            input={input}
            setInput={setInput}
            dispatch={dispatch}
          />
        ) : (
          <StartButton generateWords={generateWords} />
        )}
      </Container>
    </div>
  )
}

export default App
