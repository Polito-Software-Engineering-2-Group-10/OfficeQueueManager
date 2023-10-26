import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
//import './App.css'

import OfficerPage from './pages/OfficerPage.jsx'

import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<OfficerPage/>}></Route>
        <Route path='/officer' element={<OfficerPage/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
