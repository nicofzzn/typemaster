import { FC } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  font-size: 1.5em;
  text-align: justify;
  line-height: 1.3em;
  font-weight: 300;
  font-family: 'Nunito', sans-serif;
  color: #3f3f3f;
  word-wrap: break-word;
`
const Text = styled.span<{ status: string; highlight: string }>`
  color: ${props => {
    switch (props.status) {
      case 'correct':
        return '#156608'
      case 'wrong':
        return '#B12121'
      default:
        return '#3f3f3f'
    }
  }};
  background-color: ${props => {
    switch (props.highlight) {
      case 'highlight':
        return '#C4C4C4'
      case 'highlight-wrong':
        return '#B12121'
      default:
        return ''
    }
  }};
`
const words =
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis nam alias eius, earum quam repellendus mollitia, omnis voluptatum est molestiae nisi. Explicabo exercitationem ducimus modi similique quas adipisci perspiciatis neque, eligendi consectetur dolor culpa aspernatur laborum cum pariatur impedit omnis? Voluptatem voluptates aut nisi excepturi voluptas eum accusamus animi quas.'

export const Words: FC = () => {
  return (
    <Container>
      {words.split(' ').map((word, idx) => (
        <Text key={idx} status='' highlight=''>
          {word + ' '}
        </Text>
      ))}
    </Container>
  )
}
