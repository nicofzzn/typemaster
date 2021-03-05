import { FC } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  color: #3f3f3f;
  font-size: 1.2em;
  line-height: 1.8em;
`

const Left = styled.div`
  padding: 0 0.2em;
  width: 35vw;
`

const Right = styled.div`
  padding: 0 0.2em;
  width: 120px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  font-size: 2em;
  line-height: 1.4em;
`

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const Span = styled.span<{ color?: '#156608' | '#b12121' }>`
  color: ${props => (props.color ? props.color : '#3f3f3f')};
  font-weight: 800;
`

const SpanBig = styled.span`
  font-size: 2.3em;
`

export const Result: FC = () => {
  return (
    <Container>
      <Left>
        <ItemContainer>
          <span>Keystroke</span>
          <div>
            <Span color='#156608'>330</Span> | <Span color='#b12121'>24</Span>
          </div>
        </ItemContainer>
        <ItemContainer>
          <span>Accuracy</span>
          <Span>98%</Span>
        </ItemContainer>
        <ItemContainer>
          <span>Correct Words</span>
          <Span color='#156608'>77</Span>
        </ItemContainer>
        <ItemContainer>
          <span>Wrong Words</span>
          <Span color='#b12121'>22</Span>
        </ItemContainer>
      </Left>
      <Right>
        <SpanBig>87</SpanBig>
        <span>wpm</span>
      </Right>
    </Container>
  )
}
