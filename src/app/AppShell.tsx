import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Cancel01Icon, Menu01Icon, Notification03Icon, Search01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Avatar, IconButton } from '@/ds'
import { cn } from '@/lib/cn'
import { useTenant } from '@/tenant/TenantProvider'
import { NAV } from './navigation'
import { TenantSwitcher } from './TenantSwitcher'

function Marca() {
  const { tenant } = useTenant()
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <span className="bg-accent size-7 shrink-0 rounded-md" aria-hidden />
      <span className="text-primary truncate text-h4 font-extrabold tracking-[-0.02em]">
        {tenant.marca}
      </span>
    </div>
  )
}

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
      {/* Sidebar fixa no desktop */}
      <aside className="border-subtle bg-card fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r px-4 py-5 lg:flex">
        <div className="mb-8 px-3">
          <Marca />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <NavLista />
        </div>
        <div className="border-subtle mt-4 flex items-center gap-3 border-t px-3 pt-4">
          <Avatar nome="Marina Prado" size="sm" />
          <div className="min-w-0 flex-1">
            <p className="text-primary truncate text-xs font-semibold">Marina Prado</p>
            <p className="text-faint truncate text-2xs">Recepção</p>
          </div>
        </div>
      </aside>

      {/* Gaveta no celular e tablet */}
      {gavetaAberta && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Fechar menu"
            onClick={() => setGavetaAberta(false)}
            className="absolute inset-0 bg-[rgba(12,14,19,0.4)]"
          />
          <div className="bg-card relative flex h-full w-[17rem] max-w-[85vw] flex-col px-4 py-5 shadow-xl">
            <div className="mb-8 flex items-center justify-between px-3">
              <Marca />
              <IconButton
                icon={Cancel01Icon}
                label="Fechar menu"
                size="sm"
                onClick={() => setGavetaAberta(false)}
              />
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">
              <NavLista onNavigate={() => setGavetaAberta(false)} />
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
              <Marca />
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
              <div className="hidden xl:block">
                <TenantSwitcher />
              </div>
              <IconButton icon={Notification03Icon} label="Notificações" size="sm" />
            </div>
          </div>

          {/* Em telas menores o seletor de clínica ganha a própria faixa,
              em vez de espremer o cabeçalho e causar scroll horizontal. */}
          <div className="border-subtle overflow-x-auto border-t px-4 py-2 sm:px-6 xl:hidden">
            <TenantSwitcher />
          </div>
        </header>

        <main className="min-w-0">{children}</main>
      </div>
    </div>
  )
}
