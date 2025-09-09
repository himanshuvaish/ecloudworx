import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import UniversityLanding from './UniversityLanding'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UniversityLanding />
  </React.StrictMode>
)
