import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { useTenant } from '@/tenant/TenantProvider'
import { TenantSwitcher } from '@/app/TenantSwitcher'
import { DesignSystemPage } from '@/pages/DesignSystemPage'
import { AgendaPage } from '@/pages/AgendaPage'
import { PortalPage } from '@/pages/PortalPage'

const SECTIONS = [
  { to: '/design-system', label: 'Design system' },
  { to: '/agenda', label: 'Agenda' },
  { to: '/portal', label: 'Portal do paciente' },
]

function Header() {
  const { tenant } = useTenant()

  return (
    <header className="border-subtle bg-card/80 sticky top-0 z-40 border-b backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5">
            <span className="bg-accent size-7 shrink-0 rounded-md" aria-hidden />
            <span className="text-primary text-h4 font-extrabold tracking-[-0.02em]">
              {tenant.marca}
            </span>
          </div>

          <nav className="bg-sunken hidden items-center gap-1 rounded-pill p-1 md:flex">
            {SECTIONS.map((section) => (
              <NavLink
                key={section.to}
                to={section.to}
                className={({ isActive }) =>
                  cn(
                    'rounded-pill px-4 py-1.5 text-sm font-medium transition-base',
                    isActive
                      ? 'bg-active text-on-active shadow-xs'
                      : 'text-secondary hover:text-primary',
                  )
                }
              >
                {section.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <TenantSwitcher />
      </div>
    </header>
  )
}

export function App() {
  return (
    <div className="bg-page min-h-screen">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/design-system" replace />} />
          <Route path="/design-system" element={<DesignSystemPage />} />
          <Route path="/agenda" element={<AgendaPage />} />
          <Route path="/portal" element={<PortalPage />} />
          <Route path="*" element={<Navigate to="/design-system" replace />} />
        </Routes>
      </main>
    </div>
  )
}
