import React from 'react'
import styled from 'styled-components'
import { StartButton } from './components/StartButton'
import { Words } from './components/Words'
import { TypeBox } from './components/TypeBox'

const Container = styled.div`
  margin: 0 25%;
  padding: 3em 0;
`

function App() {
  return (
    <div className='App'>
      <Container>
        <Words />
        <StartButton />
        <TypeBox />
      </Container>
    </div>
  )
}

export default App
