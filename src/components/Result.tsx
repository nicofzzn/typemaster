import { FC } from 'react'
import styled from 'styled-components'
import { ResultProp } from '../App'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  color: #3f3f3f;
  margin-top: 5vh;
`
const Span = styled.span<{ color?: '#156608' | '#b12121' }>`
  color: ${props => (props.color ? props.color : '#3f3f3f')};
  font-size: 1.5em;
`

const SpanBig = styled.span`
  font-size: 5em;
  line-height: 0.7em;
`

interface Props {
  result: ResultProp
}

export const Result: FC<Props> = ({ result }) => {
  return (
    <Container>
      <SpanBig>
        {Math.floor(
          (60000 / result.duration) * (result.correct + result.wrong)
        )}
      </SpanBig>
      <span style={{ fontSize: '2.3em' }}>wpm</span>
      <div style={{ marginTop: '1em' }}>
        <Span color='#156608'>{result.correct}</Span>
        <Span> | </Span>
        <Span color='#b12121'>{result.wrong}</Span>
      </div>
      <Span>{Math.floor(result.duration / 1000)} sec</Span>
    </Container>
  )
}
