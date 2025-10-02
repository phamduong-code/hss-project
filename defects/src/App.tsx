import { useState } from 'react'
import RequestForm from './components/RequestForm'
import NavMenu from './components/NavMenu'

function App() {

  return (
    <>
    <NavMenu onLogout={() => {
      // Handle logout logic here
      alert('User logged out');
    }} />
      <RequestForm />
    </>
  )
}

export default App
