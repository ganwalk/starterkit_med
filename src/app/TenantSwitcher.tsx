import { Moon02Icon, Sun03Icon } from '@hugeicons/core-free-icons'
import { IconButton } from '@/ds'
import { useTenant } from '@/tenant/TenantProvider'
import { cn } from '@/lib/cn'

/**
 * Controle da prova de conceito de white label: trocar de clínica reescreve
 * um atributo no <html> e a interface inteira muda de marca sem recarregar.
 */
export function TenantSwitcher() {
  const { tenant, setTenantId, tenants, theme, toggleTheme } = useTenant()

  return (
    <div className="flex items-center gap-3">
      <div className="bg-sunken flex items-center gap-1 rounded-pill p-1">
        {tenants.map((item) => {
          const selected = item.id === tenant.id
          return (
            <button
              key={item.id}
              onClick={() => setTenantId(item.id)}
              aria-pressed={selected}
              title={`${item.nome} — ${item.especialidade}`}
              className={cn(
                'flex min-h-[var(--target-min)] items-center gap-2 rounded-pill px-3 text-xs font-medium transition-base',
                selected ? 'bg-card text-primary shadow-sm' : 'text-secondary hover:text-primary',
              )}
            >
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: item.amostra }}
                aria-hidden
              />
              {item.marca}
            </button>
          )
        })}
      </div>

      <IconButton
        icon={theme === 'light' ? Moon02Icon : Sun03Icon}
        label={theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro'}
        size="sm"
        onClick={toggleTheme}
      />
    </div>
  )
}
