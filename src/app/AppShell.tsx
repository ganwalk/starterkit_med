import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Cancel01Icon, Menu01Icon, Notification03Icon, Search01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Avatar, IconButton } from '@/ds'
import { cn } from '@/lib/cn'
import { NAV } from './navigation'
import { TenantSwitcher } from './TenantSwitcher'

function NavLista({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-6" aria-label="Navegação principal">
      {NAV.map((grupo) => (
        <div key={grupo.titulo}>
          <p className="text-faint mb-2 px-3 text-2xs font-semibold tracking-wide uppercase">
            {grupo.titulo}
          </p>
          <ul className="flex flex-col gap-0.5">
            {grupo.itens.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    cn(
                      'flex min-h-[var(--target-comfortable)] items-center gap-3 rounded-md px-3 text-sm font-medium transition-base',
                      isActive
                        ? 'bg-active text-on-active'
                        : 'text-secondary hover:bg-hover hover:text-primary',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <HugeiconsIcon
                        icon={item.icon}
                        size={18}
                        strokeWidth={isActive ? 2 : 1.5}
                        className="shrink-0"
                      />
                      <span className="truncate">{item.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}

export function AppShell({ children }: { children: ReactNode }) {
  const [gavetaAberta, setGavetaAberta] = useState(false)
  const { pathname } = useLocation()

  // Fechar a gaveta ao navegar evita ela ficar por cima do conteúdo no celular
  useEffect(() => setGavetaAberta(false), [pathname])

  useEffect(() => {
    if (!gavetaAberta) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setGavetaAberta(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [gavetaAberta])

  return (
    <div className="bg-page min-h-screen">
      {/* Primeiro alvo do Tab: pula a navegação, que tem 11 itens repetidos
          em toda tela. Só aparece quando recebe foco. */}
      <a
        href="#conteudo"
        className="bg-active text-on-active sr-only rounded-md px-4 py-2 text-sm font-semibold focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60]"
      >
        Pular para o conteúdo
      </a>

      {/* Sidebar fixa no desktop */}
      <aside className="border-subtle bg-card fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r px-4 py-5 lg:flex">
        <div className="mb-8 px-1">
          <TenantSwitcher />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <NavLista />
        </div>
        {/* Portal e design system não são telas da recepção: um é do
            paciente, o outro é referência do time. Ficam fora dos grupos
            principais, mas precisam ser alcançáveis pela interface. */}
        <div className="border-subtle mt-4 flex flex-col gap-0.5 border-t pt-3">
          {[
            { to: '/portal', label: 'Portal do paciente' },
            { to: '/design-system', label: 'Design system' },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="text-muted hover:bg-hover hover:text-primary flex min-h-[var(--target-min)] items-center gap-2 rounded-md px-3 text-xs font-medium transition-base"
            >
              <span aria-hidden>↗</span>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="border-subtle mt-3 flex items-center gap-3 border-t px-3 pt-4">
          <Avatar nome="Marina Prado" size="sm" />
          <div className="min-w-0 flex-1">
            <p className="text-primary truncate text-xs font-semibold">Marina Prado</p>
            <p className="text-faint truncate text-2xs">Recepção</p>
          </div>
        </div>
      </aside>

      {/* Gaveta no celular e tablet */}
      {gavetaAberta && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu de navegação">
          <button
            aria-label="Fechar menu"
            tabIndex={-1}
            onClick={() => setGavetaAberta(false)}
            className="animate-fade-in absolute inset-0 bg-[rgba(12,14,19,0.4)]"
          />
          <div className="bg-card animate-slide-in-left relative flex h-full w-[17rem] max-w-[85vw] flex-col px-4 py-5 shadow-xl">
            <div className="mb-8 flex items-center justify-between gap-2 px-1">
              <TenantSwitcher />
              <IconButton
                icon={Cancel01Icon}
                label="Fechar menu"
                size="sm"
                onClick={() => setGavetaAberta(false)}
              />
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">
              <NavLista onNavigate={() => setGavetaAberta(false)} />
              <div className="border-subtle mt-6 flex flex-col gap-0.5 border-t pt-3">
                {[
                  { to: '/portal', label: 'Portal do paciente' },
                  { to: '/design-system', label: 'Design system' },
                ].map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setGavetaAberta(false)}
                    className="text-muted hover:bg-hover hover:text-primary flex min-h-[var(--target-min)] items-center gap-2 rounded-md px-3 text-xs font-medium transition-base"
                  >
                    <span aria-hidden>↗</span>
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="lg:pl-60">
        <header className="border-subtle bg-card/85 sticky top-0 z-20 border-b backdrop-blur-xl">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
            <button
              onClick={() => setGavetaAberta(true)}
              aria-label="Abrir menu"
              className="text-secondary hover:bg-hover hover:text-primary inline-flex size-10 shrink-0 items-center justify-center rounded-full transition-base lg:hidden"
            >
              <HugeiconsIcon icon={Menu01Icon} size={20} strokeWidth={1.5} />
            </button>

            <div className="lg:hidden">
              <TenantSwitcher />
            </div>

            {/* Busca some no celular para o cabeçalho caber sem estourar */}
            <div className="relative hidden min-w-0 flex-1 md:block md:max-w-sm">
              <HugeiconsIcon
                icon={Search01Icon}
                size={18}
                strokeWidth={1.5}
                className="text-faint pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
              />
              <input
                placeholder="Buscar paciente, telefone ou CPF"
                aria-label="Buscar"
                className="bg-sunken text-body text-primary placeholder:text-faint focus:bg-card focus:border-accent h-10 w-full rounded-pill border border-transparent pr-4 pl-10 transition-base focus:outline-none"
              />
            </div>

            <div className="ml-auto flex shrink-0 items-center gap-2">
              <IconButton icon={Notification03Icon} label="Notificações" size="sm" />
            </div>
          </div>

        </header>

        <main id="conteudo" tabIndex={-1} className="min-w-0 focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  )
}
