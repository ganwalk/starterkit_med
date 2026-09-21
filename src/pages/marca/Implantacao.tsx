import { useState } from 'react'
import {
  Alert01Icon,
  Calendar03Icon,
  DatabaseImportIcon,
  PaintBoardIcon,
  Tick02Icon,
  UserMultiple02Icon,
  WhatsappIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { IconSvgElement } from '@hugeicons/react'
import { Alert, Badge, Button, Card, Progress } from '@/ds'
import { cn } from '@/lib/cn'
import { useTenant } from '@/tenant/TenantProvider'

interface Item {
  id: string
  titulo: string
  detalhe: string
  feito: boolean
  /** Sem isto a clínica não pode ir ao ar */
  bloqueante?: boolean
}

interface Etapa {
  id: string
  titulo: string
  icone: IconSvgElement
  /** Quem conduz esta etapa, conforme o plano de ação */
  responsavel: string
  itens: Item[]
}

/**
 * Implantação é processo de dias, não de uma sentada: por isso é um
 * acompanhamento persistente e não um modal de primeiro acesso. Espelha o
 * playbook das cinco etapas da Level (§13.2) aplicado a uma clínica.
 */
const ETAPAS: Etapa[] = [
  {
    id: 'diagnostico',
    titulo: 'Diagnóstico',
    icone: Alert01Icon,
    responsavel: 'Diogo · Gestão',
    itens: [
      { id: 'd1', titulo: 'Sistema de origem identificado', detalhe: "Doctor's Office (PES), licença instalada", feito: true },
      { id: 'd2', titulo: 'Volume de dados levantado', detalhe: '4.820 pacientes, 18.756 agendamentos', feito: true },
      { id: 'd3', titulo: 'Contrato de operação assinado', detalhe: 'Antes de receber qualquer arquivo', feito: true, bloqueante: true },
      { id: 'd4', titulo: 'Rotina da recepção mapeada', detalhe: 'Quem usa, quantos postos, horário de pico', feito: true },
    ],
  },
  {
    id: 'marca',
    titulo: 'Marca aplicada',
    icone: PaintBoardIcon,
    responsavel: 'Armando · Design',
    itens: [
      { id: 'm1', titulo: 'Logo e cor definidos', detalhe: 'Aplicados ao portal, ao app e às mensagens', feito: true },
      { id: 'm2', titulo: 'Domínio próprio apontado', detalhe: 'Recomendado para dado de saúde', feito: true, bloqueante: true },
      { id: 'm3', titulo: 'Textos do portal revisados', detalhe: 'Tom de voz da clínica, não do produto', feito: false },
    ],
  },
  {
    id: 'equipe',
    titulo: 'Equipe e agenda',
    icone: UserMultiple02Icon,
    responsavel: 'Diogo · Implantação',
    itens: [
      { id: 'e1', titulo: 'Profissionais e salas cadastrados', detalhe: '4 profissionais, 4 salas', feito: true },
      { id: 'e2', titulo: 'Horários e intervalos por profissional', detalhe: 'Antecedência mínima e máxima de agendamento', feito: true },
      { id: 'e3', titulo: 'Tipos de consulta e duração', detalhe: 'Retorno, primeira consulta, procedimento, encaixe', feito: true },
      { id: 'e4', titulo: 'Perfis de acesso da equipe', detalhe: 'Recepção, profissional e gestão', feito: false, bloqueante: true },
    ],
  },
  {
    id: 'migracao',
    titulo: 'Migração',
    icone: DatabaseImportIcon,
    responsavel: 'Vitor · Engenharia',
    itens: [
      { id: 'g1', titulo: 'Importação executada', detalhe: 'Pacientes, agenda e financeiro', feito: true },
      { id: 'g2', titulo: 'Relatório de conciliação aprovado pelo cliente', detalhe: 'Contagens antes e depois, com motivo das falhas', feito: false, bloqueante: true },
      { id: 'g3', titulo: 'Anexos e histórico clínico', detalhe: 'Somente leitura, aguardando parecer jurídico', feito: false },
    ],
  },
  {
    id: 'canais',
    titulo: 'Canais',
    icone: WhatsappIcon,
    responsavel: 'Vitor · Engenharia',
    itens: [
      { id: 'c1', titulo: 'WhatsApp oficial conectado', detalhe: 'Via provedor oficial, custo repassado ao custo', feito: true, bloqueante: true },
      { id: 'c2', titulo: 'Modelos de mensagem aprovados pela Meta', detalhe: 'Confirmação 48h e 2h antes', feito: true },
      { id: 'c3', titulo: 'Assistente restrito a agendamento e logística', detalhe: 'Dentro da Resolução CFM 2.454/2026', feito: false },
    ],
  },
  {
    id: 'lancamento',
    titulo: 'Lançamento',
    icone: Calendar03Icon,
    responsavel: 'Todos',
    itens: [
      { id: 'l1', titulo: 'Treinamento da recepção', detalhe: 'Meta: equipe operando em menos de 2 horas', feito: false },
      { id: 'l2', titulo: 'Operação em paralelo', detalhe: 'Período com os dois sistemas no ar, com plano de retorno', feito: false, bloqueante: true },
      { id: 'l3', titulo: 'Virada em horário combinado', detalhe: 'Fora do pico de atendimento', feito: false },
      { id: 'l4', titulo: 'Plantão 24h ativado para a clínica', detalhe: 'SLA por severidade em vigor', feito: false },
    ],
  },
]

export function Implantacao() {
  const { tenant } = useTenant()
  const [abertos, setAbertos] = useState<string[]>(['equipe', 'migracao'])

  const todos = ETAPAS.flatMap((e) => e.itens)
  const feitos = todos.filter((i) => i.feito).length
  const bloqueiosAbertos = todos.filter((i) => i.bloqueante && !i.feito)

  return (
    <div className="space-y-5">
      <Card>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-h3 text-primary font-semibold">Implantação de {tenant.nome}</h2>
            <p className="text-secondary mt-1 text-sm">
              {feitos} de {todos.length} itens concluídos · {ETAPAS.length} etapas
            </p>
          </div>
          <Badge tone={bloqueiosAbertos.length ? 'warning' : 'success'}>
            {bloqueiosAbertos.length
              ? `${bloqueiosAbertos.length} bloqueios para o go-live`
              : 'Pronta para o go-live'}
          </Badge>
        </div>
        <div className="mt-4">
          <Progress
            valor={feitos}
            max={todos.length}
            label="Progresso da implantação"
            tone={bloqueiosAbertos.length ? 'accent' : 'success'}
            mostrarValor
          />
        </div>
      </Card>

      {bloqueiosAbertos.length > 0 && (
        <Alert
          tone="warning"
          icon={Alert01Icon}
          titulo="A clínica não pode ir ao ar enquanto estes itens estiverem abertos"
        >
          <ul className="mt-1 list-inside list-disc space-y-0.5">
            {bloqueiosAbertos.map((i) => (
              <li key={i.id}>{i.titulo}</li>
            ))}
          </ul>
        </Alert>
      )}

      <div className="space-y-3">
        {ETAPAS.map((etapa) => {
          const concluidos = etapa.itens.filter((i) => i.feito).length
          const completa = concluidos === etapa.itens.length
          const aberto = abertos.includes(etapa.id)

          return (
            <Card key={etapa.id} padding="none" elevation="sm">
              <button
                onClick={() =>
                  setAbertos((a) =>
                    a.includes(etapa.id) ? a.filter((x) => x !== etapa.id) : [...a, etapa.id],
                  )
                }
                aria-expanded={aberto}
                className="flex w-full items-center gap-3 p-4 text-left sm:p-5"
              >
                <span
                  className={cn(
                    'flex size-9 shrink-0 items-center justify-center rounded-full',
                    completa ? 'bg-success-soft text-success' : 'bg-sunken text-muted',
                  )}
                >
                  <HugeiconsIcon
                    icon={completa ? Tick02Icon : etapa.icone}
                    size={18}
                    strokeWidth={completa ? 2 : 1.5}
                  />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-primary truncate text-sm font-semibold">{etapa.titulo}</p>
                  <p className="text-muted truncate text-xs">{etapa.responsavel}</p>
                </div>

                <span className="text-secondary shrink-0 text-xs font-semibold tabular">
                  {concluidos}/{etapa.itens.length}
                </span>
                <span
                  className={cn('text-faint shrink-0 text-xs transition-base', aberto && 'rotate-180')}
                  aria-hidden
                >
                  ▾
                </span>
              </button>

              {aberto && (
                <ul className="divide-subtle border-subtle divide-y border-t">
                  {etapa.itens.map((item) => (
                    <li key={item.id} className="flex items-start gap-3 px-4 py-3 sm:px-5">
                      <span
                        className={cn(
                          'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold',
                          item.feito
                            ? 'border-transparent bg-success-soft text-success'
                            : 'border-line-strong text-faint',
                        )}
                        aria-hidden
                      >
                        {item.feito ? '✓' : ''}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p
                          className={cn(
                            'text-sm',
                            item.feito ? 'text-muted' : 'text-primary font-medium',
                          )}
                        >
                          {item.titulo}
                        </p>
                        <p className="text-faint text-xs">{item.detalhe}</p>
                      </div>
                      {item.bloqueante && !item.feito && <Badge tone="warning">Bloqueia go-live</Badge>}
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          )
        })}
      </div>

      <Card>
        <h3 className="text-h4 text-primary font-semibold">Prazo de go-live</h3>
        <p className="text-secondary mt-1 text-sm">
          Ainda não prometemos data de go-live: o prazo por tamanho de base só sai depois de medir
          o tempo real nas primeiras clínicas. Até lá, esta tela mostra progresso.
        </p>
        <div className="mt-4">
          <Button variant="subtle" size="sm">
            Ver playbook de implantação
          </Button>
        </div>
      </Card>
    </div>
  )
}
