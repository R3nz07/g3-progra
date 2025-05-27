import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './routes/App.jsx'
import { CategoriasProvider } from './hooks/CategoriasContext.jsx';
import { DireccionProvider } from './hooks/DireccionContext.jsx'; // <-- IMPORTA AQUÍ
import './styles/index.module.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CategoriasProvider>
      <DireccionProvider>
        <App />
      </DireccionProvider>
    </CategoriasProvider>
  </StrictMode>,
)
