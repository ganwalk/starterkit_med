import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { DEFAULT_TENANT, TENANTS } from './tenants'
import { rampaDeMarca } from './rampa'
import type { Tenant } from './tenants'

type Theme = 'light' | 'dark'

interface TenantContextValue {
  tenant: Tenant
  setTenantId: (id: string) => void
  theme: Theme
  toggleTheme: () => void
  tenants: Tenant[]
  /** Logo enviado no motor de marca, como data URL. `null` usa o monograma */
  logo: string | null
  setLogo: (logo: string | null) => void
  /** Cor digitada no motor de marca. `null` usa a cor do tenant do catálogo */
  corMarca: string | null
  setCorMarca: (cor: string | null) => void
  /** A cor que está valendo agora, personalizada ou do catálogo */
  corAtiva: string
}

const TenantContext = createContext<TenantContextValue | null>(null)

export function TenantProvider({ children }: { children: ReactNode }) {
  const [tenantId, setTenantId] = useState<string>(DEFAULT_TENANT.id)
  const [theme, setTheme] = useState<Theme>('light')
  const [logo, setLogo] = useState<string | null>(null)
  const [corMarca, setCorMarca] = useState<string | null>(null)

  // Trocar de clínica ou de tema só reescreve dois atributos no <html>.
  // Toda a UI reage por CSS custom property, sem re-render de componente.
  // O logo é de uma clínica só: trocar de tenant tem que descartá-lo, senão
  // a marca enviada para a Aurora reaparece dentro da Clínica Vida.
  useEffect(() => {
    document.documentElement.dataset.tenant = tenantId
    setLogo(null)
    setCorMarca(null)
  }, [tenantId])

  /**
   * A cor personalizada é escrita como variável inline no <html>, e por isso
   * ganha da regra `[data-tenant=...]` por especificidade. É o que faz a
   * escolha da clínica valer no produto inteiro — botão, aba ativa, bloco de
   * data do portal — e não só num retângulo de prévia.
   */
  useEffect(() => {
    const raiz = document.documentElement
    const rampa = corMarca ? rampaDeMarca(corMarca) : null
    const chaves = ['--brand-50', '--brand-100', '--brand-500', '--brand-600', '--brand-contrast']
    if (!rampa) {
      chaves.forEach((chave) => raiz.style.removeProperty(chave))
      return
    }
    Object.entries(rampa).forEach(([chave, valor]) => raiz.style.setProperty(chave, valor))
  }, [corMarca])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'))
  }, [])

  const value = useMemo<TenantContextValue>(() => {
    const tenant = TENANTS.find((item) => item.id === tenantId) ?? DEFAULT_TENANT
    return {
      tenant,
      setTenantId,
      theme,
      toggleTheme,
      tenants: TENANTS,
      logo,
      setLogo,
      corMarca,
      setCorMarca,
      corAtiva: corMarca ?? tenant.amostra,
    }
  }, [tenantId, theme, toggleTheme, logo, corMarca])

  return <TenantContext.Provider value={value}>{children}</TenantContext.Provider>
}

export function useTenant(): TenantContextValue {
  const context = useContext(TenantContext)
  if (!context) throw new Error('useTenant precisa estar dentro de <TenantProvider>')
  return context
}
