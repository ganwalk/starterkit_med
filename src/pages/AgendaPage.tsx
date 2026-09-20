import { useMemo, useState } from 'react'
import {
  Add01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Calendar03Icon,
  FilterHorizontalIcon,
  Search01Icon,
  WhatsappIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Avatar,
  Badge,
  Button,
  Card,
  IconButton,
  Input,
  Segmented,
  Sheet,
  StatusPill,
} from '@/ds'
import type { AgendaStatus } from '@/ds'
import { cn } from '@/lib/cn'
import { useTenant } from '@/tenant/TenantProvider'
import {
  AGENDAMENTOS,
  HISTORICO,
  HORA_FIM,
  HORA_INICIO,
  PROFISSIONAIS,
  SLOT,
  formatarFaixa,
  paraMinutos,
} from '@/data/agenda'
import type { Agendamento } from '@/data/agenda'

const TOTAL_SLOTS = ((HORA_FIM - HORA_INICIO) * 60) / SLOT
const ALTURA_SLOT = 22
/** Horário "atual" do protótipo, fixo para a tela ficar sempre igual na demonstração */
const AGORA = '10:20'

/** Borda esquerda colorida carrega o status sem gastar área de cor (princípio 7) */
const BARRA_STATUS: Record<AgendaStatus, string> = {
  agendado: 'bg-[var(--status-agendado-fg)]',
  confirmado: 'bg-[var(--status-confirmado-fg)]',
  chegou: 'bg-[var(--status-chegou-fg)]',
  atendimento: 'bg-[var(--status-atendimento-fg)]',
  faltou: 'bg-[var(--status-faltou-fg)]',
  cancelado: 'bg-[var(--status-cancelado-fg)]',
}

function CartaoAgendamento({
  agendamento,
  onSelect,
}: {
  agendamento: Agendamento
  onSelect: (a: Agendamento) => void
}) {
  const linhas = agendamento.duracao / SLOT
  const compacto = linhas <= 2
  const cancelado = agendamento.status === 'cancelado'

  return (
    <button
      onClick={() => onSelect(agendamento)}
      style={{
        gridRow: `${(paraMinutos(agendamento.inicio) - HORA_INICIO * 60) / SLOT + 1} / span ${linhas}`,
      }}
      className={cn(
        'bg-card group relative mx-1 flex flex-col overflow-hidden rounded-md text-left transition-base',
        'border-subtle border shadow-xs hover:z-10 hover:shadow-md',
        compacto ? 'gap-0 px-2 py-1' : 'gap-0.5 px-2.5 py-1.5',
        cancelado && 'opacity-55',
        agendamento.encaixe && 'border-dashed',
      )}
    >
      <span
        className={cn('absolute top-0 bottom-0 left-0 w-[3px]', BARRA_STATUS[agendamento.status])}
      />

      <div className="flex min-w-0 items-center gap-1.5 pl-1.5">
        <span
          className={cn(
            'text-primary min-w-0 flex-1 truncate font-semibold',
            compacto ? 'text-2xs' : 'text-xs',
            cancelado && 'line-through',
          )}
        >
          {agendamento.paciente}
        </span>
        {agendamento.sinal && !compacto && (
          <span className="bg-success-soft text-success rounded-pill px-1.5 text-[9px] font-bold">
            Pix
          </span>
        )}
      </div>

      {!compacto && (
        <p className="text-muted truncate pl-1.5 text-[11px]">
          {agendamento.inicio} · {agendamento.tipo} · {agendamento.convenio}
        </p>
      )}
    </button>
  )
}

export function AgendaPage() {
  const { tenant } = useTenant()
  const [visao, setVisao] = useState('dia')
  const [selecionado, setSelecionado] = useState<Agendamento | null>(null)
  const [busca, setBusca] = useState('')

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase()
    if (!termo) return AGENDAMENTOS
    return AGENDAMENTOS.filter((a) => a.paciente.toLowerCase().includes(termo))
  }, [busca])

  const resumo = useMemo(() => {
    const total = AGENDAMENTOS.length
    const porStatus = (status: AgendaStatus) =>
      AGENDAMENTOS.filter((a) => a.status === status).length
    return {
      total,
      confirmados: porStatus('confirmado') + porStatus('chegou') + porStatus('atendimento'),
      pendentes: porStatus('agendado'),
      faltas: porStatus('faltou'),
    }
  }, [])

  const horas = Array.from({ length: HORA_FIM - HORA_INICIO }, (_, i) => HORA_INICIO + i)

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-h2 text-primary font-bold tracking-[-0.02em]">
            Quinta, 24 de setembro
          </h1>
          <p className="text-secondary mt-1 text-sm">
            {resumo.total} agendamentos · {resumo.confirmados} confirmados ·{' '}
            {resumo.pendentes} aguardando confirmação
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1">
            <IconButton icon={ArrowLeft01Icon} label="Dia anterior" size="sm" />
            <Button variant="subtle" size="sm" icon={Calendar03Icon}>
              Hoje
            </Button>
            <IconButton icon={ArrowRight01Icon} label="Próximo dia" size="sm" />
          </div>
          <Segmented
            label="Visão da agenda"
            size="sm"
            value={visao}
            onChange={setVisao}
            options={[
              { value: 'dia', label: 'Dia' },
              { value: 'semana', label: 'Semana' },
              { value: 'mes', label: 'Mês' },
            ]}
          />
          <Button variant="accent" size="sm" icon={Add01Icon}>
            Novo agendamento
          </Button>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="w-full max-w-xs">
          <Input
            icon={Search01Icon}
            placeholder="Buscar paciente"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
        <IconButton icon={FilterHorizontalIcon} label="Filtrar agenda" />
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <Badge tone="success">{resumo.confirmados} confirmados</Badge>
          <Badge tone="neutral">{resumo.pendentes} pendentes</Badge>
          <Badge tone="danger">{resumo.faltas} faltas</Badge>
        </div>
      </div>

      <Card padding="none" elevation="sm" className="overflow-hidden">
        {/* A grade rola dentro do card: filtros e cabeçalho de profissionais
            ficam sempre visíveis enquanto a recepção percorre o dia. */}
        <div className="max-h-[calc(100vh-15rem)] overflow-y-auto">
        {/* Cabeçalho de profissionais: multiprofissional e multissala (§11.1, item 1) */}
        <div
          className="border-subtle bg-card sticky top-0 z-20 grid border-b"
          style={{ gridTemplateColumns: `56px repeat(${PROFISSIONAIS.length}, minmax(0, 1fr))` }}
        >
          <div />
          {PROFISSIONAIS.map((prof) => (
            <div
              key={prof.id}
              className="border-subtle flex items-center gap-2.5 border-l px-3 py-3"
            >
              <Avatar nome={prof.nome} size="sm" />
              <div className="min-w-0">
                <p className="text-primary truncate text-xs font-semibold">{prof.nome}</p>
                <p className="text-faint truncate text-2xs">
                  {prof.especialidade} · {prof.sala}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Grade de horários */}
        <div
          className="relative grid pt-2"
          style={{
            gridTemplateColumns: `56px repeat(${PROFISSIONAIS.length}, minmax(0, 1fr))`,
          }}
        >
          {/* Linha do horário atual: âncora de leitura da recepção */}
          <div
            className="pointer-events-none absolute right-0 left-14 z-10 flex items-center"
            style={{ top: `${((paraMinutos(AGORA) - HORA_INICIO * 60) / SLOT) * ALTURA_SLOT + 8}px` }}
          >
            <span className="bg-danger size-2 shrink-0 rounded-full" />
            <span className="bg-danger h-px flex-1 opacity-40" />
          </div>

          {/* Coluna de horas */}
          <div
            className="grid"
            style={{ gridTemplateRows: `repeat(${TOTAL_SLOTS}, ${ALTURA_SLOT}px)` }}
          >
            {horas.map((hora, index) => (
              <div
                key={hora}
                className="text-faint relative text-2xs"
                style={{ gridRow: `${index * 4 + 1} / span 4` }}
              >
                <span className="absolute -top-1.5 right-2 tabular">
                  {String(hora).padStart(2, '0')}:00
                </span>
              </div>
            ))}
          </div>

          {/* Uma coluna por profissional */}
          {PROFISSIONAIS.map((prof) => (
            <div
              key={prof.id}
              className="border-subtle relative grid border-l"
              style={{ gridTemplateRows: `repeat(${TOTAL_SLOTS}, ${ALTURA_SLOT}px)` }}
            >
              {/* Linhas de hora */}
              {horas.map((hora, index) => (
                <div
                  key={hora}
                  className="border-subtle border-t"
                  style={{ gridRow: `${index * 4 + 1} / span 4` }}
                />
              ))}

              {filtrados
                .filter((a) => a.profissionalId === prof.id)
                .map((a) => (
                  <CartaoAgendamento key={a.id} agendamento={a} onSelect={setSelecionado} />
                ))}
            </div>
          ))}
        </div>
        </div>
      </Card>

      <p className="text-faint mt-4 text-xs">
        Clique em um agendamento para abrir o detalhe com histórico de alterações.
      </p>

      <Sheet
        open={selecionado !== null}
        onClose={() => setSelecionado(null)}
        title={selecionado?.paciente ?? ''}
        subtitle={
          selecionado
            ? `${tenant.nome} · ${formatarFaixa(selecionado.inicio, selecionado.duracao)}`
            : undefined
        }
        footer={
          <>
            <Button variant="ghost" onClick={() => setSelecionado(null)}>
              Fechar
            </Button>
            <Button variant="subtle">Remarcar</Button>
            <Button variant="accent" icon={WhatsappIcon}>
              Confirmar
            </Button>
          </>
        }
      >
        {selecionado && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <StatusPill status={selecionado.status} />
              {selecionado.encaixe && <Badge tone="warning">Encaixe</Badge>}
              {selecionado.sinal && <Badge tone="success">{selecionado.sinal}</Badge>}
            </div>

            {selecionado.observacao && (
              <p className="bg-sunken text-secondary rounded-md p-3 text-sm">
                {selecionado.observacao}
              </p>
            )}

            <div className="space-y-3">
              {[
                ['Profissional', PROFISSIONAIS.find((p) => p.id === selecionado.profissionalId)?.nome],
                ['Tipo', `${selecionado.tipo} · ${selecionado.duracao} min`],
                ['Convênio', selecionado.convenio],
                ['Telefone', selecionado.telefone],
                ['Origem do lead', selecionado.origem],
              ].map(([chave, valor]) => (
                <div key={chave} className="flex items-start justify-between gap-4">
                  <span className="text-muted text-sm">{chave}</span>
                  <span className="text-primary text-right text-sm font-medium">{valor}</span>
                </div>
              ))}
            </div>

            <div className="border-subtle border-t pt-5">
              <h3 className="text-primary mb-3 text-sm font-semibold">Histórico de alterações</h3>
              <ol className="space-y-3">
                {(HISTORICO[selecionado.id] ?? [
                  { quando: 'Hoje', quem: 'Recepção', oque: 'Agendamento criado' },
                ]).map((evento, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="bg-line-strong mt-1.5 size-1.5 shrink-0 rounded-full" />
                    <div className="min-w-0">
                      <p className="text-primary text-sm">{evento.oque}</p>
                      <p className="text-faint text-xs">
                        {evento.quando} · {evento.quem}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-accent-soft flex items-start gap-3 rounded-md p-3">
              <HugeiconsIcon
                icon={WhatsappIcon}
                size={18}
                strokeWidth={1.5}
                className="text-accent mt-0.5 shrink-0"
              />
              <p className="text-secondary text-xs leading-relaxed">
                A confirmação é enviada pela API oficial do WhatsApp e grava o status direto na
                agenda, sem segunda fonte de verdade (§11.1, item 3).
              </p>
            </div>
          </div>
        )}
      </Sheet>
    </div>
  )
}
