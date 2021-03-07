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

  @media (max-width: 800px) {
    margin: 0 1em;
  }
`

function wordsReducer(
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
      return state.map((p, index) => {
        if (action.payload === index) return { ...p, isCorrect: true }
        return p
      })
    case 'SET_WRONG':
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

export interface ResultProp {
  keystroke: { correct: number; wrong: number }
  accuarcy: number
  correct: number
  wrong: number
  duration: number
}

const initialResult: ResultProp = {
  keystroke: { correct: 0, wrong: 0 },
  accuarcy: 0,
  correct: 0,
  wrong: 0,
  duration: 0,
}

const App: FC = () => {
  const [words, dispatch] = useReducer(wordsReducer, [])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [input, setInput] = useState('')
  const [result, setResult] = useState<ResultProp>(initialResult)

  function start(wordsCount: number): void {
    setResult(initialResult)
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
    setInput('')
  }

  return (
    <div className='App'>
      <Container>
        <Words words={words} currentIndex={currentIndex} input={input} />
        {result.duration > 0 && <Result result={result} />}
        {words.length > 0 ? (
          <TypeBox
            words={words}
            resetWords={resetWords}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            input={input}
            setInput={setInput}
            dispatch={dispatch}
            setResult={setResult}
          />
        ) : (
          <StartButton start={start} />
        )}
      </Container>
    </div>
  )
}

export default App
