import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { TenantProvider } from './tenant/TenantProvider'
import { App } from './App'
import './styles/index.css'

// HashRouter: o GitHub Pages não tem fallback de rota para SPA,
// então a rota vive no fragmento e nenhum deploy quebra em refresh.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <TenantProvider>
        <App />
      </TenantProvider>
    </HashRouter>
  </StrictMode>,
)
