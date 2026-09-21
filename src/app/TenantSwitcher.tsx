import { useEffect, useId, useRef, useState } from 'react'
import { Moon02Icon, Sun03Icon, Tick02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { cn } from '@/lib/cn'
import { useTenant } from '@/tenant/TenantProvider'

/**
 * Troca de clínica e de tema.
 *
 * A marca é o próprio controle: clicar nela abre a lista. Antes isto era uma
 * fileira de cinco pílulas no cabeçalho, que ocupava uma faixa inteira no
 * celular e anunciava na interface algo que é da demonstração, não do
 * produto — uma clínica real vê só a própria marca.
 */
export function TenantSwitcher() {
  const { tenant, setTenantId, tenants, theme, toggleTheme } = useTenant()
  const [aberto, setAberto] = useState(false)
  const caixa = useRef<HTMLDivElement>(null)
  const menuId = useId()

  useEffect(() => {
    if (!aberto) return
    const aoClicarFora = (e: MouseEvent) => {
      if (!caixa.current?.contains(e.target as Node)) setAberto(false)
    }
    const aoTeclar = (e: KeyboardEvent) => e.key === 'Escape' && setAberto(false)
    document.addEventListener('mousedown', aoClicarFora)
    document.addEventListener('keydown', aoTeclar)
    return () => {
      document.removeEventListener('mousedown', aoClicarFora)
      document.removeEventListener('keydown', aoTeclar)
    }
  }, [aberto])

  return (
    <div ref={caixa} className="relative">
      <button
        onClick={() => setAberto((a) => !a)}
        aria-expanded={aberto}
        aria-haspopup="menu"
        aria-controls={menuId}
        aria-label={`Clínica atual: ${tenant.nome}. Trocar de clínica`}
        className="hover:bg-hover flex min-h-[var(--target-comfortable)] items-center gap-2.5 rounded-pill pr-3 pl-1.5 transition-base"
      >
        <span className="bg-accent size-7 shrink-0 rounded-md" aria-hidden />
        <span className="text-primary text-h4 font-extrabold tracking-[-0.02em]">
          {tenant.marca}
        </span>
      </button>

      {aberto && (
        <div
          id={menuId}
          role="menu"
          className="bg-card border-subtle animate-scale-in absolute top-full left-0 z-50 mt-2 w-60 rounded-xl border p-1.5 shadow-lg"
        >
          {tenants.map((item) => {
            const ativo = item.id === tenant.id
            return (
              <button
                key={item.id}
                role="menuitemradio"
                aria-checked={ativo}
                onClick={() => {
                  setTenantId(item.id)
                  setAberto(false)
                }}
                className={cn(
                  'flex w-full min-h-[var(--target-comfortable)] items-center gap-2.5 rounded-md px-2.5 text-left transition-base',
                  ativo ? 'bg-accent-soft' : 'hover:bg-hover',
                )}
              >
                <span
                  className="size-4 shrink-0 rounded-full"
                  style={{ backgroundColor: item.amostra }}
                  aria-hidden
                />
                <span className="min-w-0 flex-1">
                  <span className="text-primary block truncate text-sm font-medium">
                    {item.nome}
                  </span>
                  <span className="text-faint block truncate text-2xs">{item.especialidade}</span>
                </span>
                {ativo && (
                  <HugeiconsIcon
                    icon={Tick02Icon}
                    size={16}
                    strokeWidth={2.5}
                    className="text-accent shrink-0"
                  />
                )}
              </button>
            )
          })}

          <div className="border-subtle mt-1.5 border-t pt-1.5">
            <button
              role="menuitem"
              onClick={toggleTheme}
              className="hover:bg-hover text-secondary flex w-full min-h-[var(--target-comfortable)] items-center gap-2.5 rounded-md px-2.5 text-left text-sm transition-base"
            >
              <HugeiconsIcon
                icon={theme === 'light' ? Moon02Icon : Sun03Icon}
                size={16}
                strokeWidth={1.5}
                className="shrink-0"
              />
              {theme === 'light' ? 'Tema escuro' : 'Tema claro'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
