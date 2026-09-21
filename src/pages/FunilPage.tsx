import { useMemo, useState } from 'react'
import { Alert01Icon, FlowConnectionIcon, WhatsappIcon } from '@hugeicons/core-free-icons'
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  DataList,
  PageBody,
  PageHeader,
  Sheet,
  Stat,
} from '@/ds'
import { cn } from '@/lib/cn'
import { ETAPAS, LEADS } from '@/data/plataforma'
import type { Lead } from '@/data/plataforma'

const real = (v: number) => `R$ ${v.toLocaleString('pt-BR')}`

/** Lead parado além disso vira tarefa de follow-up atrasada (§13) */
const SLA_HORAS = 24

export function FunilPage() {
  const [selecionado, setSelecionado] = useState<Lead | null>(null)

  const atrasados = useMemo(
    () => LEADS.filter((l) => l.horasParado > SLA_HORAS && l.etapa !== 'compareceu' && l.etapa !== 'perdido'),
    [],
  )

  const comparecimento = useMemo(() => {
    const chegaram = LEADS.filter((l) => l.etapa === 'compareceu').length
    const agendados = LEADS.filter((l) => l.etapa === 'agendado' || l.etapa === 'compareceu').length
    return agendados ? Math.round((chegaram / agendados) * 100) : 0
  }, [])

  return (
    <PageBody>
      <PageHeader
        titulo="Funil da jornada"
        resumo="Do primeiro contato ao comparecimento, com a origem de cada paciente"
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <Stat label="Leads no funil" value={String(LEADS.length)} hint="Excluindo perdidos" />
        </Card>
        <Card>
          <Stat
            label="Valor estimado"
            value={real(LEADS.filter((l) => l.etapa !== 'perdido').reduce((s, l) => s + l.valorEstimado, 0))}
            hint="Soma das consultas previstas"
          />
        </Card>
        <Card>
          <Stat
            label="Comparecimento"
            value={`${comparecimento}%`}
            hint="Agendados que chegaram"
            delta={{ value: '4%', trend: 'up' }}
          />
        </Card>
        <Card>
          <Stat
            label="Follow-up atrasado"
            value={String(atrasados.length)}
            hint={`Parados há mais de ${SLA_HORAS} h`}
            delta={atrasados.length ? { value: 'ação', trend: 'down' } : undefined}
          />
        </Card>
      </div>

      {atrasados.length > 0 && (
        <div className="mb-6">
          <Alert
            tone="warning"
            icon={Alert01Icon}
            titulo={`${atrasados.length} leads parados há mais de ${SLA_HORAS} horas`}
            acao={<Button size="sm" variant="subtle">Ver tarefas</Button>}
          >
            Lead sem resposta esfria rápido. São os primeiros da fila de contato de hoje.
          </Alert>
        </div>
      )}

      {/* Quadro de colunas no desktop; etapas empilhadas no celular.
          Cinco colunas não cabem em 390px, e rolar de lado esconde metade
          do funil — justamente a visão que a tela existe para dar. */}
      <div>
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-4">
          {ETAPAS.map((etapa) => {
            const doEtapa = LEADS.filter((l) => l.etapa === etapa.id)
            return (
              <section key={etapa.id} className="flex w-full min-w-0 flex-col">
                <header className="mb-3 px-1">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-primary text-sm font-semibold">{etapa.titulo}</h2>
                    <span className="bg-sunken text-muted rounded-pill px-2 text-2xs font-bold tabular">
                      {doEtapa.length}
                    </span>
                  </div>
                  <p className="text-faint mt-0.5 text-2xs">{etapa.descricao}</p>
                </header>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
                  {doEtapa.map((lead) => {
                    const atrasado = lead.horasParado > SLA_HORAS && etapa.id !== 'compareceu' && etapa.id !== 'perdido'
                    return (
                      <button
                        key={lead.id}
                        onClick={() => setSelecionado(lead)}
                        className={cn(
                          'bg-card border-subtle rounded-lg border p-3 text-left shadow-xs transition-base hover:shadow-md',
                          etapa.id === 'perdido' && 'opacity-[var(--opacity-cancelled)]',
                        )}
                      >
                        <div className="flex items-start gap-2.5">
                          <Avatar nome={lead.nome} size="sm" />
                          <div className="min-w-0 flex-1">
                            <p className="text-primary truncate text-sm font-medium">{lead.nome}</p>
                            <p className="text-muted truncate text-xs">{lead.origem}</p>
                          </div>
                        </div>
                        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                          <Badge tone="neutral">{real(lead.valorEstimado)}</Badge>
                          {atrasado && <Badge tone="warning">{lead.horasParado} h parado</Badge>}
                        </div>
                      </button>
                    )
                  })}

                  {doEtapa.length === 0 && (
                    <p className="text-faint border-subtle rounded-lg border border-dashed px-3 py-6 text-center text-xs">
                      Nenhum lead
                    </p>
                  )}
                </div>
              </section>
            )
          })}
        </div>
      </div>

      <Sheet
        open={selecionado !== null}
        onClose={() => setSelecionado(null)}
        title={selecionado?.nome ?? ''}
        subtitle={selecionado?.telefone}
        footer={
          <>
            <Button variant="ghost" onClick={() => setSelecionado(null)}>
              Fechar
            </Button>
            <Button variant="subtle">Marcar como perdido</Button>
            <Button variant="accent" icon={WhatsappIcon}>
              Responder
            </Button>
          </>
        }
      >
        {selecionado && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <Badge tone="accent">{ETAPAS.find((e) => e.id === selecionado.etapa)?.titulo}</Badge>
              <Badge tone="neutral">{selecionado.origem}</Badge>
            </div>

            {selecionado.tarefa && (
              <Alert tone="warning" icon={FlowConnectionIcon} titulo="Tarefa aberta">
                {selecionado.tarefa}
              </Alert>
            )}

            <DataList
              itens={[
                ['Valor estimado', real(selecionado.valorEstimado)],
                ['Parado há', `${selecionado.horasParado} horas`],
                ['Origem', selecionado.origem],
              ]}
            />

            <p className="text-faint text-xs leading-relaxed">
              A origem é registrada na primeira mensagem e segue o paciente até o comparecimento.
              É o que permite responder quanto cada canal realmente trouxe de consulta.
            </p>
          </div>
        )}
      </Sheet>
    </PageBody>
  )
}
