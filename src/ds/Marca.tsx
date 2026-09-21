import { useTenant } from '@/tenant/TenantProvider'
import { cn } from '@/lib/cn'

const TAMANHO = {
  sm: 'size-7 rounded-md text-xs',
  md: 'size-9 rounded-lg text-sm',
  lg: 'size-16 rounded-xl text-h3',
} as const

export interface MarcaProps {
  /** `solido` sobre fundo claro; `sobreCor` dentro da zona de marca */
  tone?: 'solido' | 'sobreCor'
  size?: keyof typeof TAMANHO
  className?: string
  /** Sobrepõe o logo do contexto — usado na prévia do motor de marca */
  logo?: string | null
}

/**
 * O selo da clínica. Existe como componente porque o mesmo símbolo aparece
 * no menu, no portal e na prévia do motor de marca: antes eram três
 * quadrados coloridos vazios soltos pelo código, e o do portal — translúcido
 * sobre o gradiente — parecia imagem que não carregou.
 *
 * Sem logo enviado, mostra o monograma. É `aria-hidden` de propósito: o nome
 * da clínica sempre vem escrito ao lado, e anunciar os dois faz o leitor de
 * tela repetir a marca duas vezes seguidas.
 */
export function Marca({ tone = 'solido', size = 'sm', className, logo }: MarcaProps) {
  const { tenant, logo: logoContexto } = useTenant()
  const arquivo = logo === undefined ? logoContexto : logo

  if (arquivo) {
    return (
      <img
        src={arquivo}
        alt=""
        aria-hidden
        className={cn(TAMANHO[size], 'shrink-0 object-contain', className)}
      />
    )
  }

  return (
    <span
      aria-hidden
      className={cn(
        TAMANHO[size],
        'flex shrink-0 items-center justify-center font-extrabold',
        tone === 'solido' ? 'bg-accent text-white' : 'bg-white/20 text-white backdrop-blur-sm',
        className,
      )}
    >
      {tenant.marca[0]}
    </span>
  )
}
