import { Badge, Select } from '@/ds'
import type { AgendaStatus } from '@/ds'
import { cn } from '@/lib/cn'
import {
  HORA_FIM,
  HORA_INICIO,
  PROFISSIONAIS,
  SLOT,
  agendamentosDoDia,
  isoDe,
  paraMinutos,
} from '@/data/agenda'
import type { Agendamento } from '@/data/agenda'

const TOTAL_SLOTS = ((HORA_FIM - HORA_INICIO) * 60) / SLOT
const ALTURA_SLOT = 26

const BARRA_STATUS: Record<AgendaStatus, string> = {
  agendado: 'bg-[var(--status-agendado-fg)]',
  confirmado: 'bg-[var(--status-confirmado-fg)]',
  chegou: 'bg-[var(--status-chegou-fg)]',
  atendimento: 'bg-[var(--status-atendimento-fg)]',
  faltou: 'bg-[var(--status-faltou-fg)]',
  cancelado: 'bg-[var(--status-cancelado-fg)]',
}

const DIAS_CURTOS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

export interface VisaoSemanaProps {
  /** Segunda-feira da semana exibida */
  inicioSemana: Date
  hoje: string
  profissionalId: string
  onProfissionalChange: (id: string) => void
  onSelect: (a: Agendamento) => void
  onVerDia: (iso: string) => void
}

/**
 * Semana de um profissional por vez. É assim que a recepção usa a visão:
 * procurando um horário livre para um médico específico. Mostrar os quatro
 * profissionais ao mesmo tempo empilharia consultas no mesmo espaço e a
 * grade deixaria de responder à pergunta que motivou abri-la.
 */
export function VisaoSemana({
  inicioSemana,
  hoje,
  profissionalId,
  onProfissionalChange,
  onSelect,
  onVerDia,
}: VisaoSemanaProps) {
  // Segunda a sábado: a clínica não atende domingo
  const dias = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(inicioSemana)
    d.setDate(inicioSemana.getDate() + i)
    return d
  })

  const horas = Array.from({ length: HORA_FIM - HORA_INICIO }, (_, i) => HORA_INICIO + i)
  const prof = PROFISSIONAIS.find((p) => p.id === profissionalId) ?? PROFISSIONAIS[0]

  const porDia = dias.map((d) => {
    const iso = isoDe(d)
    return {
      data: d,
      iso,
      itens: agendamentosDoDia(iso).filter((a) => a.profissionalId === prof.id),
    }
  })

  const total = porDia.reduce((s, d) => s + d.itens.length, 0)

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="w-full sm:w-64">
          <Select
            aria-label="Profissional"
            value={profissionalId}
            onChange={(e) => onProfissionalChange(e.target.value)}
          >
            {PROFISSIONAIS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome} · {p.sala}
              </option>
            ))}
          </Select>
        </div>
        <Badge tone="neutral">{total} consultas na semana</Badge>
      </div>

      {/* min-width + rolagem interna: a grade rola, a página nunca */}
      <div className="max-h-[calc(100vh-19rem)] overflow-auto">
        <div className="min-w-[44rem]">
          <div
            className="border-subtle bg-card sticky top-0 z-20 grid border-b"
            style={{ gridTemplateColumns: `56px repeat(6, minmax(0, 1fr))` }}
          >
            <div />
            {porDia.map(({ data, iso, itens }) => {
              const ehHoje = iso === hoje
              return (
                <button
                  key={iso}
                  onClick={() => onVerDia(iso)}
                  className="border-subtle hover:bg-hover border-l px-2 py-2.5 text-center transition-base"
                >
                  <p className={cn('text-2xs font-semibold uppercase', ehHoje ? 'text-accent-text' : 'text-muted')}>
                    {DIAS_CURTOS[data.getDay()]}
                  </p>
                  <p
                    className={cn(
                      'mx-auto mt-1 flex size-7 items-center justify-center rounded-full text-sm font-semibold tabular',
                      ehHoje ? 'bg-active text-on-active' : 'text-primary',
                    )}
                  >
                    {data.getDate()}
                  </p>
                  <p className="text-faint mt-1 text-2xs tabular">{itens.length}</p>
                </button>
              )
            })}
          </div>

          <div
            className="relative grid pt-2"
            style={{ gridTemplateColumns: `56px repeat(6, minmax(0, 1fr))` }}
          >
            <div className="grid" style={{ gridTemplateRows: `repeat(${TOTAL_SLOTS}, ${ALTURA_SLOT}px)` }}>
              {horas.map((hora, i) => (
                <div key={hora} className="text-faint relative text-2xs" style={{ gridRow: `${i * 4 + 1} / span 4` }}>
                  <span className="absolute -top-1.5 right-2 tabular">
                    {String(hora).padStart(2, '0')}:00
                  </span>
                </div>
              ))}
            </div>

            {porDia.map(({ iso, itens }) => (
              <div
                key={iso}
                className="border-subtle relative grid border-l"
                style={{ gridTemplateRows: `repeat(${TOTAL_SLOTS}, ${ALTURA_SLOT}px)` }}
              >
                {horas.map((hora, i) => (
                  <div key={hora} className="border-subtle border-t" style={{ gridRow: `${i * 4 + 1} / span 4` }} />
                ))}

                {itens.map((a) => {
                  const linhas = a.duracao / SLOT
                  const cancelado = a.status === 'cancelado'
                  return (
                    <button
                      key={a.id}
                      onClick={() => onSelect(a)}
                      style={{
                        gridRow: `${(paraMinutos(a.inicio) - HORA_INICIO * 60) / SLOT + 1} / span ${linhas}`,
                      }}
                      className={cn(
                        'bg-card border-subtle relative mx-0.5 flex flex-col overflow-hidden rounded-sm border px-1.5 py-0.5 text-left shadow-xs transition-base hover:z-10 hover:shadow-md',
                        cancelado && 'opacity-[var(--opacity-cancelled)]',
                      )}
                    >
                      <span className={cn('absolute inset-y-0 left-0 w-[3px]', BARRA_STATUS[a.status])} />
                      <span
                        className={cn(
                          'text-primary truncate pl-1.5 text-2xs font-semibold',
                          cancelado && 'line-through',
                        )}
                      >
                        {a.paciente}
                      </span>
                      {linhas > 2 && (
                        <span className="text-muted truncate pl-1.5 text-2xs">{a.inicio}</span>
                      )}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-faint mt-3 text-xs">
        Clique no cabeçalho de um dia para abrir a visão de dia com todos os profissionais.
      </p>
    </>
  )
}
