import { useMemo, useState } from 'react'
import {
  Alert01Icon,
  SecurityCheckIcon,
  Tick02Icon,
  UserMultiple02Icon,
  WhatsappIcon,
} from '@hugeicons/core-free-icons'
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Field,
  Input,
  Select,
  Sheet,
  Stepper,
  Switch,
} from '@/ds'
import { cn } from '@/lib/cn'
import { useTenant } from '@/tenant/TenantProvider'
import {
  HORA_FIM,
  HORA_INICIO,
  PROFISSIONAIS,
  SLOT,
  agendamentosDoDia,
  paraMinutos,
} from '@/data/agenda'
import type { Agendamento } from '@/data/agenda'
import { PACIENTES } from '@/data/plataforma'

const TIPOS = [
  { id: 'retorno', nome: 'Retorno', duracao: 30 },
  { id: 'primeira', nome: 'Primeira consulta', duracao: 60 },
  { id: 'avaliacao', nome: 'Avaliação', duracao: 45 },
  { id: 'encaixe', nome: 'Encaixe', duracao: 15 },
]

const CONVENIOS = ['Particular', 'Unimed', 'Amil', 'SulAmérica', 'Bradesco Saúde']

const ETAPAS = [
  { id: 'paciente', titulo: 'Paciente' },
  { id: 'horario', titulo: 'Horário' },
  { id: 'confirmacao', titulo: 'Confirmação' },
]

export interface NovoAgendamentoProps {
  open: boolean
  onClose: () => void
  /** Dia em que o agendamento será criado */
  iso: string
  onCriar: (a: Agendamento) => void
}

/**
 * Criação de agendamento ponta a ponta. Os horários livres são calculados
 * a partir da agenda real do dia, então a recepção nunca oferece um horário
 * que já está ocupado — é o problema de "duas fontes de verdade" que o
 * escopo aponta nas reclamações dos concorrentes (§6).
 */
export function NovoAgendamento({ open, onClose, iso, onCriar }: NovoAgendamentoProps) {
  const { tenant } = useTenant()
  const [etapa, setEtapa] = useState(0)

  const [busca, setBusca] = useState('')
  const [pacienteId, setPacienteId] = useState<string | null>(null)
  const [novoNome, setNovoNome] = useState('')
  const [novoTelefone, setNovoTelefone] = useState('')

  const [profissionalId, setProfissionalId] = useState(PROFISSIONAIS[0].id)
  const [tipoId, setTipoId] = useState(TIPOS[0].id)
  const [convenio, setConvenio] = useState(CONVENIOS[0])
  const [horario, setHorario] = useState<string | null>(null)

  const [pedirSinal, setPedirSinal] = useState(true)
  const [confirmarWhats, setConfirmarWhats] = useState(true)

  const tipo = TIPOS.find((t) => t.id === tipoId) ?? TIPOS[0]
  const paciente = PACIENTES.find((p) => p.id === pacienteId)
  const nomeFinal = paciente?.nome ?? novoNome.trim()
  const telefoneFinal = paciente?.telefone ?? novoTelefone.trim()

  const encontrados = useMemo(() => {
    const termo = busca.trim().toLowerCase()
    if (!termo) return PACIENTES.slice(0, 4)
    return PACIENTES.filter(
      (p) => p.nome.toLowerCase().includes(termo) || p.telefone.includes(termo),
    ).slice(0, 5)
  }, [busca])

  /** Horários livres calculados da agenda real: nada de oferecer slot ocupado. */
  const livres = useMemo(() => {
    const ocupados = agendamentosDoDia(iso)
      .filter((a) => a.profissionalId === profissionalId && a.status !== 'cancelado')
      .map((a) => ({
        inicio: paraMinutos(a.inicio),
        fim: paraMinutos(a.inicio) + a.duracao,
      }))

    const vagas: string[] = []
    for (let m = HORA_INICIO * 60; m + tipo.duracao <= HORA_FIM * 60; m += SLOT) {
      const conflita = ocupados.some((o) => m < o.fim && m + tipo.duracao > o.inicio)
      if (!conflita) {
        vagas.push(`${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`)
      }
    }
    return vagas
  }, [iso, profissionalId, tipo.duracao])

  function fechar() {
    onClose()
    // Espera a animação de saída antes de limpar, para o painel não piscar vazio
    setTimeout(() => {
      setEtapa(0)
      setBusca('')
      setPacienteId(null)
      setNovoNome('')
      setNovoTelefone('')
      setHorario(null)
    }, 150)
  }

  function criar() {
    if (!horario || !nomeFinal) return
    onCriar({
      id: `novo-${Date.now()}`,
      data: iso,
      profissionalId,
      inicio: horario,
      duracao: tipo.duracao,
      paciente: nomeFinal,
      tipo: tipo.nome,
      convenio,
      status: confirmarWhats ? 'agendado' : 'confirmado',
      origem: paciente?.origem ?? 'Recepção',
      telefone: telefoneFinal || '—',
      sinal: pedirSinal ? 'Link de Pix enviado' : undefined,
      encaixe: tipoId === 'encaixe',
    })
    fechar()
  }

  const podeAvancar = etapa === 0 ? Boolean(nomeFinal) : etapa === 1 ? Boolean(horario) : true

  return (
    <Sheet
      open={open}
      onClose={fechar}
      title="Novo agendamento"
      subtitle={`${tenant.nome} · ${new Date(`${iso}T12:00:00`).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}`}
      footer={
        <>
          <Button variant="ghost" onClick={etapa === 0 ? fechar : () => setEtapa(etapa - 1)}>
            {etapa === 0 ? 'Cancelar' : 'Voltar'}
          </Button>
          {etapa < 2 ? (
            <Button variant="accent" disabled={!podeAvancar} onClick={() => setEtapa(etapa + 1)}>
              Continuar
            </Button>
          ) : (
            <Button variant="accent" icon={Tick02Icon} onClick={criar}>
              Criar agendamento
            </Button>
          )}
        </>
      }
    >
      <div className="space-y-6">
        <Stepper steps={ETAPAS} atual={etapa} />

        {/* ---------------------------------------------------- Paciente */}
        {etapa === 0 && (
          <div className="space-y-5">
            <Field label="Buscar paciente" hint="O mesmo cadastro serve a agenda, o funil e o portal">
              {(id) => (
                <Input
                  id={id}
                  icon={UserMultiple02Icon}
                  placeholder="Nome ou telefone"
                  value={busca}
                  onChange={(e) => {
                    setBusca(e.target.value)
                    setPacienteId(null)
                  }}
                />
              )}
            </Field>

            <ul className="space-y-1.5">
              {encontrados.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => {
                      setPacienteId(p.id)
                      setNovoNome('')
                    }}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-md border px-3 py-2.5 text-left transition-base',
                      pacienteId === p.id
                        ? 'border-accent bg-accent-soft'
                        : 'border-subtle hover:border-line-strong',
                    )}
                  >
                    <Avatar nome={p.nome} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="text-primary truncate text-sm font-medium">{p.nome}</p>
                      <p className="text-muted truncate text-xs">
                        {p.telefone} · {p.convenio}
                      </p>
                    </div>
                    {pacienteId === p.id && <Badge tone="accent">Selecionado</Badge>}
                  </button>
                </li>
              ))}
            </ul>

            <div className="border-subtle border-t pt-5">
              <p className="text-secondary mb-3 text-sm font-medium">Ou cadastre um novo</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Nome completo">
                  {(id) => (
                    <Input
                      id={id}
                      value={novoNome}
                      onChange={(e) => {
                        setNovoNome(e.target.value)
                        setPacienteId(null)
                      }}
                      placeholder="Nome do paciente"
                    />
                  )}
                </Field>
                <Field label="Telefone">
                  {(id) => (
                    <Input
                      id={id}
                      value={novoTelefone}
                      onChange={(e) => setNovoTelefone(e.target.value)}
                      placeholder="(62) 9"
                    />
                  )}
                </Field>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------- Horário */}
        {etapa === 1 && (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
              <Field label="Profissional">
                {(id) => (
                  <Select
                    id={id}
                    value={profissionalId}
                    onChange={(e) => {
                      setProfissionalId(e.target.value)
                      setHorario(null)
                    }}
                  >
                    {PROFISSIONAIS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nome}
                      </option>
                    ))}
                  </Select>
                )}
              </Field>
              </div>
              <Field label="Tipo de consulta">
                {(id) => (
                  <Select
                    id={id}
                    value={tipoId}
                    onChange={(e) => {
                      setTipoId(e.target.value)
                      setHorario(null)
                    }}
                  >
                    {TIPOS.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.nome} · {t.duracao} min
                      </option>
                    ))}
                  </Select>
                )}
              </Field>
              <Field label="Convênio">
                {(id) => (
                  <Select id={id} value={convenio} onChange={(e) => setConvenio(e.target.value)}>
                    {CONVENIOS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </Select>
                )}
              </Field>
            </div>

            <div>
              <p className="text-secondary mb-2 text-sm font-medium">
                Horários livres · {livres.length} vagas de {tipo.duracao} min
              </p>
              {livres.length === 0 ? (
                <Alert tone="warning" icon={Alert01Icon}>
                  Sem vaga para {tipo.duracao} minutos neste dia com este profissional. Tente outro
                  dia, outro profissional, ou um encaixe.
                </Alert>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {livres.map((h) => (
                    <button
                      key={h}
                      onClick={() => setHorario(h)}
                      className={cn(
                        'min-h-[var(--target-min)] rounded-pill border px-3 text-sm font-medium tabular transition-base',
                        horario === h
                          ? 'border-transparent bg-active text-on-active'
                          : 'border-subtle text-primary hover:border-accent hover:text-accent',
                      )}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              )}
              <p className="text-faint mt-2 text-xs">
                As vagas vêm da agenda real deste dia. Horário ocupado não aparece aqui.
              </p>
            </div>
          </div>
        )}

        {/* ------------------------------------------------- Confirmação */}
        {etapa === 2 && (
          <div className="space-y-5">
            <div className="bg-sunken rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Avatar nome={nomeFinal || 'Novo paciente'} size="md" />
                <div className="min-w-0">
                  <p className="text-primary truncate font-semibold">{nomeFinal}</p>
                  <p className="text-muted truncate text-sm">{telefoneFinal || 'Sem telefone'}</p>
                </div>
              </div>
              <div className="border-subtle mt-4 space-y-2 border-t pt-4 text-sm">
                {[
                  ['Horário', `${horario} · ${tipo.duracao} min`],
                  ['Profissional', PROFISSIONAIS.find((p) => p.id === profissionalId)?.nome ?? ''],
                  ['Tipo', tipo.nome],
                  ['Convênio', convenio],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-4">
                    <span className="text-muted">{k}</span>
                    <span className="text-primary font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Switch
                checked={confirmarWhats}
                onChange={setConfirmarWhats}
                label="Pedir confirmação por WhatsApp (48h e 2h antes)"
              />
              <Switch
                checked={pedirSinal}
                onChange={setPedirSinal}
                label="Enviar link de Pix para sinal"
              />
            </div>

            {pedirSinal && (
              <Alert tone="success" icon={Tick02Icon}>
                Com sinal pago, a falta é de 2,1%. Sem sinal, 18,4%.
              </Alert>
            )}

            {!paciente && (
              <Alert tone="info" icon={SecurityCheckIcon}>
                Paciente novo: o aceite para receber mensagens fica registrado no cadastro,
                separado do aceite para campanhas.
              </Alert>
            )}

            {confirmarWhats && (
              <Alert tone="neutral" icon={WhatsappIcon}>
                Quando o paciente responder, o status muda sozinho aqui na agenda.
              </Alert>
            )}
          </div>
        )}
      </div>
    </Sheet>
  )
}
