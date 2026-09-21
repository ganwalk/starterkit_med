import { useState } from 'react'
import { Tick02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Alert, Button, Card, Field, Switch } from '@/ds'
import { cn } from '@/lib/cn'
import { useTenant } from '@/tenant/TenantProvider'

const NOTAS = [1, 2, 3, 4, 5]
const ROTULOS = ['Muito ruim', 'Ruim', 'Regular', 'Boa', 'Excelente']

const ASPECTOS = [
  'Tempo de espera',
  'Atendimento da recepção',
  'Consulta com o profissional',
  'Facilidade para agendar',
]

/**
 * Pesquisa de satisfação pós-consulta — §4 da matriz de paridade.
 *
 * O consentimento para publicar o comentário é separado e desligado por
 * padrão: a Resolução CFM 2.336/2023 admite depoimento sóbrio, sem promessa
 * de resultado, mas transformar resposta de pesquisa em publicidade sem
 * pedir seria usar o dado para uma finalidade que o paciente não autorizou.
 */
export function PesquisaSatisfacao() {
  const { tenant } = useTenant()
  const [nota, setNota] = useState<number | null>(null)
  const [detalhes, setDetalhes] = useState<Record<string, number>>({})
  const [comentario, setComentario] = useState('')
  const [autorizaPublicar, setAutorizaPublicar] = useState(false)
  const [enviado, setEnviado] = useState(false)

  if (enviado) {
    return (
      <Card>
        <div className="flex items-start gap-3">
          <span className="bg-success-soft text-success flex size-9 shrink-0 items-center justify-center rounded-full">
            <HugeiconsIcon icon={Tick02Icon} size={18} strokeWidth={2} />
          </span>
          <div className="min-w-0">
            <h3 className="text-h4 text-primary font-semibold">Obrigado pela avaliação</h3>
            <p className="text-secondary mt-1 text-sm">
              Sua resposta vai direto para a equipe da {tenant.nome}.
              {autorizaPublicar
                ? ' Seu comentário poderá ser publicado, como você autorizou.'
                : ' Seu comentário não será publicado.'}
            </p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <h3 className="text-h4 text-primary font-semibold">Como foi seu atendimento?</h3>
      <p className="text-secondary mt-1 text-sm">
        Consulta de 12 de agosto com a Dra. Helena Marques. Leva menos de um minuto.
      </p>

      <div className="mt-5">
        <p className="text-secondary mb-2 text-sm font-medium">Avaliação geral</p>
        <div className="flex flex-wrap gap-2">
          {NOTAS.map((n) => (
            <button
              key={n}
              onClick={() => setNota(n)}
              aria-pressed={nota === n}
              aria-label={`${n} de 5 — ${ROTULOS[n - 1]}`}
              className={cn(
                'flex min-h-[var(--target-comfortable)] flex-col items-center justify-center rounded-md border px-3 py-1.5 transition-base',
                nota === n
                  ? 'border-transparent bg-active text-on-active'
                  : 'border-subtle text-primary hover:border-accent hover:text-accent',
              )}
            >
              <span className="text-sm font-bold tabular">{n}</span>
              <span className="text-2xs">{ROTULOS[n - 1]}</span>
            </button>
          ))}
        </div>
      </div>

      {nota !== null && (
        <>
          <div className="border-subtle mt-6 space-y-4 border-t pt-5">
            <p className="text-secondary text-sm font-medium">O que pesou na sua nota?</p>
            {ASPECTOS.map((aspecto) => (
              <div key={aspecto} className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-primary min-w-0 text-sm">{aspecto}</span>
                <div className="flex gap-1">
                  {NOTAS.map((n) => (
                    <button
                      key={n}
                      onClick={() => setDetalhes((d) => ({ ...d, [aspecto]: n }))}
                      aria-label={`${aspecto}: ${n} de 5`}
                      className={cn(
                        'size-8 rounded-full border text-xs font-semibold tabular transition-base',
                        detalhes[aspecto] === n
                          ? 'border-transparent bg-accent text-accent-contrast'
                          : 'border-subtle text-muted hover:border-accent',
                      )}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Field
              label="Quer contar mais alguma coisa?"
              hint="Opcional. A equipe da clínica lê todas as respostas."
            >
              {(id) => (
                <textarea
                  id={id}
                  rows={3}
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  placeholder="Escreva aqui"
                  className="bg-card border-subtle text-body text-primary placeholder:text-faint hover:border-line-strong focus:border-accent w-full rounded-md border px-3 py-2 transition-base focus:outline-none"
                />
              )}
            </Field>
          </div>

          {comentario.trim().length > 0 && (
            <div className="mt-5 space-y-3">
              <Switch
                checked={autorizaPublicar}
                onChange={setAutorizaPublicar}
                label="Autorizo a clínica a publicar meu comentário"
              />
              <Alert tone="info">
                Desligado por padrão. Responder a pesquisa não autoriza usar o texto como
                publicidade — a autorização é separada e você pode retirá-la depois.
              </Alert>
            </div>
          )}

          <div className="mt-6">
            <Button variant="accent" icon={Tick02Icon} onClick={() => setEnviado(true)}>
              Enviar avaliação
            </Button>
          </div>
        </>
      )}
    </Card>
  )
}
