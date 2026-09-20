import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '@/app/AppShell'
import { AgendaPage } from '@/pages/AgendaPage'
import { RecepcaoPage } from '@/pages/RecepcaoPage'
import { PacientesPage } from '@/pages/PacientesPage'
import { ConversasPage } from '@/pages/ConversasPage'
import { FunilPage } from '@/pages/FunilPage'
import { IndicadoresPage } from '@/pages/IndicadoresPage'
import { FinanceiroPage } from '@/pages/FinanceiroPage'
import { MigracaoPage } from '@/pages/MigracaoPage'
import { MarcaPage } from '@/pages/MarcaPage'
import { SuportePage } from '@/pages/SuportePage'
import { SegurancaPage } from '@/pages/SegurancaPage'
import { PortalPage } from '@/pages/PortalPage'
import { DesignSystemPage } from '@/pages/DesignSystemPage'

/** Telas do app da recepção: todas dentro do shell com navegação lateral */
const APP_ROUTES = [
  { path: '/agenda', element: <AgendaPage /> },
  { path: '/recepcao', element: <RecepcaoPage /> },
  { path: '/pacientes', element: <PacientesPage /> },
  { path: '/conversas', element: <ConversasPage /> },
  { path: '/funil', element: <FunilPage /> },
  { path: '/indicadores', element: <IndicadoresPage /> },
  { path: '/financeiro', element: <FinanceiroPage /> },
  { path: '/migracao', element: <MigracaoPage /> },
  { path: '/marca', element: <MarcaPage /> },
  { path: '/suporte', element: <SuportePage /> },
  { path: '/seguranca', element: <SegurancaPage /> },
]

export function App() {
  return (
    <Routes>
      {/* Portal do paciente e a documentação vivem fora do shell:
          um é voltado ao paciente, o outro é material de referência. */}
      <Route path="/portal" element={<PortalPage />} />
      <Route path="/design-system" element={<DesignSystemPage />} />

      {APP_ROUTES.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<AppShell>{route.element}</AppShell>}
        />
      ))}

      <Route path="/" element={<Navigate to="/agenda" replace />} />
      <Route path="*" element={<Navigate to="/agenda" replace />} />
    </Routes>
  )
}
