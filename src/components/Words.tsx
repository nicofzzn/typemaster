import { FC, Fragment } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  font-size: 1.5em;
  text-align: justify;
  line-height: 1.3em;
  color: #3f3f3f;
  word-wrap: break-word;
`
const Text = styled.span<{
  status?: 'CORRECT' | 'WRONG' | ''
  highlight?: 'HIGHLIGHT' | 'HIGHLIGHT-WRONG' | ''
}>`
  color: ${props => {
    switch (props.status) {
      case 'CORRECT':
        return '#156608'
      case 'WRONG':
        return '#B12121'
      default:
        return '#3f3f3f'
    }
  }};
  background-color: ${props => {
    switch (props.highlight) {
      case 'HIGHLIGHT':
        return '#C4C4C4'
      case 'HIGHLIGHT-WRONG':
        return '#b65757'
      default:
        return ''
    }
  }};
  padding: 0 4px;
  border-radius: 3px;
`

interface Props {
  words: Array<{
    word: string
    isCorrect: boolean | null
  }>
  currentIndex: number
  input: string
}

export const Words: FC<Props> = ({ words, currentIndex, input }) => {
  function handleHighlight(
    idx: number,
    currentIndex: number,
    input: string,
    word: string
  ): 'HIGHLIGHT' | 'HIGHLIGHT-WRONG' | '' {
    if (idx === currentIndex) {
      if (
        input.split('').slice(0, input.length).join('') ===
        word.split('').slice(0, input.length).join('')
      )
        return 'HIGHLIGHT'
      return 'HIGHLIGHT-WRONG'
    }
    return ''
  }

  function handleIsCorrect(p: {
    word: string
    isCorrect: boolean | null
  }): 'CORRECT' | 'WRONG' | '' {
    if (p.isCorrect === true) return 'CORRECT'
    if (p.isCorrect === false) return 'WRONG'
    return ''
  }

  return (
    <Container>
      {words.map((p, idx) => (
        <Fragment key={idx}>
          <Text
            status={handleIsCorrect(p)}
            highlight={handleHighlight(idx, currentIndex, input, p.word)}
          >
            {p.word}
          </Text>
          <span> </span>
        </Fragment>
      ))}
    </Container>
  )
}
