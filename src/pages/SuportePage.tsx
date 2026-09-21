import { Alert01Icon, CustomerSupportIcon } from '@hugeicons/core-free-icons'
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  CardHeader,
  DataList,
  PageBody,
  PageHeader,
  Progress,
  Stat,
  Table,
} from '@/ds'
import type { Column } from '@/ds'
import { CHAMADOS, SEVERIDADE_LABEL, SLA_MINUTOS } from '@/data/plataforma'
import type { Chamado } from '@/data/plataforma'

const TOM_SEVERIDADE = {
  critica: 'danger',
  alta: 'warning',
  normal: 'neutral',
} as const

/** Atendimento 24h com SLA por severidade — §11.3 do escopo. */
export function SuportePage() {
  const abertos = CHAMADOS.filter((c) => c.status !== 'resolvido')
  const emRisco = abertos.filter((c) => c.decorridoMinutos / c.slaMinutos > 0.8)

  const colunas: Column<Chamado>[] = [
    { chave: 'id', titulo: 'Chamado', render: (c) => <span className="text-primary font-semibold tabular">{c.id}</span> },
    { chave: 'clinica', titulo: 'Clínica', render: (c) => <span className="text-secondary">{c.clinica}</span> },
    { chave: 'assunto', titulo: 'Assunto', render: (c) => <span className="text-primary">{c.assunto}</span> },
    {
      chave: 'sev',
      titulo: 'Severidade',
      render: (c) => <Badge tone={TOM_SEVERIDADE[c.severidade]}>{SEVERIDADE_LABEL[c.severidade]}</Badge>,
    },
    {
      chave: 'sla',
      titulo: 'SLA',
      largura: '10rem',
      render: (c) => {
        const risco = c.decorridoMinutos / c.slaMinutos
        return (
          <div>
            <Progress
              valor={c.decorridoMinutos}
              max={c.slaMinutos}
              label={`SLA do chamado ${c.id}`}
              tone={risco > 0.8 ? 'danger' : risco > 0.5 ? 'warning' : 'success'}
            />
            <p className="text-faint mt-1 text-2xs tabular">
              {c.decorridoMinutos} de {c.slaMinutos} min
            </p>
          </div>
        )
      },
    },
    {
      chave: 'resp',
      titulo: 'Plantão',
      render: (c) =>
        c.responsavel === 'Bot' ? (
          <Badge tone="neutral">Bot</Badge>
        ) : (
          <div className="flex items-center gap-2">
            <Avatar nome={c.responsavel} size="xs" />
            <span className="text-secondary">{c.responsavel}</span>
          </div>
        ),
    },
  ]

  return (
    <PageBody>
      <PageHeader
        titulo="Suporte 24h"
        resumo="SLA por severidade, plantão em rodízio e triagem automática na primeira linha"
        acoes={<Button variant="subtle">Registro de ocorrências</Button>}
      />

      {emRisco.length > 0 && (
        <div className="mb-5">
          <Alert
            tone="danger"
            icon={Alert01Icon}
            titulo={`${emRisco.length} chamado(s) perto de estourar o SLA`}
            acao={<Button size="sm" variant="subtle">Assumir</Button>}
          >
            O 24h é a promessa mais cara do produto. Um SLA estourado custa mais do que o chamado.
          </Alert>
        </div>
      )}

      <div className="mb-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <Stat label="Chamados abertos" value={String(abertos.length)} hint="Em todas as clínicas" />
        </Card>
        <Card>
          <Stat label="Resolvidos pelo bot" value="61%" hint="Primeira linha, sem acionar plantão" delta={{ value: '7%', trend: 'up' }} />
        </Card>
        <Card>
          <Stat label="Primeira resposta" value="4 min" hint="Média em severidade crítica" delta={{ value: '2 min', trend: 'down' }} />
        </Card>
        <Card>
          <Stat label="Fora do horário comercial" value="23%" hint="Justifica o plantão existir" />
        </Card>
      </div>

      <Card padding="none" className="mb-5">
        <div className="p-6 pb-0">
          <CardHeader title="Fila de chamados" caption="Ordenada por risco de SLA, não por chegada" />
        </div>
        <Table label="Chamados de suporte" colunas={colunas} linhas={CHAMADOS} chaveDe={(c) => c.id} />
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="SLA por severidade" caption="Compromisso contratual com a clínica" />
          <DataList
            itens={[
              ['Crítica — agenda fora do ar, perda de dados', `${SLA_MINUTOS.critica} min, a qualquer hora`],
              ['Alta — recurso com defeito, com contorno', `${SLA_MINUTOS.alta} min`],
              ['Normal — dúvida de uso, configuração', `${SLA_MINUTOS.normal} min em horário estendido`],
            ]}
          />
        </Card>

        <Card>
          <CardHeader title="Escala de plantão" caption="Rodízio entre os sócios, com revisão semanal" />
          <div className="space-y-3">
            {[
              { nome: 'Armando', turno: 'Seg a qua · 18h às 08h', carga: 62 },
              { nome: 'Diogo', turno: 'Qui a sáb · 18h às 08h', carga: 71 },
              { nome: 'João Pedro', turno: 'Reserva · fins de semana', carga: 24 },
            ].map((p) => (
              <div key={p.nome} className="flex items-center gap-3">
                <Avatar nome={p.nome} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="text-primary text-sm font-medium">{p.nome}</p>
                  <p className="text-muted text-xs">{p.turno}</p>
                </div>
                <div className="w-24 shrink-0">
                  <Progress
                    valor={p.carga}
                    label={`Carga de ${p.nome}`}
                    tone={p.carga > 70 ? 'warning' : 'accent'}
                    mostrarValor
                  />
                </div>
              </div>
            ))}
          </div>
          <Alert tone="warning" icon={CustomerSupportIcon} className="mt-5">
            <span>
              Revisar a escala a cada 5 clínicas novas. Com três pessoas dividindo suporte, vendas
              e produto, o plantão não se sustenta sozinho por muito tempo.
            </span>
          </Alert>
        </Card>
      </div>
    </PageBody>
  )
}
