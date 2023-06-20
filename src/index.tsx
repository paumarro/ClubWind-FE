import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Finanzen from './pages/Verein'
import Members from './pages/Members'
import './styles/index.css'
import Verein from './pages/Verein'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Dashboard/>} />
          <Route path='mitglieder' element={<Members />} />
          <Route path='verein' element={<Verein />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
