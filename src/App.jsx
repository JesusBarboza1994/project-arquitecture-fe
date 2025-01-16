import { Route, Routes } from 'react-router-dom'
import SearchPage from './pages/SearchPage'
import newStyled from '@emotion/styled'
import { useEffect } from 'react'
import { socketConnect } from './sockets/sockets'

const Wrapper = newStyled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  height: 100vh;
  padding-top: 4rem;
`
function App() {
  useEffect(() => {
    socketConnect()
  }, [])
  return (
    <Wrapper>
      <Routes>
        <Route path="/" element={<SearchPage />} />
      </Routes>
    </Wrapper>
  )
}

export default App
