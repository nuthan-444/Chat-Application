import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Chat from './Components/Chat'
import { ChatMessagesProvider } from './Contexts/ChatContext'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Home from './Components/Home'
import CreateJoin from './Components/CreateJoin'


const App = () => {



  return (
    <div>
      <BrowserRouter>

        <ChatMessagesProvider>

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path='/createjoin' element={ <CreateJoin /> } />
            <Route path="/chat" element={<Chat />} />
          </Routes>

        </ChatMessagesProvider>

      </BrowserRouter>
    </div>
  )
}

export default App
