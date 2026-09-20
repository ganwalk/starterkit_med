import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { DEFAULT_TENANT, TENANTS } from './tenants'
import type { Tenant } from './tenants'

type Theme = 'light' | 'dark'

interface TenantContextValue {
  tenant: Tenant
  setTenantId: (id: string) => void
  theme: Theme
  toggleTheme: () => void
  tenants: Tenant[]
}

const TenantContext = createContext<TenantContextValue | null>(null)

export function TenantProvider({ children }: { children: ReactNode }) {
  const [tenantId, setTenantId] = useState<string>(DEFAULT_TENANT.id)
  const [theme, setTheme] = useState<Theme>('light')

  // Trocar de clínica ou de tema só reescreve dois atributos no <html>.
  // Toda a UI reage por CSS custom property, sem re-render de componente.
  useEffect(() => {
    document.documentElement.dataset.tenant = tenantId
  }, [tenantId])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'))
  }, [])

  const value = useMemo<TenantContextValue>(() => {
    const tenant = TENANTS.find((item) => item.id === tenantId) ?? DEFAULT_TENANT
    return { tenant, setTenantId, theme, toggleTheme, tenants: TENANTS }
  }, [tenantId, theme, toggleTheme])

  return <TenantContext.Provider value={value}>{children}</TenantContext.Provider>
}

export function useTenant(): TenantContextValue {
  const context = useContext(TenantContext)
  if (!context) throw new Error('useTenant precisa estar dentro de <TenantProvider>')
  return context
}
