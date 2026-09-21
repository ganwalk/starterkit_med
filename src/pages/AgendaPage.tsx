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
  PageBody,
  PageHeader,
  Segmented,
  Sheet,
  StatusPill,
} from '@/ds'
import type { AgendaStatus } from '@/ds'
import { cn } from '@/lib/cn'
import { useTenant } from '@/tenant/TenantProvider'
import {
  DIA_BASE,
  HISTORICO,
  HORA_FIM,
  HORA_INICIO,
  PROFISSIONAIS,
  SLOT,
  agendamentosDoDia,
  formatarFaixa,
  isoDe,
  paraMinutos,
} from '@/data/agenda'
import type { Agendamento } from '@/data/agenda'
import { VisaoSemana } from './agenda/VisaoSemana'
import { VisaoMes } from './agenda/VisaoMes'
import { NovoAgendamento } from './agenda/NovoAgendamento'

const TOTAL_SLOTS = ((HORA_FIM - HORA_INICIO) * 60) / SLOT
// 26px: altura mínima para um encaixe de 15 min caber uma linha de 11px
// sem cortar. Com 22px a auditoria mediu texto de 25px em caixa de 20px.
const ALTURA_SLOT = 26
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
        'border-subtle border shadow-xs hover:z-10 hover:-translate-y-px hover:shadow-md',
        compacto ? 'gap-0 px-2 py-1' : 'gap-0.5 px-2.5 py-1.5',
        cancelado && 'opacity-[var(--opacity-cancelled)]',
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
          <span className="bg-success-soft text-success rounded-pill px-1.5 text-2xs font-bold">
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

type Visao = 'dia' | 'semana' | 'mes'

const FORMATO_DIA = new Intl.DateTimeFormat('pt-BR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
})
const FORMATO_MES = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' })

function segundaDa(data: Date): Date {
  const d = new Date(data)
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7))
  return d
}

const maiuscula = (t: string) => t.charAt(0).toUpperCase() + t.slice(1)

export function AgendaPage() {
  const { tenant } = useTenant()
  const [visao, setVisao] = useState<Visao>('dia')
  const [data, setData] = useState(() => new Date(`${DIA_BASE}T12:00:00`))
  const [profSemana, setProfSemana] = useState(PROFISSIONAIS[0].id)
  const [selecionado, setSelecionado] = useState<Agendamento | null>(null)
  const [busca, setBusca] = useState('')
  const [criando, setCriando] = useState(false)
  // Agendamentos criados durante a sessão. Ficam em memória porque o
  // protótipo não tem backend, mas entram na grade como qualquer outro.
  const [criados, setCriados] = useState<Agendamento[]>([])

  const iso = isoDe(data)
  const doDia = useMemo(
    () => [...agendamentosDoDia(iso), ...criados.filter((a) => a.data === iso)],
    [iso, criados],
  )

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase()
    if (!termo) return doDia
    return doDia.filter((a) => a.paciente.toLowerCase().includes(termo))
  }, [busca, doDia])

  const resumo = useMemo(() => {
    const porStatus = (status: AgendaStatus) => doDia.filter((a) => a.status === status).length
    return {
      total: doDia.length,
      confirmados: porStatus('confirmado') + porStatus('chegou') + porStatus('atendimento'),
      pendentes: porStatus('agendado'),
      faltas: porStatus('faltou'),
    }
  }, [doDia])

  /** O passo da navegação acompanha a visão: 1 dia, 7 dias ou 1 mês. */
  function navegar(direcao: -1 | 1) {
    setData((atual) => {
      const nova = new Date(atual)
      if (visao === 'dia') nova.setDate(nova.getDate() + direcao)
      else if (visao === 'semana') nova.setDate(nova.getDate() + direcao * 7)
      else nova.setMonth(nova.getMonth() + direcao)
      return nova
    })
  }

  function abrirDia(isoAlvo: string) {
    setData(new Date(`${isoAlvo}T12:00:00`))
    setVisao('dia')
  }

  const titulo =
    visao === 'mes'
      ? maiuscula(FORMATO_MES.format(data))
      : visao === 'semana'
        ? `Semana de ${segundaDa(data).getDate()} de ${FORMATO_MES.format(data).split(' de ')[0]}`
        : maiuscula(FORMATO_DIA.format(data))

  const horas = Array.from({ length: HORA_FIM - HORA_INICIO }, (_, i) => HORA_INICIO + i)

  const PASSO = { dia: 'dia', semana: 'semana', mes: 'mês' } as const

  return (
    <PageBody>
      <PageHeader
        titulo={titulo}
        resumo={
          visao === 'dia'
            ? `${resumo.total} agendamentos · ${resumo.confirmados} confirmados · ${resumo.pendentes} aguardando confirmação`
            : visao === 'semana'
              ? 'Um profissional por vez, para encontrar horário livre'
              : 'Carga por dia. Clique num dia para abrir a agenda completa'
        }
        acoes={
          <>
            <div className="flex items-center gap-1">
              <IconButton
                icon={ArrowLeft01Icon}
                label={`${PASSO[visao]} anterior`}
                size="sm"
                onClick={() => navegar(-1)}
              />
              <Button
                variant="subtle"
                size="sm"
                icon={Calendar03Icon}
                onClick={() => setData(new Date(`${DIA_BASE}T12:00:00`))}
              >
                Hoje
              </Button>
              <IconButton
                icon={ArrowRight01Icon}
                label={`Próximo ${PASSO[visao]}`}
                size="sm"
                onClick={() => navegar(1)}
              />
            </div>
            <Segmented
              label="Visão da agenda"
              size="sm"
              value={visao}
              onChange={(v) => setVisao(v as Visao)}
              options={[
                { value: 'dia', label: 'Dia' },
                { value: 'semana', label: 'Semana' },
                { value: 'mes', label: 'Mês' },
              ]}
            />
            <Button
              variant="accent"
              size="sm"
              icon={Add01Icon}
              onClick={() => setCriando(true)}
            >
              Novo agendamento
            </Button>
          </>
        }
      />

      {visao === 'dia' && (
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
      )}

      <Card padding={visao === 'mes' ? 'compact' : 'none'} elevation="sm" className="overflow-hidden">
        {visao === 'semana' && (
          <div className="p-4">
            <VisaoSemana
              inicioSemana={segundaDa(data)}
              hoje={DIA_BASE}
              profissionalId={profSemana}
              onProfissionalChange={setProfSemana}
              onSelect={setSelecionado}
              onVerDia={abrirDia}
            />
          </div>
        )}

        {visao === 'mes' && <VisaoMes mes={data} hoje={DIA_BASE} onVerDia={abrirDia} />}

        {visao === 'dia' && (
        <>
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
          {/* Linha do horário atual: âncora de leitura da recepção.
              Fica ATRÁS dos cartões — eles são opacos, então ela aparece só
              nos vãos livres. Por cima, virava um risco sobre o nome do
              paciente e parecia texto riscado. */}
          <div
            className="pointer-events-none absolute right-0 left-14 z-0 flex items-center"
            style={{ top: `${((paraMinutos(AGORA) - HORA_INICIO * 60) / SLOT) * ALTURA_SLOT + 8}px` }}
          >
            <span className="bg-danger size-2 shrink-0 rounded-full" />
            <span
              className="bg-danger h-px flex-1"
              style={{ opacity: 'var(--opacity-hairline)' }}
            />
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
        </>
        )}
      </Card>

      {visao === 'dia' && (
        <p className="text-faint mt-4 text-xs">
          Clique em um agendamento para abrir o detalhe com histórico de alterações.
        </p>
      )}

      <NovoAgendamento
        open={criando}
        onClose={() => setCriando(false)}
        iso={iso}
        onCriar={(a) => {
          setCriados((atuais) => [...atuais, a])
          setVisao('dia')
          setSelecionado(a)
        }}
      />

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
                A confirmação vai pelo WhatsApp oficial. Quando o paciente responde, o status
                muda aqui na agenda sozinho.
              </p>
            </div>
          </div>
        )}
      </Sheet>
    </PageBody>
  )
}
