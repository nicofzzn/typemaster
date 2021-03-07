import { FC, Fragment, useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  font-size: 2em;
  text-align: justify;
  line-height: 1.4em;
  color: #3f3f3f;
  word-wrap: break-word;
  height: 4em;
  overflow: hidden;
  margin-top: 10vh;
`
const Wrapper = styled.div<{ top: number }>`
  position: relative;
  top: ${props => `${props.top}em`};
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
  padding: 0 1px;
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
  const [position, setPosition] = useState(1.4)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const highlightedWordRef = useRef<HTMLSpanElement>(null)

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

  useLayoutEffect(() => {
    if (wrapperRef.current && highlightedWordRef.current) {
      const different =
        highlightedWordRef.current.getBoundingClientRect().left -
        wrapperRef.current.getBoundingClientRect().left

      if (different < 5) {
        setPosition(prev => prev - 1.4)
      }
    }
  }, [currentIndex])

  return (
    <Container>
      <Wrapper ref={wrapperRef} top={position}>
        {words.map((p, idx) => (
          <Fragment key={idx}>
            <Text
              status={handleIsCorrect(p)}
              highlight={handleHighlight(idx, currentIndex, input, p.word)}
              ref={
                handleHighlight(idx, currentIndex, input, p.word) ===
                  'HIGHLIGHT' ||
                handleHighlight(idx, currentIndex, input, p.word) ===
                  'HIGHLIGHT-WRONG'
                  ? highlightedWordRef
                  : null
              }
            >
              {p.word}
            </Text>
            <span> </span>
          </Fragment>
        ))}
      </Wrapper>
    </Container>
  )
}
